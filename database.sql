-- PORTFOLIO SUPABASE SCHEMA & POLICIES
-- Run this entire script in your Supabase SQL Editor to set up the database.

-- 0. Safely drop existing tables if they exist (Reset)
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;

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

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 4. Projects Policies
-- Public can view published projects
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (published = true);

-- Admins have full access to projects
CREATE POLICY "Admins have full access to projects"
  ON public.projects FOR ALL
  USING (
    auth.uid() IN (SELECT id FROM public.admins)
  );

-- 5. Admins Table Policies
-- Allow anyone to read the admins table so the check works
CREATE POLICY "Allow reading admins" ON public.admins FOR SELECT USING (true);

-- 6. Insert Seed Data
INSERT INTO public.projects (title, slug, short_description, status, sort_order, published, featured, technologies)
VALUES 
  ('SDCET Connect', 'sdcet-connect', 'Placeholder description for SDCET Connect', 'completed', 1, true, true, ARRAY['React', 'Node.js']),
  ('ShineLink', 'shinelink', 'Placeholder description for ShineLink', 'completed', 2, true, true, ARRAY['React', 'Firebase']),
  ('Streetbite', 'streetbite', 'Placeholder description for Streetbite', 'in-development', 3, true, true, ARRAY['Next.js']),
  ('Friday AI', 'friday-ai', 'Placeholder description for Friday AI', 'research', 4, true, false, ARRAY['Python', 'AI']);

-- 7. Fix default permissions (In case they were dropped)
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;

-- 8. Storage Policies (For the project-images bucket)
-- IMPORTANT: Make sure to create a PUBLIC bucket named "project-images" first!

-- Public can read images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Admins can insert/update/delete images
CREATE POLICY "Admin Insert Access"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' AND 
  auth.uid() IN (SELECT id FROM public.admins)
);

CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-images' AND 
  auth.uid() IN (SELECT id FROM public.admins)
);

CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-images' AND 
  auth.uid() IN (SELECT id FROM public.admins)
);
