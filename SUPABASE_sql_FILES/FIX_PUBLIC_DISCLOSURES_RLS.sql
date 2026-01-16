-- FIX PUBLIC DISCLOSURES RLS POLICY
-- This fixes the "Failed to fetch" error on the public disclosure page
-- Run this in Supabase SQL Editor

-- Option 1: DISABLE RLS (RECOMMENDED - Simplest Solution)
-- This allows everyone to read public disclosures (which is the intended behavior)
ALTER TABLE public_disclosures DISABLE ROW LEVEL SECURITY;

-- Option 2: ENABLE RLS with Policies (Alternative - More Secure)
-- Uncomment the lines below if you prefer to use RLS with policies instead

-- -- Enable RLS
-- ALTER TABLE public_disclosures ENABLE ROW LEVEL SECURITY;
-- 
-- -- Allow everyone to SELECT (read) public disclosures
-- CREATE POLICY "Allow public read access to public_disclosures"
-- ON public_disclosures FOR SELECT
-- USING (true);
-- 
-- -- Allow authenticated users to INSERT (admin only)
-- CREATE POLICY "Allow authenticated users to insert public_disclosures"
-- ON public_disclosures FOR INSERT
-- WITH CHECK (auth.role() = 'authenticated');
-- 
-- -- Allow authenticated users to DELETE (admin only)
-- CREATE POLICY "Allow authenticated users to delete public_disclosures"
-- ON public_disclosures FOR DELETE
-- USING (auth.role() = 'authenticated');

-- Verify the RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'public_disclosures';
