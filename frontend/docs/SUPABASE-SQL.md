# Supabase SQL Setup

Run the following in Supabase SQL editor.

## Core tables
- bookings
- contact_messages
- blog_posts
- testimonials
- managed_services
- admin_users
- audit_logs

## Recommended indexes
```sql
create index if not exists idx_blog_posts_slug on blog_posts(slug);
create index if not exists idx_blog_posts_published on blog_posts(published);
create index if not exists idx_managed_services_slug on managed_services(slug);
create index if not exists idx_managed_services_published on managed_services(published);
create index if not exists idx_bookings_status on bookings(status);

##  Enable RLS
alter table bookings enable row level security;
alter table contact_messages enable row level security;
alter table blog_posts enable row level security;
alter table testimonials enable row level security;
alter table managed_services enable row level security;
alter table admin_users enable row level security;
alter table audit_logs enable row level security;


## Public Read Policies

create policy "Public can read published blog posts"
on blog_posts
for select
using (published = true);

create policy "Public can read published testimonials"
on testimonials
for select
using (published = true);

create policy "Public can read published services"
on managed_services
for select
using (published = true);

