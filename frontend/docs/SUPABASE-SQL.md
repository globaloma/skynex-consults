# Supabase SQL Setup

Run the following in Supabase SQL editor.

## Core tables
- bookings
- contact_messages
- blog_posts
- testimonials
- managed_services
- packages
- site_settings
- admin_users
- audit_logs

## Packages + Site Settings (admin-editable packages and social links)

```sql
create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  subtitle text not null default '',
  price_label text not null,
  amount integer not null,
  description text not null default '',
  features text[] not null default '{}',
  deliverables text[] not null default '{}',
  popular boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_packages_slug on packages(slug);
create index if not exists idx_packages_published on packages(published);

alter table packages enable row level security;

create policy "Public can read published packages"
on packages
for select
using (published = true);

create table if not exists site_settings (
  id uuid primary key default '00000000-0000-0000-0000-000000000001',
  facebook_url text,
  instagram_url text,
  x_url text,
  tiktok_url text,
  linkedin_url text,
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

create policy "Public can read site settings"
on site_settings
for select
using (true);
```

Admin read/write on `packages` and `site_settings` goes through the service-role key from server actions, same as every other managed table, so no additional write policy is required.

## Contact message archiving

```sql
alter table contact_messages add column if not exists archived boolean not null default false;
create index if not exists idx_contact_messages_archived on contact_messages(archived);
```

## Admin role constraint (optional but recommended)

```sql
alter table admin_users add constraint admin_users_role_check check (role in ('admin', 'viewer')) not valid;
```

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

