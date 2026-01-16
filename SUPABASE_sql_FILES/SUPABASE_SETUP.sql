-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ADMISSIONS TABLE
create table admissions (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  dob text not null,
  gender text not null,
  class_applying_for text not null,
  previous_school text,
  last_grade_percentage text,
  father_name text not null,
  mobile text not null,
  email text,
  address text,
  status text default 'New',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for Admissions
alter table admissions enable row level security;

-- Policies for Admissions
create policy "Public can submit admission" 
on admissions for insert 
to public 
with check (true);

create policy "Admins can view admissions" 
on admissions for select 
to authenticated 
using (true); -- Assuming all authenticated users are admins for now, or check specific role

create policy "Admins can update admissions" 
on admissions for update
to authenticated 
using (true);

-- 2. GALLERY TABLE
create table gallery (
  id uuid primary key default uuid_generate_v4(),
  title text,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for Gallery
alter table gallery enable row level security;

-- Policies for Gallery
create policy "Public can view gallery" 
on gallery for select 
to public 
using (true);

create policy "Admins can manage gallery" 
on gallery for all 
to authenticated 
using (true);

-- 3. NOTICES TABLE
create table notices (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for Notices
alter table notices enable row level security;

-- Policies for Notices
create policy "Public can view active notices" 
on notices for select 
to public 
using (true);

create policy "Admins can manage notices" 
on notices for all 
to authenticated 
using (true);

-- 4. ENQUIRIES TABLE
create table enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  message text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for Enquiries
alter table enquiries enable row level security;

-- Policies for Enquiries
create policy "Public can submit enquiries" 
on enquiries for insert 
to public 
with check (true);

create policy "Admins can view enquiries" 
on enquiries for select 
to authenticated 
using (true);

create policy "Admins can delete enquiries" 
on enquiries for delete 
to authenticated 
using (true);

-- 5. STORAGE BUCKET (SQL to create bucket is not standard, execute this in creating a bucket named 'gallery' in Storage dashboard)
-- Set bucket to public.

-- 5. ADMINS (Optional: if you want a table to track specific admin roles)
create table admins (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'admin'
);

alter table admins enable row level security;

create policy "Admins can view admins" 
on admins for select 
to authenticated 
using (true);
