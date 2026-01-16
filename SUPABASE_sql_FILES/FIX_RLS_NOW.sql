-- EMERGENCY FIX: Disable Row Level Security on all tables
-- Run this if you're getting "violates row-level security policy" errors

ALTER TABLE admissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides DISABLE ROW LEVEL SECURITY;
ALTER TABLE achievers DISABLE ROW LEVEL SECURITY;

-- Verify it worked (should show 'f' for false in the relrowsecurity column)
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('admissions', 'hero_slides', 'achievers');
