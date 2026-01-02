# Setup Guide - College Club Management System

## Complete Setup Instructions (Step-by-Step)

### Step 1: Clone the Repository
```bash
git clone https://github.com/MishalHQ/college-club-management.git
cd college-club-management
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Supabase

#### 3.1 Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email

#### 3.2 Create New Project
1. Click "New Project"
2. Enter project name: `club-management`
3. Enter database password (save this!)
4. Select region closest to you
5. Click "Create new project"
6. Wait 2-3 minutes for setup

#### 3.3 Get API Credentials
1. Go to Project Settings (gear icon)
2. Click "API" in sidebar
3. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

#### 3.4 Create Environment File
Create `.env` file in project root:
```bash
REACT_APP_SUPABASE_URL=your_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Set Up Database Tables

1. In Supabase dashboard, click "SQL Editor"
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Members table
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  joining_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  description TEXT,
  venue TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Attendance table
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  marked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(event_id, member_id)
);

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Policies for members
CREATE POLICY "Users can view all members" ON members FOR SELECT USING (true);
CREATE POLICY "Users can insert their own members" ON members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own members" ON members FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own members" ON members FOR DELETE USING (auth.uid() = user_id);

-- Policies for events
CREATE POLICY "Users can view all events" ON events FOR SELECT USING (true);
CREATE POLICY "Users can insert their own events" ON events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own events" ON events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own events" ON events FOR DELETE USING (auth.uid() = user_id);

-- Policies for attendance
CREATE POLICY "Users can view all attendance" ON attendance FOR SELECT USING (true);
CREATE POLICY "Users can mark attendance" ON attendance FOR INSERT WITH CHECK (true);
```

4. Click "Run" button
5. You should see "Success. No rows returned"

### Step 5: Run the Application
```bash
npm start
```

The app will open at `http://localhost:3000`

### Step 6: Test the Application

1. **Register**: Create a new account
2. **Add Members**: Add 2-3 test members
3. **Create Events**: Create 1-2 events
4. **Mark Attendance**: Test attendance marking
5. **Check Dashboard**: Verify statistics update

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub (if not already)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Add Environment Variables:
   - `REACT_APP_SUPABASE_URL` = your_url
   - `REACT_APP_SUPABASE_ANON_KEY` = your_key
7. Click "Deploy"
8. Wait 2-3 minutes
9. Your app is live! 🎉

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables when prompted
# Follow the prompts
```

## Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Make sure `.env` file exists and has correct values

### Issue: "Failed to fetch members/events"
**Solution**: 
1. Check Supabase SQL tables are created
2. Verify RLS policies are enabled
3. Check browser console for errors

### Issue: "Authentication failed"
**Solution**: 
1. Verify Supabase URL and key are correct
2. Check email confirmation (Supabase sends confirmation email)
3. Try with different email

### Issue: Build fails on Vercel
**Solution**:
1. Make sure all dependencies are in `package.json`
2. Check environment variables are set in Vercel
3. Review build logs for specific errors

## Project Structure
```
college-club-management/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Auth.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.js
│   │   │   └── Dashboard.css
│   │   ├── Members/
│   │   │   ├── Members.js
│   │   │   └── Members.css
│   │   ├── Events/
│   │   │   ├── Events.js
│   │   │   └── Events.css
│   │   └── Layout/
│   │       ├── Navbar.js
│   │       └── Navbar.css
│   ├── config/
│   │   └── supabaseClient.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env (create this)
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Supabase documentation
3. Check browser console for errors
4. Verify all environment variables are set correctly