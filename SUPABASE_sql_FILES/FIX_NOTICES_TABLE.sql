-- Fix notices table schema
-- Add missing 'active' column and disable RLS

ALTER TABLE notices ADD COLUMN IF NOT EXISTS active boolean DEFAULT true;
ALTER TABLE notices DISABLE ROW LEVEL SECURITY;
