#!/bin/bash
# 🚀 R_HMT PORTFOLIO - TERMUX QUICK SETUP
# Copy & paste semua ini di Termux sekaligus

# Colors untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         🚀 R_HMT PORTFOLIO - TERMUX SETUP v1.0            ║"
echo "║                                                            ║"
echo "║  Automatically setup project & dependencies in Termux     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Function untuk print status
status() {
    echo -e "${GREEN}✓${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
    exit 1
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# STEP 1: Update & Install Dependencies
echo -e "\n${CYAN}[1/5]${NC} Updating & Installing Core Dependencies..."
pkg update -y || error "Failed to update packages"
pkg upgrade -y || error "Failed to upgrade packages"
pkg install nodejs git -y || error "Failed to install Node.js & Git"

status "Core dependencies installed"
echo "  Node: $(node --version)"
echo "  npm: $(npm --version)"

# STEP 2: Setup Project Directory
echo -e "\n${CYAN}[2/5]${NC} Setting up project directory..."
cd ~ || error "Cannot navigate to home"
[ ! -d "projects" ] && mkdir -p projects && status "Created ~/projects"
cd projects || error "Cannot enter projects directory"

# STEP 3: Handle Project Files
echo -e "\n${CYAN}[3/5]${NC} Handling project files..."

if [ -f "Portofolio-Updated.zip" ]; then
    warning "Found Portofolio-Updated.zip - extracting..."
    pkg install unzip -y > /dev/null
    unzip -q Portofolio-Updated.zip || error "Failed to extract zip"
    status "Extracted Portofolio-Updated.zip"
elif [ ! -d "Portofolio-Updated" ]; then
    warning "Project directory not found"
    echo "Please ensure Portofolio-Updated folder is in ~/projects/"
    echo "Or copy it from storage:"
    echo "  cp -r /storage/emulated/0/Download/Portofolio-Updated ~/projects/"
    error "Project directory missing"
fi

cd Portofolio-Updated || error "Cannot enter Portofolio-Updated directory"
status "Project directory ready: $(pwd)"

# STEP 4: Install npm Dependencies
echo -e "\n${CYAN}[4/5]${NC} Installing npm dependencies (estimated 2-3 minutes)..."
echo "  This may take a while depending on your internet speed..."

npm install --legacy-peer-deps || error "Failed to install npm packages"
status "npm dependencies installed successfully"

# STEP 5: Verify Installation
echo -e "\n${CYAN}[5/5]${NC} Verifying installation..."
[ -f "package.json" ] && status "package.json found"
[ -d "node_modules" ] && status "node_modules installed"
[ -f "vite.config.ts" ] && status "Vite config found"
[ -d "src" ] && status "Source code found"

# FINAL STATUS
echo -e "\n${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ SETUP COMPLETED SUCCESSFULLY!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}\n"

# Print next steps
echo "📋 NEXT STEPS:"
echo ""
echo -e "${CYAN}To START DEVELOPMENT SERVER:${NC}"
echo "  npm run dev -- --host 0.0.0.0 --port 5173"
echo "  Then open: http://localhost:5173"
echo ""
echo -e "${CYAN}To BUILD FOR PRODUCTION:${NC}"
echo "  npm run build"
echo ""
echo -e "${CYAN}To PREVIEW BUILD:${NC}"
echo "  npm run preview"
echo ""
echo -e "${CYAN}Current Directory:${NC}"
echo "  $(pwd)"
echo ""
echo -e "${YELLOW}💡 TIP:${NC} Keep terminal open while developing"
echo "       Press Ctrl+C to stop the dev server"
echo ""
echo -e "${YELLOW}📱 To access from other devices:${NC}"
echo "  Find your device IP: ifconfig"
echo "  Access via: http://<your-ip>:5173"
echo ""

# Auto-start dev server option
read -p "Do you want to start dev server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "\n${CYAN}Starting development server...${NC}\n"
    npm run dev -- --host 0.0.0.0 --port 5173
else
    echo -e "\n${YELLOW}Setup complete! Run 'npm run dev -- --host 0.0.0.0 --port 5173' when ready${NC}\n"
fi
