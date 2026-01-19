-- =====================================================
-- STORAGE SETUP FOR ALUMNI IMAGES
-- Run this in Supabase SQL Editor to fix "Bucket not found" error
-- =====================================================

-- 1. Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('alumni-images', 'alumni-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on objects (standard practice, though often enabled by default)
-- Skipped to avoid ownership errors: ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
DROP POLICY IF EXISTS "Public can view alumni images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload alumni images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update alumni images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete alumni images" ON storage.objects;

-- 4. Create Policies

-- Policy: Public can view images
CREATE POLICY "Public can view alumni images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'alumni-images' );

-- Policy: Authenticated users (Admin/Staff) can upload images
CREATE POLICY "Authenticated can upload alumni images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'alumni-images' );

-- Policy: Authenticated users can update images
CREATE POLICY "Authenticated can update alumni images"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'alumni-images' );

-- Policy: Authenticated users can delete images
CREATE POLICY "Authenticated can delete alumni images"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'alumni-images' );

-- =====================================================
-- VERIFICATION
-- =====================================================
-- After running this, try uploading an image again.
