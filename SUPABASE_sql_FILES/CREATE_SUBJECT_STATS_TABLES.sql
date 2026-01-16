-- Subject Toppers Table (for Class XII)
CREATE TABLE IF NOT EXISTS subject_toppers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_class VARCHAR(5) NOT NULL DEFAULT 'XII',
    subject VARCHAR(100) NOT NULL,
    score INTEGER NOT NULL,
    student_name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subject Stats Table (for Class X - merit count and highest score)
CREATE TABLE IF NOT EXISTS subject_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_class VARCHAR(5) NOT NULL DEFAULT 'X',
    subject VARCHAR(100) NOT NULL,
    merit_count INTEGER NOT NULL DEFAULT 0,
    highest_score INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Result Stats Table (pass result, distinctions, stream-wise highlights)
CREATE TABLE IF NOT EXISTS result_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_class VARCHAR(5) NOT NULL,
    pass_result VARCHAR(10) NOT NULL DEFAULT '100%',
    distinctions INTEGER NOT NULL DEFAULT 0,
    stream_highlights JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_class)
);

-- Enable RLS
ALTER TABLE subject_toppers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE result_stats ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read subject_toppers" ON subject_toppers FOR SELECT USING (true);
CREATE POLICY "Public can read subject_stats" ON subject_stats FOR SELECT USING (true);
CREATE POLICY "Public can read result_stats" ON result_stats FOR SELECT USING (true);

-- Admin write policies
CREATE POLICY "Admin can insert subject_toppers" ON subject_toppers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update subject_toppers" ON subject_toppers FOR UPDATE USING (true);
CREATE POLICY "Admin can delete subject_toppers" ON subject_toppers FOR DELETE USING (true);

CREATE POLICY "Admin can insert subject_stats" ON subject_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update subject_stats" ON subject_stats FOR UPDATE USING (true);
CREATE POLICY "Admin can delete subject_stats" ON subject_stats FOR DELETE USING (true);

CREATE POLICY "Admin can insert result_stats" ON result_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update result_stats" ON result_stats FOR UPDATE USING (true);
CREATE POLICY "Admin can delete result_stats" ON result_stats FOR DELETE USING (true);

-- Insert default data for Class XII
INSERT INTO result_stats (student_class, pass_result, distinctions, stream_highlights)
VALUES ('XII', '100%', 32, '[{"label": "Science Stream", "value": "16 Merits"}, {"label": "Commerce Stream", "value": "05 Merits"}, {"label": "Humanities", "value": "11 Merits"}]'::jsonb)
ON CONFLICT (student_class) DO NOTHING;

-- Insert default data for Class X
INSERT INTO result_stats (student_class, pass_result, distinctions, stream_highlights)
VALUES ('X', '100%', 35, '[]'::jsonb)
ON CONFLICT (student_class) DO NOTHING;
