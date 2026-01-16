-- Fix gallery table RLS issue
-- Disable Row Level Security to allow admin uploads

ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
