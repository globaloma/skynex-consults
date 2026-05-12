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
- Edit services
- Add testimonials

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

## Recommended future enhancements
- Multi-admin role hierarchy
- Advanced reporting dashboard
- Booking availability calendar
- Multilingual support
- CRM integration