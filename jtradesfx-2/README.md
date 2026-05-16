# JtradesFX Terminal

## How to deploy (step by step)

### 1. Upload to GitHub

1. Go to https://github.com/new
2. Repository name: `jtradesfx`
3. Leave everything else as default
4. Click **Create repository**
5. On the next page click **uploading an existing file**
6. Unzip this download and drag ALL files into the GitHub upload box
7. Click **Commit changes**

### 2. Connect to Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** in the left menu
3. Click **Create** → **Pages** tab → **Connect to Git**
4. Connect your GitHub account and select the `jtradesfx` repo
5. Settings:
   - Framework preset: **None**
   - Build command: *(leave completely blank)*
   - Build output directory: `/`
6. Click **Save and Deploy**

### 3. Add API keys

1. Go to your Cloudflare Pages project
2. Click **Settings** → **Environment Variables** → **Add variable**
3. Add all 4 variables below — set each one to **Production**

| Variable name          | Value                                    |
|------------------------|------------------------------------------|
| EXCHANGERATE_API_KEY   | 6c30cb730645e2f502c71d4f                |
| FRED_API_KEY           | bc015122c7283bcbcf19d2184a5dadeb        |
| NEWS_API_KEY           | 80b555adc7714ecbab2017343a85abce        |
| ANTHROPIC_API_KEY      | get this from console.anthropic.com     |

### 4. Redeploy

Click **Deployments** → **Retry deployment**

Your site is now live at **https://jtradesfx.pages.dev**

---

Every time you want to update the terminal in future, just edit `index.html` on GitHub and Cloudflare will auto-deploy within 60 seconds.
