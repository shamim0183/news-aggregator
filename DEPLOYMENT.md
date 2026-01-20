# Vercel Deployment Guide

## Prerequisites
1. GitHub repository (✅ Already done: `https://github.com/shamim0183/news-aggregator.git`)
2. Vercel account ([Sign up](https://vercel.com/signup))
3. Production PostgreSQL database

---

## Step 1: Set Up Production Database

### Option A: Neon (Recommended - Serverless PostgreSQL)
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the **Connection String** (starts with `postgresql://`)
4. Example: `postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require`

### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings → Database** and copy the **Connection Pooling** string
4. Use the **Transaction mode** connection string

### Option C: Vercel Postgres
1. In Vercel dashboard, go to **Storage → Create Database**
2. Select **Postgres**
3. Copy the connection string from the `.env.local` tab

---

## Step 2: Deploy to Vercel

### Via Vercel Dashboard (Easiest)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `shamim0183/news-aggregator`
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: (Leave default, `vercel.json` handles it)
   - **Install Command**: `npm install --legacy-peer-deps`

4. **Add Environment Variables**:
   Click **Environment Variables** and add:
   ```
   DATABASE_URL=postgresql://[YOUR_NEON_CONNECTION_STRING]
   NEWSDATA_API_KEY=pub_27888cf6af10439cafb58f0ed12b0ec4
   ```

5. Click **Deploy** 🚀

### Via Vercel CLI (Alternative)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## Step 3: Run Database Migrations

After deployment, you need to apply the Prisma schema to your production database:

### Method 1: Using Vercel CLI (Recommended)
```bash
# Set production DATABASE_URL locally (temporarily)
$env:DATABASE_URL="postgresql://[YOUR_PRODUCTION_DB_URL]"

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### Method 2: Via Prisma Data Platform
1. Go to [cloud.prisma.io](https://cloud.prisma.io)
2. Connect your database
3. Run migrations from the dashboard

---

## Step 4: Verify Deployment

1. Visit your deployed URL: `https://your-app.vercel.app`
2. Click **"Sync News"** to populate the database
3. Verify articles appear with country flags 🇺🇸

---

## Important Notes

### Environment Variables
- **Never commit `.env` to Git** (already in `.gitignore`)
- Production `DATABASE_URL` must use **SSL** (`?sslmode=require`)
- Vercel automatically injects env vars during build

### Database Proxy
- **Remove** `npx prisma dev` from production (it's dev-only)
- The production `DATABASE_URL` connects directly to PostgreSQL
- Example production URL:
  ```
  postgresql://user:pass@host.region.provider.com:5432/dbname?sslmode=require
  ```

### Prisma Driver Adapter
- Ensure `package.json` includes:
  ```json
  "dependencies": {
    "pg": "^8.11.3",
    "@prisma/adapter-pg": "^7.2.0"
  }
  ```
- `lib/prisma.ts` already configured with `PrismaPg` adapter ✅

---

## Troubleshooting

### Build Fails: "Cannot find module @prisma/client"
**Solution**: Ensure `vercel.json` has:
```json
{
  "buildCommand": "npx prisma generate && npm run build"
}
```

### Database Connection Error
**Solutions**:
1. Verify `DATABASE_URL` format includes `?sslmode=require`
2. Check database allows connections from `0.0.0.0/0` (Vercel IPs)
3. For Neon: Enable **IP Allow** in settings

### Prisma Client Not Generated
**Solution**: Run during build:
```bash
npx prisma generate
```

---

## Next Steps After Deployment

1. **Custom Domain**: Add in Vercel dashboard → Settings → Domains
2. **Analytics**: Enable Vercel Analytics
3. **Cron Jobs**: Set up Vercel Cron to auto-sync news daily
4. **Monitoring**: Add error tracking (Sentry)

---

## Cost Estimate
- **Vercel Hobby**: Free (includes 100GB bandwidth)
- **Neon Free Tier**: 0.5GB storage, 3 projects
- **NewsData.io**: 200 credits/day free

Total: **$0/month** for hobby projects! 🎉
