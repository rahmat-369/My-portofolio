# 🚀 R_HMT PORTFOLIO - COMPLETE COMMAND REFERENCE

## 📋 TABLE OF CONTENTS
1. [Setup & Installation](#setup--installation)
2. [Development Testing](#development-testing)
3. [Build & Production](#build--production)
4. [Deployment Options](#deployment-options)
5. [Troubleshooting](#troubleshooting)
6. [Quick Commands Cheatsheet](#quick-commands-cheatsheet)

---

## ✅ Setup & Installation

### One-Line Setup (Termux)
```bash
curl -fsSL https://raw.githubusercontent.com/termux/termux-app/master/termux-boot && bash TERMUX_QUICK_SETUP.sh
```

### Manual Setup - Desktop/Laptop
```bash
# Navigate ke project
cd Portofolio-Updated

# Install dependencies
npm install

# Atau jika ada peer dependency issues:
npm install --legacy-peer-deps

# Verify installation
npm list --depth=0
```

### Manual Setup - Termux (Android)
```bash
# Update packages
pkg update && pkg upgrade -y

# Install Node.js & Git
pkg install nodejs git -y

# Create project directory
mkdir -p ~/projects && cd ~/projects

# Extract or copy project
# Option 1: Dari zip
unzip Portofolio-Updated.zip && cd Portofolio-Updated

# Option 2: Copy dari storage
# cp -r /storage/emulated/0/Download/Portofolio-Updated ~/projects/

# Install npm packages
npm install --legacy-peer-deps

# Verify
node --version && npm --version
```

---

## 🧪 Development Testing

### Start Local Dev Server - Desktop
```bash
npm run dev
# Akses: http://localhost:5173
```

### Start Local Dev Server - Termux (Android)
```bash
npm run dev -- --host 0.0.0.0 --port 5173
# Akses: http://localhost:5173
# Dari device lain: http://<ip-android>:5173
```

### Find Android IP Address (Termux)
```bash
# Method 1: ifconfig
ifconfig | grep "inet addr"

# Method 2: ip command
ip addr show
```

### Testing Specific Features

#### Test Splash Screen
```bash
npm run dev
# Refresh page - lihat splash screen 1.5 detik
# Check browser console untuk errors
```

#### Test Hero Section Animations
```bash
npm run dev
# Lihat:
# ✓ Typing animation "hi, im"
# ✓ Nama "R_HMT" appear
# ✓ Role text rotate setiap 2 detik
# ✓ Mouse tilt 3D effect
```

#### Test Journey Auto-Reveal
```bash
npm run dev
# Scroll ke "THE JOURNEY" section
# Lihat items muncul otomatis saat scroll
```

#### Test Responsive Design
```bash
# Buka DevTools (F12)
# Toggle device toolbar (Ctrl+Shift+M)
# Test di:
# - Mobile (375px)
# - Tablet (768px)
# - Desktop (1920px)
```

### Browser Testing
```bash
# Chrome/Edge
npm run dev
# Buka: http://localhost:5173

# Firefox
# Same URL

# Safari (Mac)
# Same URL

# Android Browser via Termux
npm run dev -- --host 0.0.0.0
# Dari Android browser: http://<ip>:5173
```

### Performance Monitoring
```bash
npm run dev

# Buka DevTools:
# 1. Performance tab
# 2. Memory tab
# 3. Network tab (throttle to "Slow 3G")
# 4. Lighthouse (di Chrome)
```

### Type Checking
```bash
# Check TypeScript errors
npx tsc --noEmit

# Build type definitions
npx tsc
```

### Linting
```bash
# Check code quality
npm run lint

# Fix lint issues
npx eslint . --fix
```

---

## 🏗️ Build & Production

### Build untuk Production
```bash
# Buat optimized build
npm run build

# Output: dist/
# File size: ~500KB (gzipped)
```

### Verify Build Output
```bash
# Check dist folder
ls -lah dist/

# Preview build locally
npm run preview

# Akses: http://localhost:4173
```

### Build with Source Maps (Debug)
```bash
npm run build -- --sourcemap

# Untuk production, jangan gunakan sourcemap
```

### Analyze Bundle Size
```bash
# Install analyzer
npm install -D rollup-plugin-visualizer

# Rebuild and analyze
npm run build

# Buka dist/stats.html
```

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended ⭐)

#### Setup & Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Choose framework: Vite
# - Build command: npm run build
# - Output directory: dist
# - Install dependencies: Yes

# Production deploy
vercel --prod
```

#### Link Existing Project
```bash
vercel link
vercel --prod
```

#### Environment Variables (Vercel)
```bash
# Buka vercel.com > Project Settings > Environment Variables
# Tambahkan:
# VITE_GEMINI_API_KEY=your_key_here
```

---

### Option 2: Netlify

#### Via CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build terlebih dahulu
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Follow prompts untuk setup
```

#### Via Drag & Drop
```bash
# Build project
npm run build

# Buka: https://app.netlify.com
# Drag & drop 'dist' folder
```

#### Setup Continuous Deployment
```bash
# Push ke Git (GitHub, GitLab, Bitbucket)
git push origin main

# Netlify auto-deploys setiap push
```

---

### Option 3: Railway

#### Setup
```bash
# Create railway.json
cat > railway.json << 'EOF'
{
  "buildCommand": "npm run build",
  "startCommand": "npx serve -s dist -l 3000"
}
EOF

# Push ke Railway
# Docs: https://docs.railway.app
```

---

### Option 4: GitHub Pages

#### Setup
```bash
# Buat branch baru
git checkout -b production

# Build
npm run build

# Copy dist ke docs folder
cp -r dist/* docs/

# Commit & push
git add . && git commit -m "Deploy to production"
git push origin production

# GitHub Settings > Pages > Select 'docs' folder
```

---

### Option 5: Self-Hosted (VPS)

#### Build & Deploy
```bash
# Build locally
npm run build

# Upload dist/ ke server
scp -r dist/* user@server:/var/www/portfolio/

# SSH ke server
ssh user@server

# Setup Nginx (example)
sudo nano /etc/nginx/sites-available/portfolio
# Paste konfigurasi:
# root /var/www/portfolio;
# index index.html;

# Reload Nginx
sudo systemctl reload nginx
```

#### Docker (Optional)
```bash
# Buat Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Build image
docker build -t r-hmt-portfolio .

# Run container
docker run -p 80:80 r-hmt-portfolio
```

---

## 🧹 Troubleshooting

### Port 5173 Already in Use
```bash
# Use different port
npm run dev -- --port 3000

# Or kill process using port
# Mac/Linux:
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### npm install Issues

#### Legacy Peer Deps
```bash
npm install --legacy-peer-deps

# Or globally:
npm config set legacy-peer-deps true
```

#### Clear npm Cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Node Version Issues
```bash
# Check version
node --version  # Should be 16+

# Update Node (via nvm)
nvm install 18
nvm use 18
```

### Build Errors

#### TypeScript Errors
```bash
# Check errors
npx tsc --noEmit

# Fix if possible
npx tsc --noEmit --pretty false
```

#### Import Errors
```bash
# Ensure correct import paths
# Wrong: import Component from 'src/components/X'
# Right: import Component from './components/X'

# Or use aliases in tsconfig.json
```

### Gemini API Issues

#### API Key Not Working
```bash
# Check env var
echo $VITE_GEMINI_API_KEY

# Test API
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

#### Rate Limiting
```bash
# Add retry logic in code
# Wait before making next request
# Check API quotas at: https://console.cloud.google.com
```

---

## ⚡ Quick Commands Cheatsheet

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on localhost:5173 |
| `npm run dev -- --port 3000` | Dev server on custom port |
| `npm run dev -- --host 0.0.0.0` | Dev server accessible from network |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npx tsc --noEmit` | Type check without building |
| `npm list --depth=0` | Show installed dependencies |
| `npm outdated` | Check outdated packages |
| `npm update` | Update all packages |
| `npm cache clean --force` | Clear npm cache |
| `rm -rf node_modules && npm install` | Clean reinstall |

---

## 📊 Pre-Deployment Checklist

```bash
# 1. Code quality
npm run lint
npx tsc --noEmit

# 2. Build test
npm run build

# 3. Bundle analysis
npm run build -- --sourcemap=false

# 4. Production preview
npm run preview

# 5. Performance test
# Open DevTools > Lighthouse > Run audit

# 6. Final checks:
# ✓ All animations smooth
# ✓ Images load correctly  
# ✓ No console errors
# ✓ Responsive on mobile
# ✓ All links working
# ✓ API endpoints responding
```

---

## 🎯 Testing Timeline

- **Local Dev**: 2-3 hari
- **Build & Optimization**: 1 hari
- **Final Testing**: 1-2 hari  
- **Deployment**: 1-2 jam
- **Post-Deployment Monitoring**: Ongoing

---

**Last Updated**: June 2026
**Status**: ✅ PRODUCTION READY
