# Premium Developer Portfolio

A modern, high-performance, and beautifully designed developer portfolio built with React, Vite, and Supabase. 

Features a fully functional backend and an admin dashboard to manage your projects, images, and content dynamically.

## Features
- 🎨 **Premium Aesthetic**: Editorial-style typography and smooth micro-animations.
- 📱 **Responsive Design**: Looks perfect on desktops, tablets, and mobile devices.
- ⚡ **Vite + React**: Lightning-fast development and optimized production builds.
- 🗄️ **Supabase Backend**: Complete PostgreSQL database, Auth, and Storage integration.
- 🔒 **Admin Dashboard**: Secure `/admin` route to add, edit, and publish your projects.
- 🖼️ **Image Hosting**: Direct upload to Supabase Storage.

## Setup Instructions

If you just cloned this repository, follow these steps to get your portfolio up and running.

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Supabase
This portfolio requires a free [Supabase](https://supabase.com) project to store your project data and images.

1. Go to Supabase and create a new project.
2. Go to **Storage** and create a new bucket named `project-images`.
   - **IMPORTANT:** Make sure to toggle **"Public bucket"** to ON.
3. Go to the **SQL Editor** in Supabase.
4. Copy the entire contents of the `database.sql` file included in this repository.
5. Paste it into the SQL Editor and click **Run**. This will create the necessary tables, policies, and seed data.

### 3. Configure Environment Variables
1. Copy the `.env.example` file and rename it to `.env.local`:
```bash
cp .env.example .env.local
```
2. Open `.env.local` and add your Supabase project keys. You can find these in your Supabase dashboard under **Project Settings > API**.
   - `VITE_SUPABASE_URL`: Your Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Project `anon` / `public` key

### 4. Create Your Admin Account
To manage your portfolio, you need to authorize your account.
1. In your Supabase Dashboard, go to **Authentication > Users**.
2. Click **Add User** and create an account with your email and password.
3. Copy the **User UID** of your new account.
4. Go to the **Table Editor** > **`admins`** table.
5. Click **Insert Row**, paste your User UID into the `id` column, and save.

### 5. Run the Application
Start the development server:
```bash
npm run dev
```
- Your live portfolio will be at `http://localhost:5173/`
- Your admin dashboard will be at `http://localhost:5173/admin/login` (Log in with the account you created in step 4).

## License
MIT License
