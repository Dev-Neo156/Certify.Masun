# Supabase Setup Guide for Masun Certify

This guide explains how to set up and manage the Supabase backend for the simplified Masun Technology Certificate Verification Platform. Since this application acts purely as a public verification portal, all certificate creation and management happens directly within the Supabase dashboard or via an external service.

## 1. Project Configuration

Your project is already configured! The `.env.local` file has been automatically updated with your provided project URL and API key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gipkrhtrdarjugtemboy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Z9uFHIZ_hq9EVQZmg5akEg_aBwP0LnW
```

> ⚠️ Never commit `.env.local` to version control. It's already in `.gitignore`.

## 2. Run the Database Migration

To ensure your Supabase database has the correct table structure for this app:

1. In your [Supabase dashboard](https://supabase.com/dashboard), open your project (`gipkrhtrdarjugtemboy`).
2. Go to the **SQL Editor** on the left sidebar.
3. Click **"New Query"**.
4. Copy and paste the entire contents of `supabase-setup.sql` (found in the root of this project).
5. Click **"Run"**.
6. You should see "Success. No rows returned." — this means the `certificates` table and policies were created.

## 3. Managing Certificates (Manual Entry)

Since the frontend admin panel was removed to simplify the architecture, you can issue new certificates directly through Supabase:

1. Go to the **Table Editor** in the Supabase dashboard.
2. Select the `certificates` table.
3. Click **"Insert row"**.
4. Fill in the details:
   - `certificate_id`: Must be a unique string (e.g., `MASUN-2026-0001`).
   - `intern_name`: The name of the certificate holder.
   - `domain`: The internship domain (e.g., "Web Development").
   - `start_date` & `end_date`: Format as `YYYY-MM-DD`.
   - `status`: Leave as `active` (or set to `revoked` to invalidate it).
5. Click **"Save"**. 

The certificate is now instantly verifiable on the live website!

## 4. Environment Variables for Production

When deploying your Next.js application to Vercel or another host, you must add these exact same environment variables in your hosting dashboard's settings:

- `NEXT_PUBLIC_SUPABASE_URL=https://gipkrhtrdarjugtemboy.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Z9uFHIZ_hq9EVQZmg5akEg_aBwP0LnW`

## Database Schema Reference

| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Auto-generated primary key |
| `certificate_id` | TEXT (unique) | Human-readable ID like `MASUN-2026-0001` |
| `intern_name` | TEXT | Full name of the intern |
| `intern_email` | TEXT | Email address (optional) |
| `domain` | TEXT | Internship role/domain |
| `start_date` | DATE | Internship start date |
| `end_date` | DATE | Internship end date |
| `issue_date` | DATE | Certificate issue date |
| `status` | TEXT | `active` or `revoked` |
| `created_at` | TIMESTAMPTZ | Auto-generated timestamp |
