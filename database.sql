-- PORTFOLIO SUPABASE SCHEMA & POLICIES
-- Run this entire script in your Supabase SQL Editor to set up the database.

-- 0. Safely drop existing tables if they exist (Reset)
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;
DROP TABLE IF EXISTS public.profile CASCADE;
DROP TABLE IF EXISTS public.resume CASCADE;
DROP TABLE IF EXISTS public.domains CASCADE;

-- 1. Create the projects table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_description text,
  long_description text,
  category text,
  status text DEFAULT 'in-development',
  technologies text[] DEFAULT '{}',
  cover_image_url text,
  image_urls text[] DEFAULT '{}',
  github_url text,
  live_url text,
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the admins table (linked to auth.users)
CREATE TABLE public.admins (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the profile table
CREATE TABLE public.profile (
  id integer PRIMARY KEY DEFAULT 1,
  full_name text DEFAULT 'Your Name',
  first_name text DEFAULT 'Your',
  last_name text DEFAULT 'Name',
  email text DEFAULT 'hello@example.com',
  bio jsonb DEFAULT '{"paragraphs": []}'::jsonb,
  socials jsonb DEFAULT '{"github": "", "linkedin": "", "twitter": ""}'::jsonb,
  experience jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_row CHECK (id = 1)
);

-- 4. Create the resume table
CREATE TABLE public.resume (
  id integer PRIMARY KEY DEFAULT 1,
  content text DEFAULT '',
  profile_image_url text DEFAULT '',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_row CHECK (id = 1)
);

-- 5. Create the domains table
CREATE TABLE public.domains (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  url text,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;

-- 7. Define Policies

-- Admins Table
CREATE POLICY "Allow reading admins" ON public.admins FOR SELECT USING (true);

-- Projects Table
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Admins have full access to projects" ON public.projects FOR ALL 
USING (auth.uid() IN (SELECT id FROM public.admins))
WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

-- Profile Table
CREATE POLICY "Public can view profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Admins have full access to profile" ON public.profile FOR ALL 
USING (auth.uid() IN (SELECT id FROM public.admins))
WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

-- Resume Table
CREATE POLICY "Public can view resume" ON public.resume FOR SELECT USING (true);
CREATE POLICY "Admins have full access to resume" ON public.resume FOR ALL 
USING (auth.uid() IN (SELECT id FROM public.admins))
WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

-- Domains Table
CREATE POLICY "Public can view domains" ON public.domains FOR SELECT USING (true);
CREATE POLICY "Admins have full access to domains" ON public.domains FOR ALL 
USING (auth.uid() IN (SELECT id FROM public.admins))
WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));


-- 8. Insert Seed Data
INSERT INTO public.profile (id) VALUES (1) ON CONFLICT DO NOTHING;
INSERT INTO public.resume (id) VALUES (1) ON CONFLICT DO NOTHING;


-- 9. Setup Auth Trigger (Auto-adds new signups to the admins table)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.admins (id) VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Fallback: Manually add existing auth users to admins table if they already exist
INSERT INTO public.admins (id)
SELECT id FROM auth.users
ON CONFLICT DO NOTHING;

-- 10. Fix default permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;

-- 11. Storage Policies
-- IMPORTANT: Make sure to create PUBLIC buckets named "project-images" and "portfolio-images" first!

-- Public can read images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images' OR bucket_id = 'portfolio-images');

-- Admins can insert/update/delete images
CREATE POLICY "Admin Insert Access"
ON storage.objects FOR INSERT
WITH CHECK (
  (bucket_id = 'project-images' OR bucket_id = 'portfolio-images') AND 
  auth.uid() IN (SELECT id FROM public.admins)
);

CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
USING (
  (bucket_id = 'project-images' OR bucket_id = 'portfolio-images') AND 
  auth.uid() IN (SELECT id FROM public.admins)
);

CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
USING (
  (bucket_id = 'project-images' OR bucket_id = 'portfolio-images') AND 
  auth.uid() IN (SELECT id FROM public.admins)
);
