-- QUICK FIX: Disable RLS on enquiries and public_disclosures tables
-- This is the fastest solution to unblock form submissions
-- Run this in Supabase SQL Editor

-- Disable RLS on enquiries table (allows public form submissions)
ALTER TABLE enquiries DISABLE ROW LEVEL SECURITY;

-- Disable RLS on public_disclosures table (allows public viewing)
ALTER TABLE public_disclosures DISABLE ROW LEVEL SECURITY;

-- Verify (should show 'f' for false in rowsecurity column)
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('enquiries', 'public_disclosures');
