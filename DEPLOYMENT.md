# Deployment Guide - Vercel

## Quick Deployment Steps

### Prerequisites
- GitHub account
- Vercel account (free)
- Supabase project set up

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Prepare Your Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### Step 3: Import Project

1. Click "Add New..." → "Project"
2. Find `college-club-management` repository
3. Click "Import"

### Step 4: Configure Project

**Framework Preset**: Create React App (auto-detected)

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

**Root Directory**: `./` (leave as default)

### Step 5: Add Environment Variables

Click "Environment Variables" section and add:

```
REACT_APP_SUPABASE_URL
```
Value: `https://xxxxx.supabase.co` (your Supabase project URL)

```
REACT_APP_SUPABASE_ANON_KEY
```
Value: `eyJxxx...` (your Supabase anon key)

**Important**: Add these for all environments (Production, Preview, Development)

### Step 6: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll see "Congratulations!" when done
4. Click "Visit" to see your live app

### Step 7: Get Your Live URL

Your app will be available at:
```
https://college-club-management-xxxxx.vercel.app
```

Copy this URL for your submission!

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```
Follow the prompts to authenticate

### Step 3: Deploy
```bash
# From project root directory
vercel
```

### Step 4: Add Environment Variables
```bash
vercel env add REACT_APP_SUPABASE_URL
# Paste your Supabase URL when prompted

vercel env add REACT_APP_SUPABASE_ANON_KEY
# Paste your Supabase anon key when prompted
```

### Step 5: Deploy to Production
```bash
vercel --prod
```

---

## Post-Deployment Checklist

### Test Your Live App

1. **Registration**
   - [ ] Can create new account
   - [ ] Receives confirmation (if email verification enabled)
   - [ ] Redirects to dashboard

2. **Login**
   - [ ] Can login with credentials
   - [ ] Shows error for wrong password
   - [ ] Redirects to dashboard

3. **Members**
   - [ ] Can add new members
   - [ ] Members display in table
   - [ ] Search works correctly
   - [ ] Can delete members

4. **Events**
   - [ ] Can create events
   - [ ] Events show in correct section (upcoming/past)
   - [ ] Can mark attendance
   - [ ] Attendance count updates

5. **Dashboard**
   - [ ] Statistics show correct numbers
   - [ ] Updates after adding members/events

6. **Mobile**
   - [ ] Test on phone browser
   - [ ] Navigation works
   - [ ] Forms are usable
   - [ ] Tables scroll horizontally

---

## Updating Your Deployment

### Automatic Deployments (Recommended)

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update feature X"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your app
3. Deploy the new version
4. Update your live URL

### Manual Deployment

```bash
vercel --prod
```

---

## Custom Domain (Optional)

### Add Your Own Domain

1. Go to Vercel Dashboard
2. Select your project
3. Click "Settings" → "Domains"
4. Click "Add"
5. Enter your domain name
6. Follow DNS configuration instructions

---

## Environment Variables Management

### View Environment Variables
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables

### Update Environment Variables
1. Click on variable name
2. Edit value
3. Save
4. Redeploy for changes to take effect

### Add New Environment Variables
1. Click "Add New"
2. Enter key and value
3. Select environments
4. Save

---

## Troubleshooting Deployment

### Build Fails

**Error**: "Module not found"
```bash
# Solution: Make sure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error**: "Environment variable not found"
```bash
# Solution: Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

### App Loads But Features Don't Work

**Issue**: Supabase connection fails
- Check environment variables are set correctly
- Verify Supabase URL and key are correct
- Check browser console for errors

**Issue**: Authentication doesn't work
- Verify Supabase project is active
- Check RLS policies are enabled
- Confirm email settings in Supabase

### Slow Loading

- Check Supabase region (should be close to users)
- Optimize images if any
- Check network tab in browser dev tools

---

## Deployment Best Practices

### Before Deploying
- [ ] Test locally (`npm start`)
- [ ] Check all features work
- [ ] Verify environment variables
- [ ] Commit all changes
- [ ] Update README if needed

### After Deploying
- [ ] Test live URL
- [ ] Check all features work in production
- [ ] Test on mobile device
- [ ] Share URL with team/instructor

### Continuous Deployment
- Push to `main` branch for production
- Use feature branches for development
- Test before merging to main

---

## Monitoring Your App

### Vercel Analytics (Free)

1. Go to your project in Vercel
2. Click "Analytics" tab
3. View:
   - Page views
   - Unique visitors
   - Performance metrics

### Check Logs

1. Vercel Dashboard → Your Project
2. Click "Deployments"
3. Click on a deployment
4. View build logs and runtime logs

---

## Submission Checklist

For your college project submission:

- [ ] GitHub repository URL: `https://github.com/MishalHQ/college-club-management`
- [ ] Live demo URL: `https://your-app.vercel.app`
- [ ] All features working
- [ ] Mobile responsive
- [ ] README.md updated
- [ ] Screenshots/demo video (optional but recommended)

---

## Support

If deployment fails:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally first
4. Check Supabase connection
5. Review error messages carefully

**Common URLs**:
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com
- GitHub Repository: https://github.com/MishalHQ/college-club-management