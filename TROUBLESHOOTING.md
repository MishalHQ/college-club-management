# Troubleshooting Guide

## White Screen / Blank Page Issue

### Problem
When you run `npm start`, you see a white/blank screen.

### Solution

#### Step 1: Check Browser Console
1. Open browser (Chrome/Firefox)
2. Press `F12` or right-click → Inspect
3. Go to "Console" tab
4. Look for error messages

#### Step 2: Check Environment Variables

**The most common cause is missing `.env` file!**

1. **Check if `.env` file exists** in project root:
```
college-club-management/
├── .env          ← This file must exist!
├── package.json
├── src/
└── public/
```

2. **Create `.env` file** if missing:
```bash
# In project root directory
touch .env
```

3. **Add Supabase credentials** to `.env`:
```env
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJxxx...your_key_here
```

4. **Restart the server**:
```bash
# Stop the server (Ctrl+C)
# Start again
npm start
```

#### Step 3: Verify Supabase Setup

1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Go to Settings → API
4. Copy:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon public key** (long string starting with `eyJ`)

#### Step 4: Check .env Format

**Correct format:**
```env
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Common mistakes:**
```env
# ❌ WRONG - No quotes needed
REACT_APP_SUPABASE_URL="https://xxxxx.supabase.co"

# ❌ WRONG - No spaces around =
REACT_APP_SUPABASE_URL = https://xxxxx.supabase.co

# ❌ WRONG - Wrong variable name
SUPABASE_URL=https://xxxxx.supabase.co

# ✅ CORRECT
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
```

---

## Other Common Issues

### Issue: "Module not found" Error

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: Port 3000 Already in Use

**Solution:**
```bash
# Kill the process on port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use a different port:
PORT=3001 npm start
```

### Issue: "Failed to compile" Error

**Check:**
1. All files are saved
2. No syntax errors in code
3. All imports are correct
4. Run `npm install` again

### Issue: Supabase Connection Error

**Solution:**
1. Check internet connection
2. Verify Supabase project is active
3. Check URL and key are correct
4. Try creating a new Supabase project

### Issue: Database Tables Not Found

**Solution:**
1. Go to Supabase SQL Editor
2. Run the SQL setup script from `SETUP_GUIDE.md`
3. Verify tables exist in Table Editor
4. Check RLS policies are enabled

---

## Quick Diagnostic Checklist

Run through this checklist:

- [ ] `.env` file exists in project root
- [ ] `.env` has both `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`
- [ ] No quotes around values in `.env`
- [ ] Supabase project is created and active
- [ ] Database tables are created (run SQL script)
- [ ] `node_modules` folder exists (run `npm install`)
- [ ] Server restarted after creating `.env`
- [ ] Browser console shows no errors
- [ ] Internet connection is working

---

## Step-by-Step Fix for White Screen

### Complete Reset (If nothing else works)

```bash
# 1. Stop the server
Ctrl+C

# 2. Clean install
rm -rf node_modules package-lock.json
npm install

# 3. Verify .env file exists and has correct format
cat .env
# Should show:
# REACT_APP_SUPABASE_URL=https://...
# REACT_APP_SUPABASE_ANON_KEY=eyJ...

# 4. If .env is missing, create it:
echo "REACT_APP_SUPABASE_URL=your_url" > .env
echo "REACT_APP_SUPABASE_ANON_KEY=your_key" >> .env

# 5. Start fresh
npm start
```

---

## Getting Help

### Check Browser Console
1. Press F12
2. Look for red error messages
3. Share the error message for help

### Check Terminal Output
Look for error messages when running `npm start`

### Verify Setup
```bash
# Check if .env exists
ls -la | grep .env

# Check .env content (without showing sensitive data)
cat .env | sed 's/=.*/=***/'
```

---

## Expected Behavior

### When Properly Configured:
1. Run `npm start`
2. Browser opens to `http://localhost:3000`
3. You see the **Login page** with purple gradient background
4. No errors in browser console
5. No errors in terminal

### If Not Configured:
1. Run `npm start`
2. Browser opens to `http://localhost:3000`
3. You see a **Configuration Required** screen with instructions
4. Console shows warning about missing env variables

---

## Still Having Issues?

### Collect This Information:
1. Error message from browser console
2. Error message from terminal
3. Output of `cat .env` (hide sensitive values)
4. Node version: `node --version`
5. npm version: `npm --version`

### Quick Test:
```bash
# Test if environment variables are loaded
npm start

# In another terminal:
echo $REACT_APP_SUPABASE_URL
# Should show your URL
```

---

## Prevention

### Always Remember:
1. **Create `.env` file BEFORE running `npm start`**
2. **Restart server after creating/editing `.env`**
3. **Never commit `.env` to Git** (it's in `.gitignore`)
4. **Use `.env.example` as template**

### Template:
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
# Then edit .env with your actual credentials
```