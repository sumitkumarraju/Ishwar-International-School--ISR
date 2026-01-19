-- =============================================
-- FIX RLS POLICY FOR ALUMNI TABLE
-- This ensures both anonymous AND authenticated users can insert
-- =============================================

-- Drop the restrictive insert policy
DROP POLICY IF EXISTS "Allow public insert" ON alumni;

-- Create a permissive insert policy for EVERYONE (anon + authenticated)
CREATE POLICY "Enable insert for all users"
ON alumni
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Verify the policy was created
SELECT 
    policyname,
    cmd as operation,
    roles,
    qual as using_expression,
    with_check as with_check_expression
FROM pg_policies
WHERE tablename = 'alumni' AND cmd = 'INSERT';
