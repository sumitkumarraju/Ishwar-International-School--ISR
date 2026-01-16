-- Disable RLS for admissions table to allow public submissions
-- This is necessary for the public-facing admissions form to work

alter table admissions disable row level security;

-- Alternatively, if you want to keep RLS enabled, you can create a policy
-- that allows anyone to insert (but this is less secure for public forms):
-- 
-- create policy "Allow public inserts" on admissions
-- for insert with check (true);
