-- Add missing columns to the admissions table
alter table admissions add column if not exists address text;
alter table admissions add column if not exists mobile text;

-- Ensure other columns are present (just in case)
alter table admissions add column if not exists father_name text;
alter table admissions add column if not exists previous_school text;
alter table admissions add column if not exists class_applying_for text;
alter table admissions add column if not exists last_grade_percentage text;
