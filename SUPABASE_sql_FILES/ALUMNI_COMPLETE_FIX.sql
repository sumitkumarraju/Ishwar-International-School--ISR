-- =============================================
-- COMPLETE FIX FOR ALUMNI TABLE
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Fix UUID Auto-Generation (CRITICAL!)
ALTER TABLE alumni
ALTER COLUMN id
SET DEFAULT gen_random_uuid();

-- 2. Ensure RLS is enabled
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

-- 3. Drop all existing policies (clean slate)
DROP POLICY IF EXISTS "Allow public insert" ON alumni;
DROP POLICY IF EXISTS "Allow public read approved" ON alumni;
DROP POLICY IF EXISTS "Allow authenticated read all" ON alumni;
DROP POLICY IF EXISTS "Allow authenticated update" ON alumni;
DROP POLICY IF EXISTS "Allow authenticated delete" ON alumni;
DROP POLICY IF EXISTS "Enable insert for all users" ON alumni;
DROP POLICY IF EXISTS "Enable read for approved alumni" ON alumni;
DROP POLICY IF EXISTS "Enable read all for authenticated" ON alumni;
DROP POLICY IF EXISTS "Enable update for authenticated" ON alumni;
DROP POLICY IF EXISTS "Enable delete for authenticated" ON alumni;

-- 4. Create correct policies
CREATE POLICY "Allow public insert"
ON alumni
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public read approved"
ON alumni
FOR SELECT
USING (is_approved = true);

CREATE POLICY "Allow authenticated read all"
ON alumni
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated update"
ON alumni
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
ON alumni
FOR DELETE
TO authenticated
USING (true);

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Check UUID default is set
SELECT 
    column_name,
    column_default,
    is_nullable,
    data_type
FROM information_schema.columns
WHERE table_name = 'alumni' AND column_name = 'id';
-- Expected: column_default should contain 'gen_random_uuid()'

-- Check RLS policies
SELECT 
    policyname,
    cmd as operation,
    roles,
    permissive
FROM pg_policies
WHERE tablename = 'alumni'
ORDER BY cmd;
-- Expected: 5 policies (INSERT, SELECT x2, UPDATE, DELETE)

-- Test insert (will auto-generate UUID)
INSERT INTO alumni (name, email, batch, "current_role", company)
VALUES ('Test User', 'test-' || NOW()::text || '@example.com', '2020', 'Engineer', 'TestCo')
RETURNING id, name, email;
-- Expected: Should return a row with auto-generated UUID

-- Clean up test data
DELETE FROM alumni WHERE name = 'Test User';

-- Final status
SELECT 'Alumni table is ready!' as status;
