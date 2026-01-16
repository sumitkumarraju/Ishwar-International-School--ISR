-- Update fees table to match the new structure with 1st and 2nd child
ALTER TABLE fees 
ADD COLUMN IF NOT EXISTS first_child_fee TEXT,
ADD COLUMN IF NOT EXISTS second_child_fee TEXT,
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';

-- Update existing data or create new structure
-- You can either migrate existing data or start fresh

-- Optional: If you want to keep old columns for reference
-- Leave tuition_fee, transport_fee, other_fees, total_fee

-- Categories: 'Pre-Primary', 'Primary Wing', 'Middle & Senior'
