# Handover Guide

## Access required
- Vercel project
- Supabase project
- Resend account
- Domain registrar / DNS provider
- Google Analytics
- Cloudflare Turnstile
- Google Cloud (if calendar integration enabled)

## Ongoing admin tasks
- Log into `/admin/login`
- Manage bookings
- Review contact messages
- Publish new blog posts
- Edit services (shown on the website exactly as entered — no code changes needed)
- Edit packages and prices
- Add testimonials
- Update social media links (Facebook, Instagram, X, TikTok, LinkedIn) under Site Settings — an icon only appears on the site once its link is filled in
- Search and paginate bookings and contact messages
- Archive contact messages once handled, and reply directly by email from the dashboard
- Manage who has dashboard access under Team — Admins can create/edit everything, Viewers can look but not touch anything

## Routine maintenance
- Keep env vars secure
- Rotate admin credentials periodically
- Review audit logs
- Update dependencies
- Monitor email delivery reputation
- Review analytics monthly

## Content updates
- Contact details live in `src/lib/constants.ts`
- Dynamic content lives in Supabase admin CMS
- Logo and static assets live in `/public`

## First-time setup after this update
Run all the SQL in `docs/SUPABASE-SQL.md` (Packages + Site Settings, contact message
archiving, and the admin role constraint) in the Supabase SQL editor, then run
`npm run seed:content` once. This creates the new `packages` and `site_settings`
tables, adds the `archived` column to `contact_messages`, and copies the existing
services, testimonials, packages, and social links out of the codebase and into the
database, so the admin dashboard becomes the single source of truth for all of them.

## Recommended future enhancements
- Booking availability calendar
- Multilingual support
- CRM integration