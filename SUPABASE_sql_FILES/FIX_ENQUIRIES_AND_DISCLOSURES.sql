-- =====================================================
-- FIX ENQUIRIES AND PUBLIC DISCLOSURES TABLES
-- =====================================================
-- This script ensures the enquiries and public_disclosures tables exist
-- with proper RLS policies for public form submissions and file display

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ENQUIRIES TABLE
-- =====================================================

-- Create enquiries table if it doesn't exist
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Drop existing RLS policies to recreate them
DROP POLICY IF EXISTS "Public can submit enquiries" ON enquiries;
DROP POLICY IF EXISTS "Anyone can submit enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admins can view enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admins can delete enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admins can update enquiries" ON enquiries;

-- Enable RLS on enquiries table
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (even anonymous users) to insert enquiries
CREATE POLICY "Anyone can submit enquiries" 
ON enquiries FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users (admins) to view all enquiries
CREATE POLICY "Admins can view enquiries" 
ON enquiries FOR SELECT 
TO authenticated 
USING (true);

-- Allow authenticated users (admins) to update enquiries
CREATE POLICY "Admins can update enquiries" 
ON enquiries FOR UPDATE 
TO authenticated 
USING (true);

-- Allow authenticated users (admins) to delete enquiries
CREATE POLICY "Admins can delete enquiries" 
ON enquiries FOR DELETE 
TO authenticated 
USING (true);

-- =====================================================
-- 2. PUBLIC DISCLOSURES TABLE
-- =====================================================

-- Create public_disclosures table if it doesn't exist
CREATE TABLE IF NOT EXISTS public_disclosures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Drop existing RLS policies to recreate them
DROP POLICY IF EXISTS "Public can view disclosures" ON public_disclosures;
DROP POLICY IF EXISTS "Anyone can view disclosures" ON public_disclosures;
DROP POLICY IF EXISTS "Admins can manage disclosures" ON public_disclosures;
DROP POLICY IF EXISTS "Admins can insert disclosures" ON public_disclosures;
DROP POLICY IF EXISTS "Admins can update disclosures" ON public_disclosures;
DROP POLICY IF EXISTS "Admins can delete disclosures" ON public_disclosures;

-- Enable RLS on public_disclosures table
ALTER TABLE public_disclosures ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (including anonymous users) to view public disclosures
CREATE POLICY "Anyone can view disclosures" 
ON public_disclosures FOR SELECT 
TO anon, authenticated
USING (true);

-- Allow authenticated users (admins) to insert disclosures
CREATE POLICY "Admins can insert disclosures" 
ON public_disclosures FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Allow authenticated users (admins) to update disclosures
CREATE POLICY "Admins can update disclosures" 
ON public_disclosures FOR UPDATE 
TO authenticated 
USING (true);

-- Allow authenticated users (admins) to delete disclosures
CREATE POLICY "Admins can delete disclosures" 
ON public_disclosures FOR DELETE 
TO authenticated 
USING (true);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if tables exist
SELECT 
    tablename, 
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('enquiries', 'public_disclosures');

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE tablename IN ('enquiries', 'public_disclosures')
ORDER BY tablename, policyname;
