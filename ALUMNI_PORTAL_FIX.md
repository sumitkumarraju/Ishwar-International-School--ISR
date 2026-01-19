# 🔧 Alumni Portal Fix - Complete Guide

## Current Issue
Alumni registration is failing with **500 Internal Server Error**.

## Root Causes (Multiple Issues)

### 1. API Route Bug
The `.single()` method throws an error when checking if email exists but no record is found.

**Fix Applied:** Changed to `.maybeSingle()` in `app/api/alumni/route.js`

### 2. Missing UUID Default (Critical!)
The `alumni` table's `id` column needs auto-generation.

### 3. RLS Policies Blocking INSERT
Row Level Security policies may be preventing public registration.

---

## Complete Fix - Run This SQL

**File:** `SUPABASE_sql_FILES/ALUMNI_COMPLETE_FIX.sql`

Copy and run this in your Supabase SQL Editor:

```sql
-- =============================================
-- COMPLETE FIX FOR ALUMNI TABLE
-- =============================================

-- 1. Fix UUID Auto-Generation
ALTER TABLE alumni
ALTER COLUMN id
SET DEFAULT gen_random_uuid();

-- 2. Ensure RLS is enabled
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

-- 3. Drop all existing policies
DROP POLICY IF EXISTS "Allow public insert" ON alumni;
DROP POLICY IF EXISTS "Allow public read approved" ON alumni;
DROP POLICY IF EXISTS "Allow authenticated read all" ON alumni;
DROP POLICY IF EXISTS "Allow authenticated update" ON alumni;
DROP POLICY IF EXISTS "Allow authenticated delete" ON alumni;

-- 4. Create correct policies
CREATE POLICY "Allow public insert"
ON alumni
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public read approved"
ON alumni
FOR SELECT
USING (is_approved = true);

CREATE POLICY "Allow authenticated read all"
ON alumni
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated update"
ON alumni
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
ON alumni
FOR DELETE
TO authenticated
USING (true);

-- 5. Verify the fix
SELECT 
    column_name,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'alumni' AND column_name = 'id';

SELECT 
    'Policies created: ' || COUNT(*)::text as status
FROM pg_policies
WHERE tablename = 'alumni';
```

---

## After Running the SQL

1. **Check the terminal** running `npm run dev` for error logs
2. **Test registration** at http://localhost:3000/alumni/register
3. **Check browser console** (F12) for any errors

---

## Expected Result

✅ Registration form submits successfully  
✅ Shows "Registration Successful!" message  
✅ Data appears in Supabase `alumni` table  
✅ `is_approved` = false (pending admin approval)

---

## If Still Failing

Check the terminal logs for the exact error message. Common errors:

- **"relation 'alumni' does not exist"** → Table not created
- **"column 'current_role' does not exist"** → Column name mismatch
- **"new row violates row-level security"** → RLS policy issue
- **"null value in column 'id'"** → UUID default not set

---

## Quick Test

After running the SQL, try this in Supabase SQL Editor:

```sql
-- Test insert
INSERT INTO alumni (name, email, batch, current_role, company)
VALUES ('Test User', 'test@example.com', '2020', 'Engineer', 'TestCo');

-- Check if it worked
SELECT * FROM alumni WHERE email = 'test@example.com';

-- Clean up
DELETE FROM alumni WHERE email = 'test@example.com';
```

If this works, the API should work too!
