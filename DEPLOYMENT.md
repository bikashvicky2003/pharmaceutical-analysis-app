# GitHub Deployment Guide

## Option 1: GitHub Pages (Recommended - Static Site)

### Step 1: Prepare Your Repository

1. Create a new repository on GitHub:
   - Go to GitHub.com and click "New repository"
   - Name it `pharmaceutical-analysis-app`
   - Make it public (required for free GitHub Pages)
   - Initialize with README

### Step 2: Upload Your Code

1. Clone your new repository:
```bash
git clone https://github.com/yourusername/pharmaceutical-analysis-app.git
cd pharmaceutical-analysis-app
```

2. Copy all the source files to this directory:
   - Copy all files from your current project
   - Replace `package.json` with `package-github.json` and rename it to `package.json`
   - Replace `vite.config.ts` with `vite.config.github.ts` and rename it to `vite.config.ts`
   - In `client/src/App.tsx`, replace the import:
     ```typescript
     import { queryClient } from "./lib/queryClient.github";
     ```

### Step 3: Enable GitHub Pages

1. Go to your repository settings on GitHub
2. Scroll down to "Pages" section
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy when you push to main

### Step 4: Deploy

1. Add, commit, and push your files:
```bash
git add .
git commit -m "Initial deployment of pharmaceutical analysis app"
git push origin main
```

2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at: `https://yourusername.github.io/pharmaceutical-analysis-app`

## Option 2: Full-Stack Deployment (Vercel/Netlify)

### For Vercel:

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist/public`
4. Deploy

### For Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/public`
4. Deploy

## Option 3: Self-Hosted Server

1. Clone your repository on your server
2. Install dependencies: `npm install`
3. Build the application: `npm run build`
4. Start the server: `npm start`
5. Configure your web server (nginx/apache) to proxy to port 5000

## File Structure for GitHub

```
pharmaceutical-analysis-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       ├── lib/
│       │   ├── mockData.ts     # Client-only mock data
│       │   ├── queryClient.github.ts
│       │   ├── statistics.ts
│       │   └── csv-utils.ts
│       ├── components/ui/      # shadcn/ui components
│       └── pages/
│           ├── analysis.tsx
│           └── not-found.tsx
├── shared/
│   └── schema.ts
├── server/                     # Optional for full-stack deployment
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── README.md
├── DEPLOYMENT.md
└── .gitignore
```

## Important Notes

1. **GitHub Pages**: Uses client-only version with mock data storage
2. **Full-Stack**: Requires server hosting for persistent data
3. **Domain**: Free GitHub Pages URL or custom domain
4. **Analytics**: Can be integrated with Google Analytics

## Troubleshooting

- If build fails, check Node.js version (recommended: 18+)
- For routing issues, ensure `base: "./"` in vite.config.ts
- For 404 errors, add `404.html` that redirects to `index.html`

## Customization

- Update repository name in all config files
- Change app name in `package.json`
- Update GitHub username in URLs
- Modify branding in `client/src/pages/analysis.tsx`
