-- First update the table structure
ALTER TABLE fees 
ADD COLUMN IF NOT EXISTS first_child_fee TEXT,
ADD COLUMN IF NOT EXISTS second_child_fee TEXT,
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';

-- Clear existing data (optional - remove if you want to keep old data)
-- DELETE FROM fees;

-- Insert Pre-Primary fees
INSERT INTO fees (class_name, first_child_fee, second_child_fee, category, active, display_order)
VALUES 
('Nursery', '₹ 2,550', '₹ 2,550', 'Pre-Primary', true, 1),
('L.K.G.', '₹ 3,300', '₹ 3,100', 'Pre-Primary', true, 2),
('U.K.G.', '₹ 3,300', '₹ 3,100', 'Pre-Primary', true, 3);

-- Insert Primary Wing fees
INSERT INTO fees (class_name, first_child_fee, second_child_fee, category, active, display_order)
VALUES 
('1st', '₹ 3,600', '₹ 3,400', 'Primary Wing', true, 4),
('2nd', '₹ 3,600', '₹ 3,400', 'Primary Wing', true, 5),
('3rd', '₹ 4,000', '₹ 3,750', 'Primary Wing', true, 6),
('4th', '₹ 4,000', '₹ 3,750', 'Primary Wing', true, 7),
('5th', '₹ 4,000', '₹ 3,750', 'Primary Wing', true, 8);

-- Insert Middle & Senior fees
INSERT INTO fees (class_name, first_child_fee, second_child_fee, category, active, display_order)
VALUES 
('6th', '₹ 4,500', '₹ 4,150', 'Middle & Senior', true, 9),
('7th', '₹ 4,500', '₹ 4,150', 'Middle & Senior', true, 10),
('8th', '₹ 4,500', '₹ 4,150', 'Middle & Senior', true, 11),
('9th', '₹ 5,000', '₹ 4,650', 'Middle & Senior', true, 12),
('10th', '₹ 5,000', '₹ 4,650', 'Middle & Senior', true, 13),
('11th/12th (Commerce)', '₹ 5,550', '₹ 5,000', 'Middle & Senior', true, 14),
('11th/12th (Science)', '₹ 5,800', '₹ 5,350', 'Middle & Senior', true, 15);

-- Verify the data
SELECT category, class_name, first_child_fee, second_child_fee 
FROM fees 
ORDER BY display_order;
