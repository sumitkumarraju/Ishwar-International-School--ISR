-- COMPREHENSIVE REPAIR FOR PUBLIC DISCLOSURES
-- Run this in Supabase SQL Editor

-- 1. Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS public_disclosures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. DISABLE Row Level Security (RLS)
-- This is the most reliable way to ensure public access
ALTER TABLE public_disclosures DISABLE ROW LEVEL SECURITY;

-- 3. Verify it worked
SELECT 
    tablename, 
    rowsecurity as rls_enabled 
FROM pg_tables 
WHERE tablename = 'public_disclosures';

-- 4. Check if there is any data
SELECT count(*) FROM public_disclosures;
