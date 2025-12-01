# 🚀 Deployment Guide

## GitHub Pages Deployment

PromptCraft is configured for automatic deployment to GitHub Pages using GitHub Actions.

### 🎯 Live Demo

**Production URL**: https://c0dezer019.github.io/PromptCraft/

---

## 📋 Prerequisites

1. **GitHub Account** with repository access
2. **Node.js 20+** installed locally (for testing)
3. **GitHub Pages enabled** on your repository

---

## ⚙️ Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: GitHub Actions
4. Save the settings

### 2. Configure Repository Secrets (Optional)

No secrets are required for basic deployment. The workflow uses GitHub's built-in tokens.

### 3. Verify Configuration

Check these files are properly configured:

#### `vite.config.js`
```javascript
export default defineConfig({
  base: '/PromptCraft/',  // Must match your repo name
  // ... other config
});
```

#### `package.json`
```json
{
  "homepage": "https://c0dezer019.github.io/PromptCraft"
}
```

---

## 🔄 Automatic Deployment

### Trigger Deployment

Deployment happens automatically when you:

1. **Push to `main` branch**:
   ```bash
   git push origin main
   ```

2. **Merge a Pull Request** to `main`

3. **Manual Trigger** via GitHub Actions tab

### Deployment Process

```
1. Push to main branch
   ↓
2. GitHub Actions triggered
   ↓
3. Install dependencies (npm ci)
   ↓
4. Build application (npm run build)
   ↓
5. Upload to GitHub Pages
   ↓
6. Deploy (live in ~2-5 minutes)
```

---

## 🧪 Local Testing

### Test Production Build Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

The preview server will start at `http://localhost:4173` (default Vite preview port).

### Test Development Build

```bash
# Start development server
npm run dev
```

Development server runs at `http://localhost:3000`.

---

## 🛠️ Manual Deployment (Alternative)

If you prefer manual deployment using `gh-pages`:

```bash
# Install dependencies
npm install

# Deploy to gh-pages branch
npm run deploy
```

This will:
1. Build the application
2. Push the `dist` folder to `gh-pages` branch
3. GitHub Pages will serve from that branch

**Note**: You need to change GitHub Pages source to "Deploy from branch: gh-pages" if using this method.

---

## 📦 Build Output

After running `npm run build`, the optimized production build is in the `dist/` folder:

```
dist/
├── assets/
│   ├── index-[hash].js       # Main bundle
│   ├── react-vendor-[hash].js # React libraries
│   ├── icons-[hash].js        # Lucide icons
│   └── index-[hash].css       # Styles
├── favicon.svg
└── index.html
```

**Bundle Optimization**:
- Code splitting for React vendors
- Separate chunk for icon library
- Tree-shaking removes unused code
- Minified and optimized

---

## 🔍 Troubleshooting

### Deployment Failed

**Check GitHub Actions Log**:
1. Go to **Actions** tab in your repository
2. Click on the failed workflow
3. Review the error logs

**Common Issues**:

#### Build Errors
```bash
# Run build locally to see errors
npm run build
```

#### Base Path Issues
If assets don't load:
- Verify `base: '/PromptCraft/'` in `vite.config.js` matches your repo name
- Check browser console for 404 errors

#### Node Version
Ensure GitHub Actions uses Node 20+:
```yaml
# .github/workflows/deploy.yml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20'
```

---

## 🌐 Custom Domain (Optional)

### Using Custom Domain

1. **Add CNAME file**:
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Update DNS records**:
   - Add A records pointing to GitHub Pages IPs
   - Or CNAME record pointing to `c0dezer019.github.io`

3. **Update `vite.config.js`**:
   ```javascript
   export default defineConfig({
     base: '/',  // Root path for custom domain
   });
   ```

4. **Update `package.json`**:
   ```json
   {
     "homepage": "https://yourdomain.com"
   }
   ```

5. **Configure in GitHub Settings** → **Pages** → **Custom domain**

---

## 📊 Deployment Status

### Check Deployment Status

**Via GitHub UI**:
- Go to **Actions** tab
- See workflow status: ✅ Success / ❌ Failed / 🟡 In Progress

**Via Badge** (add to README):
```markdown
![Deploy Status](https://github.com/c0dezer019/PromptCraft/actions/workflows/deploy.yml/badge.svg)
```

**Via Deployments**:
- Go to **Environments** → **github-pages**
- See deployment history and status

---

## 🔒 Security

### API Keys

⚠️ **Important**: API keys are stored locally in browser `localStorage`, never in the deployed code.

- Keys are not included in the build
- Keys are not committed to git
- Each user provides their own API keys in Settings

### Content Security

The application:
- ✅ Runs entirely client-side
- ✅ No backend server required
- ✅ No data sent to external servers (except chosen AI APIs)
- ✅ All prompts stored locally

---

## 📈 Performance

### Build Stats

Typical production build:
- **Total Size**: ~200-300 KB (gzipped)
- **Initial Load**: ~50-80 KB
- **React Vendor**: ~130 KB (cached)
- **Icons**: ~30 KB (lazy-loaded)

### Optimization Features

- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Asset optimization
- ✅ Chunk hashing for cache busting

---

## 🔄 Update Deployment

### Deploy New Version

1. **Make changes** to your code
2. **Commit and push** to main:
   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin main
   ```
3. **Automatic deployment** starts
4. **Live in 2-5 minutes**

### Rollback Deployment

If needed, revert to previous version:

```bash
# Find the commit hash of working version
git log --oneline

# Revert to that commit
git revert <commit-hash>

# Push to trigger new deployment
git push origin main
```

---

## 📞 Support

### Deployment Issues

If you encounter issues:

1. **Check GitHub Actions logs**
2. **Test build locally**: `npm run build`
3. **Verify configuration files**
4. **Check GitHub Pages settings**

### Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/actions)

---

## ✅ Deployment Checklist

Before deploying:

- [ ] All tests pass locally
- [ ] Production build works: `npm run build && npm run preview`
- [ ] No console errors in browser
- [ ] API keys are NOT committed
- [ ] `vite.config.js` has correct base path
- [ ] GitHub Pages enabled in repository settings
- [ ] `.github/workflows/deploy.yml` is present
- [ ] All changes committed and pushed

---

**Your PromptCraft application is now ready for GitHub Pages! 🎉**

Visit: https://c0dezer019.github.io/PromptCraft/
