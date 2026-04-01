# 🚀 Jedid's Portfolio — Complete Setup Guide
### From Zero to Live Website, Step by Step

---

## 📁 YOUR PROJECT STRUCTURE

```
jet-portfolio/               ← Main folder (your project root)
├── index.html               ← Homepage
├── style.css                ← All styles
├── script.js                ← JavaScript + contact form
├── .gitignore               ← Files Git should ignore
├── .github/
│   └── workflows/
│       └── deploy.yml       ← GitHub Actions CI/CD pipeline
└── backend/                 ← Node.js backend
    ├── server.js            ← Express API server
    ├── package.json         ← Dependencies list
    └── .env.example         ← Template for environment variables
```

---

## STEP 1: SET UP YOUR FOLDERS

Open **PowerShell** (search it in Start Menu). Type these commands:

```powershell
# Go to your Desktop
cd Desktop

# Create main project folder
mkdir jet-portfolio
cd jet-portfolio

# Create backend folder inside it
mkdir backend
```

Now open **VS Code** in this folder:
```powershell
code .
```

Copy the files you downloaded into the right places:
- `index.html`, `style.css`, `script.js`, `.gitignore`, `.github/` → into `jet-portfolio/`
- `server.js`, `package.json`, `.env.example` → into `jet-portfolio/backend/`

---

## STEP 2: INSTALL GIT

1. Go to: **https://git-scm.com/download/win**
2. Download and install Git (click Next → Next → Finish, all defaults are fine)
3. Open a **new** PowerShell window and verify:

```powershell
git --version
# Should show: git version 2.x.x
```

### Configure Git (do this once):
```powershell
git config --global user.name "Jedid Emmanuel Thomas"
git config --global user.email "your-email@gmail.com"

# Verify
git config --global --list
```

---

## STEP 3: INSTALL NODE.JS

1. Go to: **https://nodejs.org**
2. Download the **LTS** version (the green button)
3. Install it (all defaults, click Next → Next → Finish)
4. Open a **new** PowerShell and verify:

```powershell
node --version    # Should show: v20.x.x
npm --version     # Should show: 10.x.x
```

---

## STEP 4: INSTALL BACKEND DEPENDENCIES

```powershell
# Make sure you are in the jet-portfolio folder
cd Desktop\jet-portfolio\backend

# Install all packages listed in package.json
npm install

# You should see a node_modules folder appear
```

---

## STEP 5: CREATE GITHUB REPO & PUSH CODE

### 5a. Create a GitHub account
Go to **https://github.com** and sign up (free). Your username is important — it becomes your website URL.

### 5b. Create a new repository
1. Click the **+** button (top right) → **New repository**
2. Name it: `jet-portfolio` (exactly this)
3. Keep it **Public**
4. Do NOT add README (we already have files)
5. Click **Create repository**

### 5c. Initialize Git and push

In PowerShell (inside `jet-portfolio` folder):

```powershell
# Go back to project root
cd Desktop\jet-portfolio

# Initialize git repo
git init

# Stage all files
git add .

# First commit
git commit -m "Initial commit: portfolio website with backend"

# Connect to GitHub (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/jet-portfolio.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**GitHub will ask for your username and password.** 
For the password, use a **Personal Access Token** (not your GitHub password):
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Check "repo" scope → Copy the token
3. Paste it as your password when prompted

---

## STEP 6: ENABLE GITHUB PAGES

1. On GitHub, open your `jet-portfolio` repository
2. Click **Settings** (top bar of the repo)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

Your GitHub Actions pipeline will automatically deploy the site. Visit:
```
https://YOUR-USERNAME.github.io/jet-portfolio
```

Wait 2-3 minutes after your first push for the pipeline to run!

---

## STEP 7: SET UP BACKEND ON RENDER.COM

### 7a. Create Render account
Go to **https://render.com** → Sign up with GitHub (click "Continue with GitHub")

### 7b. Create PostgreSQL Database
1. Dashboard → **New +** → **PostgreSQL**
2. Name: `jet-portfolio-db`
3. Region: **Singapore** (closest to India)
4. Plan: **Free**
5. Click **Create Database**
6. Wait for it to say **Available** (takes ~1 min)
7. Copy the **Internal Database URL** — you'll need it shortly

### 7c. Deploy the Backend
1. Dashboard → **New +** → **Web Service**
2. Connect your **GitHub** account
3. Select your `jet-portfolio` repository
4. Fill in the form:
   - **Name**: `jet-portfolio-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. Scroll down to **Environment Variables** → Add:
   - Key: `DATABASE_URL` → Value: *(paste the database URL you copied)*
   - Key: `NODE_ENV` → Value: `production`
