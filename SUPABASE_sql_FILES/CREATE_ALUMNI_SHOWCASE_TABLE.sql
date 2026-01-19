-- =====================================================
-- Alumni Showcase Table Setup
-- =====================================================
-- This table stores featured alumni displayed on the homepage
-- Separate from the 'alumni' table which stores alumni registrations
-- =====================================================

-- Create alumni_showcase table
CREATE TABLE IF NOT EXISTS alumni_showcase (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    batch VARCHAR(50) NOT NULL,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    quote TEXT,
    image_url TEXT,
    linkedin_url TEXT,
    is_featured BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries on featured alumni
CREATE INDEX IF NOT EXISTS idx_alumni_showcase_featured 
ON alumni_showcase(is_featured, display_order);

-- Create index for name searches
CREATE INDEX IF NOT EXISTS idx_alumni_showcase_name 
ON alumni_showcase(name);

-- =====================================================
-- Triggers
-- =====================================================

-- Create or replace the update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at timestamp
DROP TRIGGER IF EXISTS update_alumni_showcase_updated_at ON alumni_showcase;
CREATE TRIGGER update_alumni_showcase_updated_at
    BEFORE UPDATE ON alumni_showcase
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================

-- Enable Row Level Security
ALTER TABLE alumni_showcase ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view featured alumni" ON alumni_showcase;
DROP POLICY IF EXISTS "Admins can manage alumni showcase" ON alumni_showcase;

-- Public read access for featured alumni only
CREATE POLICY "Public can view featured alumni"
    ON alumni_showcase FOR SELECT
    USING (is_featured = true);

-- Admin full access (authenticated users can manage)
-- Adjust this based on your specific auth setup
CREATE POLICY "Admins can manage alumni showcase"
    ON alumni_showcase FOR ALL
    USING (auth.role() = 'authenticated');

-- =====================================================
-- Sample Data (Optional - Remove if not needed)
-- =====================================================

-- Insert sample featured alumni
INSERT INTO alumni_showcase (name, batch, role, company, quote, is_featured, display_order)
VALUES 
    ('Dr. Anjali Verma', 'Class of 2012', 'Senior Surgeon', 'AIIMS', 
     'The values of discipline and integrity I learned at Ishwar International have guided me through every success in my medical career.', 
     true, 1),
    ('Capt. Ravi Singh', 'Class of 2014', 'Officer', 'Indian Army', 
     'Service before self. This motto was ingrained in me during my NCC days at school. Forever grateful to my mentors.', 
     true, 2),
    ('Vikram Malhotra', 'Class of 2015', 'Tech Lead', 'Google', 
     'From the computer labs of IIS to the tech giant Google, the foundation was laid here. The coding club was my launchpad.', 
     true, 3),
    ('Priya Desai', 'Class of 2018', 'Founder', 'GreenEarth', 
     'The entrepreneurial spirit was encouraged by my commerce teachers. They taught me to dream big and take calculated risks.', 
     true, 4)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Verification Queries
-- =====================================================

-- View all featured alumni
-- SELECT * FROM alumni_showcase WHERE is_featured = true ORDER BY display_order;

-- Count total alumni showcase entries
-- SELECT COUNT(*) as total_alumni FROM alumni_showcase;

-- View recently added alumni
-- SELECT * FROM alumni_showcase ORDER BY created_at DESC LIMIT 5;
