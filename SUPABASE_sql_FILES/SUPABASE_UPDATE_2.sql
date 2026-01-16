-- MORE TABLES FOR ADMIN PANEL MODULES (BATCH 2)

-- 9. MENUS
create table menus (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  path text not null,
  parent_id uuid references menus(id),
  display_order int default 0,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table menus enable row level security;
create policy "Public menus view" on menus for select to public using (true);
create policy "Admin menus manage" on menus for all to authenticated using (true);

-- 10. DYNAMIC PAGES
create table pages (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  content text, -- HTML content
  meta_description text,
  is_published boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table pages enable row level security;
create policy "Public pages view" on pages for select to public using (is_published = true);
create policy "Admin pages view all" on pages for select to authenticated using (true);
create policy "Admin pages manage" on pages for all to authenticated using (true);
