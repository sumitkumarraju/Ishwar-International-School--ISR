-- Fix Admissions Table - Add Status Column
-- Run this script in Supabase SQL Editor

-- Add status column to admissions table
ALTER TABLE admissions 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New';

-- Add check constraint to ensure only valid status values
ALTER TABLE admissions
DROP CONSTRAINT IF EXISTS admissions_status_check;

ALTER TABLE admissions
ADD CONSTRAINT admissions_status_check 
CHECK (status IN ('New', 'Under Review', 'Accepted', 'Rejected'));

-- Update any existing NULL values to 'New'
UPDATE admissions 
SET status = 'New' 
WHERE status IS NULL;

-- Enable RLS on admissions table
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON admissions;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON admissions;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON admissions;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON admissions;

-- Create RLS policies
-- Allow anyone to read admissions (for public admission status checks)
CREATE POLICY "Enable read access for all users"
ON admissions FOR SELECT
TO public
USING (true);

-- Allow anonymous users to insert (for public admission form)
CREATE POLICY "Enable insert for anonymous users"
ON admissions FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to update (for admin portal)
CREATE POLICY "Enable update for authenticated users"
ON admissions FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete (for admin portal)
CREATE POLICY "Enable delete for authenticated users"
ON admissions FOR DELETE
TO authenticated
USING (true);

-- Verify the changes
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'admissions' 
ORDER BY ordinal_position;
