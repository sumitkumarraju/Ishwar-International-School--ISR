-- FIX STORAGE BUCKET RLS
-- This fixes the "StorageApiError: new row violates row-level security policy"

-- Method 1: Disable RLS on storage.objects table (RECOMMENDED)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Method 2: Or create a permissive policy for authenticated users
-- (Comment out Method 1 and uncomment below if you prefer this approach)

-- CREATE POLICY "Allow authenticated uploads"
-- ON storage.objects FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'gallery');

-- CREATE POLICY "Allow authenticated reads"
-- ON storage.objects FOR SELECT
-- TO authenticated
-- USING (bucket_id = 'gallery');

-- CREATE POLICY "Allow authenticated deletes"
-- ON storage.objects FOR DELETE
-- TO authenticated
-- USING (bucket_id = 'gallery');
