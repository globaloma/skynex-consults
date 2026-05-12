# Deployment Guide

## 1. Supabase
- Create project
- Run SQL from `supabase.sql`
- Create public storage bucket: `uploads`
- Add auth user for admin login
- Add same email to `admin_users`

## 2. Resend
- Create account
- Verify sending domain
- Set `RESEND_API_KEY`
- Set `RESEND_FROM_EMAIL`

## 3. Vercel
- Import repository
- Add environment variables
- Set production domain

## 4. Optional Integrations
- Google Analytics 4
- Cloudflare Turnstile
- Google Calendar API

## 5. Post-deploy checks
- Homepage loads
- Forms submit
- Emails deliver
- Admin login works
- Sitemap works
- Robots works