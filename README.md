# Premium Developer Portfolio

A modern, high-performance, and beautifully designed developer portfolio built with React, Vite, and Supabase. 

Features a fully functional backend and an admin dashboard to manage your profile, resume, projects, and images dynamically without touching the code.

## Features
- 🎨 **Premium Aesthetic**: Editorial-style typography and smooth micro-animations.
- 📱 **Responsive Design**: Looks perfect on desktops, tablets, and mobile devices.
- ⚡ **Vite + React**: Lightning-fast development and optimized production builds.
- 🗄️ **Supabase Backend**: Complete PostgreSQL database, Auth, and Storage integration.
- 🔒 **Admin Dashboard**: Secure `/admin` route to add, edit, and publish your projects and profile.
- 🖼️ **Image Hosting**: Direct upload to Supabase Storage.

## 🎯 Who is this for?
- **Engineering & CS Students:** Stand out to recruiters with a professional, database-driven portfolio instead of a basic static site.
- **Software Engineers & Developers:** Showcase your full-stack capabilities with a dynamic template that proves you know React, databases, and auth.
- **Freelancers & Tech Enthusiasts:** Manage your projects effortlessly through an admin dashboard without ever touching the code again.

## Screenshots
### Editorial Theme
![Editorial Theme](public/images/Editorial_theme.png)

### Terminal Theme
![Terminal Theme](public/images/terminal_theme.png)

### Admin Dashboard
![Admin Dashboard](public/images/admin_page.png)

## 🚀 Complete Setup Guide

Follow these steps carefully to get your full-stack portfolio up and running.

### 1. Install Dependencies
Clone the repository and install the required npm packages:
```bash
npm install
```

### 2. Set up Supabase (Your Backend & Database)
This portfolio requires a free [Supabase](https://supabase.com) project to store your data and images.

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. **Create Storage Buckets (CRITICAL):**
   - In your Supabase dashboard, go to **Storage** on the left menu.
   - Click **New Bucket**.
   - Name it exactly: `project-images`
   - **Important:** Toggle the **"Public bucket"** switch to **ON**.
   - Click Save.
   - Repeat the exact same process to create a second bucket named: `portfolio-images` (also make it Public).
3. **Setup Database Tables & Security:**
   - Go to the **SQL Editor** in your Supabase dashboard.
   - Open the `database.sql` file located in your project's root folder and copy all of its contents.
   - Paste the code into the Supabase SQL Editor and click **Run**.
   - *Note: This script automatically sets up all your tables, Row Level Security (RLS) policies, and a trigger that automatically makes the first person who signs up an Admin!*

### 3. Configure Environment Variables
Connect your local code to your new Supabase backend:
1. Copy the `.env.example` file and rename it to `.env.local`:
```bash
cp .env.example .env.local
```
2. Open `.env.local` and add your Supabase project keys. You can find these in your Supabase dashboard under **Project Settings (gear icon) > API**.
   - `VITE_SUPABASE_URL`: Your Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Project `anon` / `public` key

### 4. Set Your Navbar Logo (Offline Config)
To change the "AK" initials in the top-left of the navbar to your own:
- **Windows:** Double-click the `set_logo.bat` file in your project folder. It will ask you for your initials and automatically apply them.
- **Mac/Linux:** You can manually edit the text inside `src/config/logo.json`.

### 5. Run the Application & Create Your Admin Account
Start the development server:
```bash
npm run dev
```
1. Go to `http://localhost:5173/admin/login` in your browser.
2. You will see the login screen. Since this is your first time, you need to create an account.
3. Go back to your Supabase Dashboard -> **Authentication** -> **Users** -> **Add User** -> **Create New User**.
4. Enter your email and a secure password.
5. *(Thanks to the SQL script you ran earlier, this new user is automatically granted Admin privileges).*
6. Go back to `http://localhost:5173/admin/login` and log in with those credentials!

### 6. Customize Your Portfolio
Once logged into the Admin Dashboard, navigate to:
- **Profile:** Fill out your Name, Bio, Social Links, Skills, and Experience.
- **Resume:** Paste your markdown resume and upload your profile photo.
- **Projects:** Add all your cool projects, upload cover images, and set them to "Published".

Your live portfolio will instantly update at `http://localhost:5173/`!

## License
MIT License

## Tags
#Portfolio #React #Supabase #Vite #EngineeringStudent #SoftwareEngineer #FullStack #WebDevelopment #OpenSource #DeveloperPortfolio #AdminDashboard
