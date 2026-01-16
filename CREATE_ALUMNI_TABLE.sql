-- =============================================
-- Alumni Table Setup for Supabase
-- =============================================

-- Drop existing table if needed (use with caution)
DROP TABLE IF EXISTS alumni CASCADE;

-- Create alumni table
CREATE TABLE alumni (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    batch TEXT NOT NULL,
    "current_role" TEXT NOT NULL,
    company TEXT NOT NULL,
    image TEXT,
    linkedin TEXT,
    quote TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_alumni_email ON alumni(email);

-- Create index on approval status for filtering
CREATE INDEX idx_alumni_approved ON alumni(is_approved);

-- Create index on batch for sorting
CREATE INDEX idx_alumni_batch ON alumni(batch);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anyone to INSERT (for public registration)
DROP POLICY IF EXISTS "Allow public alumni registration" ON alumni;
CREATE POLICY "Allow public alumni registration"
ON alumni FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Allow anyone to SELECT approved alumni (for public directory)
DROP POLICY IF EXISTS "Allow public to view approved alumni" ON alumni;
CREATE POLICY "Allow public to view approved alumni"
ON alumni FOR SELECT
TO anon, authenticated
USING (is_approved = true);

-- Policy 3: Allow authenticated users (admin) to view ALL alumni
DROP POLICY IF EXISTS "Allow admin to view all alumni" ON alumni;
CREATE POLICY "Allow admin to view all alumni"
ON alumni FOR SELECT
TO authenticated
USING (true);

-- Policy 4: Allow authenticated users (admin) to UPDATE alumni
DROP POLICY IF EXISTS "Allow admin to update alumni" ON alumni;
CREATE POLICY "Allow admin to update alumni"
ON alumni FOR UPDATE
TO authenticated
USING (true);

-- Policy 5: Allow authenticated users (admin) to DELETE alumni
DROP POLICY IF EXISTS "Allow admin to delete alumni" ON alumni;
CREATE POLICY "Allow admin to delete alumni"
ON alumni FOR DELETE
TO authenticated
USING (true);

-- =============================================
-- Trigger for updated_at timestamp
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_alumni_updated_at ON alumni;
CREATE TRIGGER update_alumni_updated_at
    BEFORE UPDATE ON alumni
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Sample Data (Optional - for testing)
-- =============================================

-- Uncomment to insert sample data
/*
INSERT INTO alumni (name, email, batch, current_role, company, image, linkedin, quote, is_approved)
VALUES 
    ('Dr. Anjali Verma', 'anjali.verma@example.com', '2012', 'Senior Surgeon', 'AIIMS', 
     'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop',
     'https://linkedin.com/in/anjali-verma',
     'The values of discipline and integrity I learned at Ishwar International have guided me through every success in my medical career.',
     true),
    ('Capt. Ravi Singh', 'ravi.singh@example.com', '2014', 'Officer', 'Indian Army',
     'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&fit=crop',
     'https://linkedin.com/in/ravi-singh',
     'Service before self. This motto was ingrained in me during my NCC days at school. Forever grateful to my mentors.',
     true);
*/

-- =============================================
-- Verify Setup
-- =============================================

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'alumni'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'alumni';
