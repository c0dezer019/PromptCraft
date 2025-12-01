# 🔧 Troubleshooting Guide

## React App Not Rendering on GitHub Pages

If you see a blank page after deployment, follow these steps:

### 1. Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab for errors.

**Common Errors:**

#### `Failed to load module` or `404 errors for assets`
**Solution**: Verify the base path in `vite.config.js` matches your repository name:
```javascript
export default defineConfig({
  base: '/PromptCraft/', // Must match your repo name
});
```

#### `Uncaught TypeError: Cannot read properties of null`
**Solution**: The React root element might not be found. Check:
1. `index.html` has `<div id="root"></div>`
2. `src/main.jsx` targets the correct element

### 2. Check GitHub Actions Build Log

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Expand the **Build** step
4. Look for error messages

**Common Build Issues:**

#### `npm ci` fails
**Solution**: The workflow now uses `npm install` instead. If you see this error, the fix is already applied.

#### `Module not found` errors
**Solution**: Ensure all dependencies are in `package.json`:
```bash
npm install
git add package.json package-lock.json
git commit -m "fix: add package-lock.json"
git push
```

### 3. Verify Deployment Files

Check that files are being deployed correctly:

1. Go to your GitHub Pages URL: `https://c0dezer019.github.io/PromptCraft/`
2. Try accessing: `https://c0dezer019.github.io/PromptCraft/index.html`
3. Check if assets load: `https://c0dezer019.github.io/PromptCraft/assets/`

### 4. Test Build Locally

Before pushing, always test the production build:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Check the dist folder
ls -la dist/

# Preview the build
npm run preview
```

Visit `http://localhost:4173/PromptCraft/` (note the base path!)

### 5. Common Fixes

#### Fix 1: Clear GitHub Pages Cache
1. Go to **Settings** → **Pages**
2. Change source to a different branch (or None)
3. Wait 10 seconds
4. Change back to **GitHub Actions**
5. Trigger a new deployment

#### Fix 2: Force Rebuild
```bash
git commit --allow-empty -m "chore: trigger rebuild"
git push origin main
```

#### Fix 3: Check File Permissions
Ensure all files are readable:
```bash
chmod -R 755 dist/
```

#### Fix 4: Verify .nojekyll Exists
GitHub Pages uses Jekyll by default, which can cause issues:
```bash
ls -la public/.nojekyll
# Should exist. If not:
touch public/.nojekyll
git add public/.nojekyll
git commit -m "fix: add .nojekyll"
git push
```

### 6. Debug Mode

Add debug logging to `src/main.jsx`:

```javascript
console.log('🚀 PromptCraft Starting...');
console.log('Root element:', document.getElementById('root'));
console.log('Base URL:', import.meta.env.BASE_URL);

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log('✅ React app mounted successfully');
} catch (error) {
  console.error('❌ Failed to mount React app:', error);
  document.body.innerHTML = '<h1>Error loading app. Check console.</h1>';
}
```

### 7. Manual Deployment Test

Try manual deployment to isolate the issue:

```bash
# Build locally
npm run build

# Deploy manually using gh-pages
npm run deploy
```

Then check if the site works on the gh-pages branch.

### 8. Verify Dependencies

Ensure all required dependencies are installed:

```bash
npm install react react-dom lucide-react
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
```

### 9. Check Vite Config

Verify your `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/PromptCraft/', // ← Must match repo name!
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, // Enable for debugging
  }
});
```

### 10. Still Not Working?

#### Create a Minimal Test

Replace `src/App.jsx` temporarily:

```javascript
export default function App() {
  return (
    <div style={{ padding: '50px', fontFamily: 'system-ui' }}>
      <h1>✅ React is Working!</h1>
      <p>If you see this, React is rendering correctly.</p>
      <p>Base URL: {import.meta.env.BASE_URL}</p>
    </div>
  );
}
```

Build and deploy. If this works, the issue is in your components.

---

## Quick Checklist

- [ ] `vite.config.js` has correct `base` path
- [ ] `.nojekyll` file exists in `public/`
- [ ] GitHub Pages source is set to "GitHub Actions"
- [ ] GitHub Actions workflow completed successfully
- [ ] No console errors in browser DevTools
- [ ] `npm run build && npm run preview` works locally
- [ ] All dependencies in `package.json`
- [ ] `index.html` has `<div id="root"></div>`
- [ ] `src/main.jsx` renders to `#root`

---

## Still Need Help?

1. Check the [GitHub Actions logs](https://github.com/c0dezer019/PromptCraft/actions)
2. Test the build locally with `npm run build && npm run preview`
3. Open browser DevTools and check Console/Network tabs
4. Review [Vite deployment docs](https://vitejs.dev/guide/static-deploy.html#github-pages)

---

**Most Common Issue**: Wrong base path in `vite.config.js`. Make sure it matches your repository name exactly!
