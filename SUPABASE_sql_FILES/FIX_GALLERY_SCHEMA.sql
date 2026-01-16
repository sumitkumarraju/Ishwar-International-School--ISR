-- Fix gallery table schema
-- Add missing 'title' column

ALTER TABLE gallery ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS category text DEFAULT 'General';
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT timezone('utc'::text, now());
