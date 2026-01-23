'use client';
import { useState, useEffect } from 'react';

export default function VisitorsPage() {
    const [visitors, setVisitors] = useState([]);

    useEffect(() => {
        // Simulating data fetch
        const timer = setTimeout(() => {
            setVisitors([
                { id: 1, ip: '192.168.1.1', page: '/', time: new Date().toLocaleString() },
                { id: 2, ip: '10.0.0.5', page: '/admissions', time: new Date(Date.now() - 3600000).toLocaleString() },
            ]);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-slate-800">Visitor Logs</h2>
                <p className="text-sm text-slate-500">Recent activity on the website</p>
            </div>

            <div className="bg-white rounded shadow-sm border overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">IP Address</th>
                            <th className="p-4 font-semibold text-gray-600">Page Visited</th>
                            <th className="p-4 font-semibold text-gray-600">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map(v => (
                            <tr key={v.id} className="border-b last:border-0">
                                <td className="p-4 font-mono text-slate-600">{v.ip}</td>
                                <td className="p-4 text-slate-800">{v.page}</td>
                                <td className="p-4 text-gray-400">{v.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 text-center text-xs text-gray-400 bg-gray-50">
                    Real-time logging requires server-side middleware configuration.
                </div>
            </div>
        </div>
    );
}
