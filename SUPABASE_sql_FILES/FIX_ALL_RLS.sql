-- COMPREHENSIVE RLS FIX FOR ALL ADMIN TABLES
-- Run this to fix all Row Level Security issues at once

-- Disable RLS on all tables
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE notices DISABLE ROW LEVEL SECURITY;
ALTER TABLE quotes DISABLE ROW LEVEL SECURITY;
ALTER TABLE staff DISABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides DISABLE ROW LEVEL SECURITY;
ALTER TABLE achievers DISABLE ROW LEVEL SECURITY;
ALTER TABLE admissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE headlines DISABLE ROW LEVEL SECURITY;

-- Verify it worked (should show 'f' for false in rowsecurity column)
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('gallery', 'notices', 'quotes', 'staff', 'hero_slides', 'achievers', 'admissions', 'headlines');
