-- Migrate existing faculty data from website to Supabase
-- Based on the leadership/staff shown on the website

-- Insert Principal
INSERT INTO staff (name, designation, image_url, active, display_order) VALUES
('Mrs. Sunita Devi', 'Principal', '/leadership/principal.jpg', true, 1);

-- Insert Vice Principal
INSERT INTO staff (name, designation, image_url, active, display_order) VALUES
('Mr. Rajesh Kumar', 'Vice Principal', '/leadership/vice-principal.jpg', true, 2);

-- Add more faculty members as shown on your website
-- You can get the exact names and designations from /app/about/page.js or the website
-- Then add them here with this format:
-- INSERT INTO staff (name, designation, image_url, active, display_order) VALUES
-- ('Teacher Name', 'Designation', '/path/to/photo.jpg', true, ORDER_NUMBER);

-- Note: After running this, you'll need to upload the actual images via the admin portal
-- or upload them to Supabase Storage and update the image URLs

-- Disable RLS for staff table
ALTER TABLE staff DISABLE ROW LEVEL SECURITY;