6. Click **Create Web Service**

Wait ~3-5 minutes. Your backend URL will be:
```
https://jet-portfolio-api.onrender.com
```

Test it by visiting that URL in your browser — you should see the API status JSON!

---

## STEP 8: CONNECT FRONTEND TO BACKEND

1. Open `script.js` in VS Code
2. Find this line near the top:
   ```javascript
   const BACKEND_URL = 'https://YOUR-BACKEND-NAME.onrender.com/api/contact';
   ```
3. Replace `YOUR-BACKEND-NAME` with your actual Render service name:
   ```javascript
   const BACKEND_URL = 'https://jet-portfolio-api.onrender.com/api/contact';
   ```

4. Also open `backend/server.js` and update the CORS origin:
   ```javascript
   origin: ['https://YOUR-USERNAME.github.io'],
   ```
   Replace `YOUR-USERNAME` with your actual GitHub username.

5. Save both files and push:
   ```powershell
   git add .
   git commit -m "Connect frontend to Render backend"
   git push
   ```

GitHub Actions will automatically redeploy. Wait 2-3 minutes and test the contact form!

---

## STEP 9: TEST EVERYTHING ✅

| Test | Where | Expected Result |
|------|-------|----------------|
| Frontend loads | `https://YOUR-USERNAME.github.io/jet-portfolio` | Website shows up |
| Backend health | `https://jet-portfolio-api.onrender.com` | JSON status message |
| View messages | `https://jet-portfolio-api.onrender.com/api/messages` | JSON list |
| Contact form | Fill form on website and submit | "Message sent!" confirmation |
| GitHub Actions | Repo → Actions tab | Green checkmark ✅ |

---

## 🔄 EVERYDAY WORKFLOW (After Setup)

Every time you make changes:

```powershell
# 1. Make your changes in VS Code
# 2. Save the files

# 3. Stage changes
git add .

# 4. Commit with a description
git commit -m "Add new project card"

# 5. Push to GitHub
git push
```

GitHub Actions automatically runs tests and redeploys your site! 🚀

---

## ⚠️ IMPORTANT REMINDERS

- **NEVER** put passwords or secret keys in `index.html`, `style.css`, or `script.js`
- **NEVER** commit `.env` to GitHub (it's in `.gitignore` for safety)
- Render free tier **sleeps after 15 minutes** of no traffic — first request may take ~30 seconds to wake up. That's normal!
- GitHub Pages takes 2-5 minutes to update after each push

---

## 🆘 COMMON ERRORS & FIXES

| Error | Fix |
|-------|-----|
| `git: command not found` | Restart PowerShell after installing Git |
| `npm: command not found` | Restart PowerShell after installing Node.js |
| `git push` asks for password | Use a Personal Access Token (see Step 5c) |
| Contact form says "not connected" | Update the `BACKEND_URL` in script.js |
| GitHub Actions fails | Check the Actions tab → click the failed job to see the error |
| Backend URL shows no response | Render may be sleeping — wait 30 seconds and try again |

---

## 📞 Need Help?
- Git docs: https://git-scm.com/docs
- GitHub Pages: https://docs.github.com/en/pages
- Render docs: https://render.com/docs
- Express.js: https://expressjs.com
