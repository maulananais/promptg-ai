# GitHub & Vercel Deployment Setup

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `promptg-ai`
5. Description: `Lightning-fast prompt builder for Gemini/Veo3 powered by Groq API`
6. Make it Public
7. Don't initialize with README (we already have one)
8. Click "Create repository"

## Step 2: Push to GitHub

Run these commands in your terminal (PowerShell):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/promptg-ai.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel

### Option A: Using Vercel Website
1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `promptg-ai` repository
5. Project settings will be auto-detected (Next.js)
6. Click "Deploy"

### Option B: Using Vercel CLI
```powershell
npm i -g vercel
vercel login
vercel --prod
```

## Step 4: Environment Variables (Optional)

Since your app uses client-side API key input, no environment variables are needed. Users will enter their Groq API key directly in the UI.

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Go to Settings > Domains
3. Add your custom domain
4. Follow the DNS configuration instructions

## Your App URLs

- **GitHub Repository**: `https://github.com/YOUR_USERNAME/promptg-ai`
- **Vercel App**: `https://promptg-ai-YOUR_USERNAME.vercel.app`

## Features Ready for Production ✅

- ✅ Responsive design
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Client-side API key storage
- ✅ Error handling
- ✅ Copy to clipboard functionality
- ✅ Modern UI/UX
- ✅ SEO optimized
- ✅ Fast performance

Your PromptG AI is ready to go live! 🚀
