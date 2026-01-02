'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trophy, Plus, BookOpen, BarChart3, X } from 'lucide-react';

export default function AchieversManager() {
    const [activeSection, setActiveSection] = useState('achievers');
    const [achievers, setAchievers] = useState([]);
    const [subjectToppers, setSubjectToppers] = useState([]);
    const [subjectStats, setSubjectStats] = useState([]);
    const [resultStats, setResultStats] = useState({ XII: null, X: null });
    const [loading, setLoading] = useState(true);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // 'achiever', 'subjectTopper', 'subjectStat', 'resultStat'
    const [newStudent, setNewStudent] = useState({ name: '', student_class: 'XII', score: '', category: 'OTHER', image_url: '' });
    const [newSubjectTopper, setNewSubjectTopper] = useState({ student_class: 'XII', subject: '', score: '', student_name: '' });
    const [newSubjectStat, setNewSubjectStat] = useState({ student_class: 'X', subject: '', merit_count: '', highest_score: '' });
    const [editingResultStat, setEditingResultStat] = useState({ student_class: 'XII', pass_result: '100%', distinctions: 0, stream_highlights: [] });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);

        // Fetch achievers
        const { data: achieversData } = await supabase
            .from('achievers')
            .select('*')
            .order('created_at', { ascending: false });
        if (achieversData) setAchievers(achieversData);

        // Fetch subject toppers
        const { data: toppersData } = await supabase
            .from('subject_toppers')
            .select('*')
            .order('student_class', { ascending: false });
        if (toppersData) setSubjectToppers(toppersData);

        // Fetch subject stats
        const { data: statsData } = await supabase
            .from('subject_stats')
            .select('*')
            .order('student_class', { ascending: false });
        if (statsData) setSubjectStats(statsData);

        // Fetch result stats
        const { data: resultData } = await supabase
            .from('result_stats')
            .select('*');
        if (resultData) {
            const stats = { XII: null, X: null };
            resultData.forEach(r => {
                stats[r.student_class] = r;
            });
            setResultStats(stats);
        }

        setLoading(false);
    };

    // Image upload handler
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fileName = `achievers/${Date.now()}-${file.name.replace(/\s/g, '-')}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(fileName);

            setNewStudent(prev => ({ ...prev, image_url: publicUrl }));
        } catch (error) {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    // Achiever handlers
    const handleSubmitAchiever = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('achievers')
                .insert([newStudent])
                .select();

            if (error) throw error;

            setAchievers([data[0], ...achievers]);
            setIsModalOpen(false);
            setNewStudent({ name: '', student_class: 'XII', score: '', category: 'OTHER', image_url: '' });
        } catch (error) {
            alert('Failed to add student');
        }
    };

    const handleDeleteAchiever = async (id) => {
        if (!confirm('Delete this record?')) return;
        const { error } = await supabase.from('achievers').delete().eq('id', id);
        if (!error) setAchievers(achievers.filter(a => a.id !== id));
    };

    // Subject Topper handlers
    const handleSubmitSubjectTopper = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('subject_toppers')
                .insert([newSubjectTopper])
                .select();

            if (error) throw error;

            setSubjectToppers([data[0], ...subjectToppers]);
            setIsModalOpen(false);
            setNewSubjectTopper({ student_class: 'XII', subject: '', score: '', student_name: '' });
        } catch (error) {
            alert('Failed to add subject topper');
        }
    };

    const handleDeleteSubjectTopper = async (id) => {
        if (!confirm('Delete this record?')) return;
        const { error } = await supabase.from('subject_toppers').delete().eq('id', id);
        if (!error) setSubjectToppers(subjectToppers.filter(s => s.id !== id));
    };

    // Subject Stats handlers
    const handleSubmitSubjectStat = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('subject_stats')
                .insert([newSubjectStat])
                .select();

            if (error) throw error;

            setSubjectStats([data[0], ...subjectStats]);
            setIsModalOpen(false);
            setNewSubjectStat({ student_class: 'X', subject: '', merit_count: '', highest_score: '' });
        } catch (error) {
            alert('Failed to add subject stat');
        }
    };

    const handleDeleteSubjectStat = async (id) => {
        if (!confirm('Delete this record?')) return;
        const { error } = await supabase.from('subject_stats').delete().eq('id', id);
        if (!error) setSubjectStats(subjectStats.filter(s => s.id !== id));
    };

    // Result Stats handlers
    const handleSaveResultStat = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('result_stats')
                .upsert([{
                    student_class: editingResultStat.student_class,
                    pass_result: editingResultStat.pass_result,
                    distinctions: parseInt(editingResultStat.distinctions),
                    stream_highlights: editingResultStat.stream_highlights
                }], { onConflict: 'student_class' })
                .select();

            if (error) throw error;

            setResultStats(prev => ({
                ...prev,
                [editingResultStat.student_class]: data[0]
            }));
            setIsModalOpen(false);
            alert('Result stats saved!');
        } catch (error) {
            console.error(error);
            alert('Failed to save result stats');
        }
    };

    const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType('');
    };

    // Filter achievers
    const toppers = achievers.filter(a => a.category === 'TOPPER').sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    const otherAchievers = achievers.filter(a => a.category !== 'TOPPER').sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    return (
        <div>
            {/* Header with Tabs */}
            <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-iis-navy mb-4">Academic Achievers</h2>
                <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
                    <button
                        onClick={() => setActiveSection('achievers')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-t font-medium transition ${activeSection === 'achievers' ? 'bg-iis-maroon text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        <Trophy size={18} /> Student Achievers
                    </button>
                    <button
                        onClick={() => setActiveSection('subjects')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-t font-medium transition ${activeSection === 'subjects' ? 'bg-iis-maroon text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        <BookOpen size={18} /> Subject Toppers
                    </button>
                    <button
                        onClick={() => setActiveSection('stats')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-t font-medium transition ${activeSection === 'stats' ? 'bg-iis-maroon text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        <BarChart3 size={18} /> Result Highlights
                    </button>
                </div>
            </div>

            {/* SECTION: Student Achievers */}
            {activeSection === 'achievers' && (
                <div>
                    <div className="flex justify-end mb-6">
                        <button onClick={() => openModal('achiever')} className="flex items-center gap-2 bg-iis-maroon text-white px-5 py-2 rounded shadow hover:bg-red-900 transition">
                            <Plus size={18} /> Add Achiever
                        </button>
                    </div>

                    {/* Top Performers */}
                    {toppers.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-xl font-serif font-bold text-iis-navy mb-6 flex items-center gap-3">
                                <Trophy className="text-iis-gold" size={24} /> Top Performers
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {toppers.map((student, idx) => (
                                    <div key={student.id} className="bg-gradient-to-br from-yellow-50 to-white rounded-lg shadow-lg border-2 border-iis-gold overflow-hidden relative">
                                        <div className="absolute top-3 left-3 bg-iis-gold text-iis-navy text-xs font-black px-2 py-1 rounded-full z-20">RANK #{idx + 1}</div>
                                        <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                            {student.image_url ? (
                                                <img src={student.image_url} alt={student.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-6xl text-gray-300">👤</span>
                                            )}
                                            <div className="absolute top-3 right-3 bg-iis-gold text-iis-navy text-sm font-bold px-3 py-1 rounded-full shadow-sm z-10">{student.score}%</div>
                                        </div>
                                        <div className="p-5 bg-white">
                                            <h3 className="font-bold text-slate-800 text-lg mb-1">{student.name}</h3>
                                            <p className="text-xs text-slate-500 mb-2">Class {student.student_class}</p>
                                            <button onClick={() => handleDeleteAchiever(student.id)} className="w-full bg-red-50 text-red-600 py-2 rounded text-sm hover:bg-red-100 font-medium">Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Other Achievers */}
                    {otherAchievers.length > 0 && (
                        <div>
                            <h3 className="text-xl font-serif font-bold text-slate-700 mb-6">🎓 Other Achievers ({otherAchievers.length})</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {otherAchievers.map((student) => (
                                    <div key={student.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                                        <div className="h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                            {student.image_url ? (
                                                <img src={student.image_url} alt={student.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-5xl text-gray-300">👤</span>
                                            )}
                                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">{student.score}%</div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-bold text-slate-800 text-sm truncate">{student.name}</h3>
                                            <p className="text-xs text-slate-400">Class {student.student_class}</p>
                                            <button onClick={() => handleDeleteAchiever(student.id)} className="mt-2 w-full bg-red-50 text-red-600 py-1 rounded text-xs hover:bg-red-100">Del</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {achievers.length === 0 && !loading && (
                        <div className="text-center py-12 text-slate-400">
                            <Trophy className="mx-auto mb-4 opacity-20" size={64} />
                            <p>No achievers added yet. Click "Add Achiever" to start!</p>
                        </div>
                    )}
                </div>
            )}

            {/* SECTION: Subject Toppers */}
            {activeSection === 'subjects' && (
                <div>
                    <div className="flex justify-end mb-6 gap-2">
                        <button onClick={() => openModal('subjectTopper')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                            <Plus size={18} /> Add Subject Topper (XII)
                        </button>
                        <button onClick={() => openModal('subjectStat')} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
                            <Plus size={18} /> Add Subject Stat (X)
                        </button>
                    </div>

                    {/* Class XII Subject Toppers */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-iis-navy mb-4">Class XII - Subject Toppers</h3>
                        {subjectToppers.filter(s => s.student_class === 'XII').length > 0 ? (
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left px-4 py-3 text-sm font-bold text-gray-600">Subject</th>
                                            <th className="text-left px-4 py-3 text-sm font-bold text-gray-600">Student</th>
                                            <th className="text-center px-4 py-3 text-sm font-bold text-gray-600">Score</th>
                                            <th className="text-center px-4 py-3 text-sm font-bold text-gray-600">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjectToppers.filter(s => s.student_class === 'XII').map(s => (
                                            <tr key={s.id} className="border-t">
                                                <td className="px-4 py-3 font-medium">{s.subject}</td>
                                                <td className="px-4 py-3">{s.student_name}</td>
                                                <td className="px-4 py-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">{s.score}</span></td>
                                                <td className="px-4 py-3 text-center">
                                                    <button onClick={() => handleDeleteSubjectTopper(s.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">No subject toppers added for Class XII yet.</p>
                        )}
                    </div>

                    {/* Class X Subject Stats */}
                    <div>
                        <h3 className="text-lg font-bold text-iis-navy mb-4">Class X - Subject Performance</h3>
                        {subjectStats.filter(s => s.student_class === 'X').length > 0 ? (
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left px-4 py-3 text-sm font-bold text-gray-600">Subject</th>
                                            <th className="text-center px-4 py-3 text-sm font-bold text-gray-600">Merit Count</th>
                                            <th className="text-center px-4 py-3 text-sm font-bold text-gray-600">Highest Score</th>
                                            <th className="text-center px-4 py-3 text-sm font-bold text-gray-600">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjectStats.filter(s => s.student_class === 'X').map(s => (
                                            <tr key={s.id} className="border-t">
                                                <td className="px-4 py-3 font-medium">{s.subject}</td>
                                                <td className="px-4 py-3 text-center">{s.merit_count}</td>
                                                <td className="px-4 py-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">{s.highest_score}</span></td>
                                                <td className="px-4 py-3 text-center">
                                                    <button onClick={() => handleDeleteSubjectStat(s.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">No subject stats added for Class X yet.</p>
                        )}
                    </div>
                </div>
            )}

            {/* SECTION: Result Highlights */}
            {activeSection === 'stats' && (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Class XII Stats */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-iis-maroon">
                        <h3 className="text-xl font-bold text-iis-navy mb-4">Class XII Result Highlights</h3>
                        {resultStats.XII ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Pass Result:</span>
                                    <span className="font-bold text-green-600">{resultStats.XII.pass_result}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Distinctions:</span>
                                    <span className="font-bold text-iis-gold">{resultStats.XII.distinctions}</span>
                                </div>
                                <div className="p-3 bg-gray-50 rounded">
                                    <span className="font-medium block mb-2">Stream Highlights:</span>
                                    <div className="space-y-1">
                                        {(resultStats.XII.stream_highlights || []).map((h, idx) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span>{h.label}</span>
                                                <span className="font-bold">{h.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setEditingResultStat({
                                            student_class: 'XII',
                                            pass_result: resultStats.XII.pass_result,
                                            distinctions: resultStats.XII.distinctions,
                                            stream_highlights: resultStats.XII.stream_highlights || []
                                        });
                                        openModal('resultStat');
                                    }}
                                    className="w-full bg-iis-maroon text-white py-2 rounded hover:bg-red-900 transition"
                                >
                                    Edit Class XII Stats
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setEditingResultStat({ student_class: 'XII', pass_result: '100%', distinctions: 0, stream_highlights: [] });
                                    openModal('resultStat');
                                }}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Add Class XII Stats
                            </button>
                        )}
                    </div>

                    {/* Class X Stats */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-iis-gold">
                        <h3 className="text-xl font-bold text-iis-navy mb-4">Class X Result Highlights</h3>
                        {resultStats.X ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Pass Result:</span>
                                    <span className="font-bold text-green-600">{resultStats.X.pass_result}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Distinctions:</span>
                                    <span className="font-bold text-iis-gold">{resultStats.X.distinctions}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        setEditingResultStat({
                                            student_class: 'X',
                                            pass_result: resultStats.X.pass_result,
                                            distinctions: resultStats.X.distinctions,
                                            stream_highlights: resultStats.X.stream_highlights || []
                                        });
                                        openModal('resultStat');
                                    }}
                                    className="w-full bg-iis-gold text-iis-navy py-2 rounded hover:bg-yellow-500 transition font-bold"
                                >
                                    Edit Class X Stats
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setEditingResultStat({ student_class: 'X', pass_result: '100%', distinctions: 0, stream_highlights: [] });
                                    openModal('resultStat');
                                }}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Add Class X Stats
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* MODALS */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">
                                {modalType === 'achiever' && 'Add Achiever'}
                                {modalType === 'subjectTopper' && 'Add Subject Topper (XII)'}
                                {modalType === 'subjectStat' && 'Add Subject Stat (X)'}
                                {modalType === 'resultStat' && `Edit Class ${editingResultStat.student_class} Stats`}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>

                        {/* Add Achiever Form */}
                        {modalType === 'achiever' && (
                            <form onSubmit={handleSubmitAchiever} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Student Name</label>
                                    <input required type="text" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} className="w-full border p-2 rounded" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Class</label>
                                        <select value={newStudent.student_class} onChange={e => setNewStudent({ ...newStudent, student_class: e.target.value })} className="w-full border p-2 rounded">
                                            <option value="XII">Class XII</option>
                                            <option value="X">Class X</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Score (%)</label>
                                        <input required type="number" step="0.1" value={newStudent.score} onChange={e => setNewStudent({ ...newStudent, score: e.target.value })} className="w-full border p-2 rounded" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Category</label>
                                    <select value={newStudent.category} onChange={e => setNewStudent({ ...newStudent, category: e.target.value })} className="w-full border p-2 rounded">
                                        <option value="TOPPER">Top Performer (Main Card)</option>
                                        <option value="OTHER">Other Achiever (List)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Photo</label>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
                                    {uploading && <p className="text-xs text-blue-500">Uploading...</p>}
                                </div>
                                <div className="flex gap-2 justify-end mt-6">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-500">Cancel</button>
                                    <button type="submit" disabled={uploading} className="px-6 py-2 bg-iis-maroon text-white rounded">Add Student</button>
                                </div>
                            </form>
                        )}

                        {/* Add Subject Topper Form */}
                        {modalType === 'subjectTopper' && (
                            <form onSubmit={handleSubmitSubjectTopper} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Subject</label>
                                    <input required type="text" value={newSubjectTopper.subject} onChange={e => setNewSubjectTopper({ ...newSubjectTopper, subject: e.target.value })} className="w-full border p-2 rounded" placeholder="e.g. English, Mathematics" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Student Name</label>
                                    <input required type="text" value={newSubjectTopper.student_name} onChange={e => setNewSubjectTopper({ ...newSubjectTopper, student_name: e.target.value })} className="w-full border p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Score</label>
                                    <input required type="number" value={newSubjectTopper.score} onChange={e => setNewSubjectTopper({ ...newSubjectTopper, score: e.target.value })} className="w-full border p-2 rounded" />
                                </div>
                                <div className="flex gap-2 justify-end mt-6">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-500">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">Add Subject Topper</button>
                                </div>
                            </form>
                        )}

                        {/* Add Subject Stat Form */}
                        {modalType === 'subjectStat' && (
                            <form onSubmit={handleSubmitSubjectStat} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Subject</label>
                                    <input required type="text" value={newSubjectStat.subject} onChange={e => setNewSubjectStat({ ...newSubjectStat, subject: e.target.value })} className="w-full border p-2 rounded" placeholder="e.g. English, Mathematics" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Merit Count</label>
                                        <input required type="number" value={newSubjectStat.merit_count} onChange={e => setNewSubjectStat({ ...newSubjectStat, merit_count: e.target.value })} className="w-full border p-2 rounded" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Highest Score</label>
                                        <input required type="number" value={newSubjectStat.highest_score} onChange={e => setNewSubjectStat({ ...newSubjectStat, highest_score: e.target.value })} className="w-full border p-2 rounded" />
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-end mt-6">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-500">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded">Add Subject Stat</button>
                                </div>
                            </form>
                        )}

                        {/* Edit Result Stat Form */}
                        {modalType === 'resultStat' && (
                            <form onSubmit={handleSaveResultStat} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Pass Result</label>
                                    <input required type="text" value={editingResultStat.pass_result} onChange={e => setEditingResultStat({ ...editingResultStat, pass_result: e.target.value })} className="w-full border p-2 rounded" placeholder="e.g. 100%" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Distinctions</label>
                                    <input required type="number" value={editingResultStat.distinctions} onChange={e => setEditingResultStat({ ...editingResultStat, distinctions: e.target.value })} className="w-full border p-2 rounded" />
                                </div>
                                {editingResultStat.student_class === 'XII' && (
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Stream Highlights</label>
                                        <p className="text-xs text-gray-500 mb-2">Add stream-wise merit breakdown</p>
                                        {(editingResultStat.stream_highlights || []).map((h, idx) => (
                                            <div key={idx} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={h.label}
                                                    onChange={e => {
                                                        const updated = [...editingResultStat.stream_highlights];
                                                        updated[idx].label = e.target.value;
                                                        setEditingResultStat({ ...editingResultStat, stream_highlights: updated });
                                                    }}
                                                    className="flex-1 border p-2 rounded text-sm"
                                                    placeholder="Stream name"
                                                />
                                                <input
                                                    type="text"
                                                    value={h.value}
                                                    onChange={e => {
                                                        const updated = [...editingResultStat.stream_highlights];
                                                        updated[idx].value = e.target.value;
                                                        setEditingResultStat({ ...editingResultStat, stream_highlights: updated });
                                                    }}
                                                    className="w-32 border p-2 rounded text-sm"
                                                    placeholder="e.g. 16 Merits"
                                                />
                                                <button type="button" onClick={() => {
                                                    const updated = editingResultStat.stream_highlights.filter((_, i) => i !== idx);
                                                    setEditingResultStat({ ...editingResultStat, stream_highlights: updated });
                                                }} className="text-red-500 px-2">×</button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setEditingResultStat({
                                                ...editingResultStat,
                                                stream_highlights: [...(editingResultStat.stream_highlights || []), { label: '', value: '' }]
                                            })}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            + Add Stream
                                        </button>
                                    </div>
                                )}
                                <div className="flex gap-2 justify-end mt-6">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-500">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-iis-maroon text-white rounded">Save Stats</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
