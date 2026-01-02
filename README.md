# College Club Management System

A full-stack web application for managing student clubs with authentication, member management, and events system.

## Features

- **User Authentication**: Login, Register, and Logout functionality
- **Member Management**: Add, delete, and search club members
- **Events Management**: Create events, view upcoming/past events, mark attendance
- **Dashboard**: Real-time statistics and overview
- **Responsive Design**: Mobile-friendly UI

## Tech Stack

- **Frontend**: React 18
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Routing**: React Router v6
- **Styling**: Custom CSS

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/MishalHQ/college-club-management.git
cd college-club-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > API
4. Copy your project URL and anon key
5. Create `.env` file in root directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Database Tables

Run these SQL commands in Supabase SQL Editor:

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

### 5. Run the Application
```bash
npm start
```

The app will open at `http://localhost:3000`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
5. Deploy

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Auth.css
│   ├── Dashboard/
│   │   ├── Dashboard.js
│   │   └── Dashboard.css
│   ├── Members/
│   │   ├── Members.js
│   │   └── Members.css
│   ├── Events/
│   │   ├── Events.js
│   │   └── Events.css
│   └── Layout/
│       ├── Navbar.js
│       └── Navbar.css
├── config/
│   └── supabaseClient.js
├── App.js
├── App.css
└── index.js
```

## Features Checklist

- ✅ User Registration with validation
- ✅ User Login with error handling
- ✅ Protected routes (Dashboard, Members, Events)
- ✅ Add new members with form validation
- ✅ Display members in responsive table
- ✅ Delete members with confirmation
- ✅ Search members by name/department
- ✅ Create events with date/time picker
- ✅ View upcoming and past events
- ✅ Mark event attendance
- ✅ Dashboard with real-time statistics
- ✅ Mobile-responsive design
- ✅ Loading states and error messages
- ✅ Data persistence with Supabase

## License

MIT License