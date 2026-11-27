# MY Subsale Homes Hub — GitHub + Railway Edition

A lightweight static website. It has no database, backend API, admin panel or login. A tiny built-in Node.js server serves the static files so Railway can run it using its assigned `PORT`.

## Included
- `index.html` — homepage and content
- `styles.css` — responsive design
- `script.js` — mobile navigation and current year
- `server.js` — dependency-free static web server for Railway
- `package.json` — Railway start script
- `railway.json` — Railway deployment settings
- `robots.txt`, `sitemap.xml` — search engine files
- `404.html` — not-found page
- `assets/` — favicon and social sharing image

## Configured contact links
- Telegram: https://t.me/mysubsalehomes
- WhatsApp: https://wa.me/60109688408

The Telegram URL uses the public username without `@`. Confirm that `mysubsalehomes` is the channel's actual public username.

## Deploy using GitHub and Railway

### 1. Upload this project to GitHub
1. Download and extract the ZIP.
2. Create a new GitHub repository, for example `my-subsale-homes-hub`.
3. Upload the contents of the extracted folder to the repository root. `package.json`, `server.js`, and `index.html` must be at the root, not inside an extra nested folder.
4. Commit the files to the `main` branch.

### 2. Deploy on Railway
1. Sign in at https://railway.com/
2. Create a new project and choose **Deploy from GitHub repo**.
3. Select your `my-subsale-homes-hub` repository and authorize access if requested.
4. Railway detects `package.json` and uses the `npm start` command configured in `railway.json`.
5. Wait for the deployment to finish.
6. Open the service's **Settings → Networking** and choose **Generate Domain** to create a public `*.up.railway.app` URL.
7. Open the generated URL and test the homepage, mobile navigation, Telegram button and WhatsApp button.

No environment variables are required. Do not set a fixed PORT; Railway supplies it automatically.

### 3. Google Search Console
After the Railway public domain is generated:
1. Open https://search.google.com/search-console/
2. Add the full Railway URL as a **URL-prefix** property, for example `https://your-service.up.railway.app/`.
3. Complete Google's verification instructions.
4. Edit `sitemap.xml` and replace `https://REPLACE-WITH-YOUR-RAILWAY-DOMAIN/` with the actual public URL.
5. Edit `robots.txt` and add `Sitemap: https://YOUR-RAILWAY-DOMAIN/sitemap.xml`.
6. Commit and push these changes to GitHub. Railway will redeploy automatically.
7. In Search Console, submit `/sitemap.xml`.

If you later connect a custom domain in Railway, update the sitemap URL and any canonical/social URL metadata to use that domain.

## Local preview
With Node.js installed, run:

```bash
npm start
```

Then open `http://localhost:3000`.

You can also open `index.html` directly for a quick visual preview, but `npm start` is the better test of Railway's server behavior.

## Before going live
- Confirm the Telegram channel username is `mysubsalehomes`.
- Replace the sitemap placeholder after Railway generates the domain.
- Add the sitemap line to `robots.txt`.
- Check the site on a phone.
- Replace the sample hero background with your own licensed property photography if desired.

## Notes
This is intentionally a static marketing page. Property posts are not published or managed on this website; visitors click through to Telegram to view the listings.
