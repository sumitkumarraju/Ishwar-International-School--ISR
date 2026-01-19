# Supabase 406 Error - Fixed

## Issue
Getting 406 (Not Acceptable) errors from Supabase REST API when fetching notices.

## Root Cause
The Supabase client wasn't configured with proper headers. While the code was using the Supabase client correctly (not direct REST calls), the client itself needed proper configuration.

## Fixes Applied

### 1. Updated Supabase Client Configuration
**File:** `lib/supabaseClient.js`

Added proper headers and configuration:
```javascript
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
    global: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    },
    db: {
        schema: 'public'
    }
})
```

### 2. Added Error Handling
**File:** `components/NoticeBoard.jsx`

Added proper error handling to catch and log Supabase errors.

## Testing

After these changes:
1. Refresh the homepage
2. Check browser console - 406 errors should be gone
3. Notices should load correctly

## Why This Works

The Supabase JS client automatically adds the required headers:
- `Accept: application/json`
- `apikey: YOUR_KEY`

But we need to explicitly configure the client to ensure these headers are always included.

## If Still Getting 406

Check:
1. `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Restart the dev server: `npm run dev`
3. Clear browser cache
4. Check Supabase dashboard - ensure the `notices` table exists
