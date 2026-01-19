# 🔧 Service Role Key Setup - CRITICAL FIX

## The Real Problem

Your API routes were using the **anon key** (public client), which is subject to RLS policies. When RLS blocks INSERT, you get 500 errors.

## The Solution

Use **service role key** in API routes to bypass RLS.

---

## Step 1: Get Service Role Key

1. Open **Supabase Dashboard**
2. Go to **Settings** → **API**
3. Find **service_role** key (NOT anon key)
4. Copy it

---

## Step 2: Add to .env.local

Add this line to your `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_service_role_key_here
```

⚠️ **IMPORTANT:** 
- This key has FULL database access
- NEVER expose it in frontend code
- NEVER commit it to git
- Only use in API routes (server-side)

---

## Step 3: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## What Was Changed

### Created: `lib/supabaseServer.js`
- Server-side Supabase client
- Uses service role key
- Bypasses RLS policies

### Updated: `app/api/alumni/route.js`
- Changed from `supabase` (anon key) to `supabaseServer` (service role)
- All database operations now use service role

---

## Architecture

```
Frontend (Browser)
  ↓ (uses anon key)
  ↓ fetch('/api/alumni')
  ↓
API Route (Server)
  ↓ (uses service role key)
  ↓ supabaseServer
  ↓
Supabase Database
  ✅ Bypasses RLS
```

---

## Why This Works

- **Anon Key:** Limited permissions, subject to RLS
- **Service Role Key:** Full access, bypasses RLS
- **API Routes:** Run on server, safe to use service role

---

## Testing

After adding the service role key and restarting:

1. Go to `/alumni/register`
2. Fill the form
3. Submit
4. **Expected:** "Registration Successful!" ✅

No SQL changes needed! The service role key bypasses RLS.

---

## Security Notes

✅ **Safe:** Using service role in API routes (server-side)  
❌ **NEVER:** Use service role in frontend components  
✅ **Safe:** Anon key in frontend (limited by RLS)  
✅ **Safe:** Service role in `/app/api/*` routes

---

## If Still Not Working

Check:
1. Service role key is correct (from Supabase dashboard)
2. `.env.local` has `SUPABASE_SERVICE_ROLE_KEY=...`
3. Dev server was restarted after adding key
4. No typos in the key
