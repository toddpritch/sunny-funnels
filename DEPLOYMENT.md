# Deployment Guide for sunny-funnels

## Overview

This Next.js project contains two high-converting landing pages:
- `/call` — Strategy call booking page (exact replica of existing page)
- `/cgm` — Creative Guitar Mastery community sales page

Both are ready to deploy to Vercel.

---

## Local Development

### 1. Install dependencies

```bash
cd sunny-funnels
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the home page.

Visit:
- [http://localhost:3000/call](http://localhost:3000/call) — Strategy call page
- [http://localhost:3000/cgm](http://localhost:3000/cgm) — Community sales page

### 3. Test locally

- Verify `/call` page loads with all videos, testimonials, and Calendly embed
- Verify `/cgm` page loads with correct Kajabi link
- Test on mobile (use `npm run dev` then open on phone via local network)
- Check console for errors

### 4. Build for production

```bash
npm run build
npm run start
```

---

## Vercel Deployment

### 1. Connect GitHub repository

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "Add New..." → "Project"
4. Select `toddpritch/sunny-funnels` repository
5. Click "Import"

### 2. Configure project

In the Vercel dashboard:

**Framework Preset:** Next.js (should auto-detect)

**Build Command:** `next build`

**Output Directory:** `.next`

**Install Command:** `npm install`

**Environment Variables:** (leave empty for now, can add later if needed)

### 3. Deploy

Click "Deploy" and wait for build to complete.

Your site will be available at:
```
https://<project-name>.vercel.app
```

With routes:
- `https://<project-name>.vercel.app/` — Home page
- `https://<project-name>.vercel.app/call` — Strategy call page
- `https://<project-name>.vercel.app/cgm` — Community sales page

### 4. Custom domain (optional)

In Vercel dashboard → Project settings → Domains:

1. Add your custom domain
2. Update DNS records (Vercel will show exact settings)
3. Wait for DNS to propagate (5-30 min)

---

## Testing After Deployment

### Desktop
- [ ] `/call` loads fully (check console for errors)
- [ ] Hero video loads and plays
- [ ] Calendly embed loads at `/call#booking-calendar`
- [ ] YouTube video (Tory Lanez) plays
- [ ] Testimonial videos play
- [ ] All three CTA buttons scroll to booking
- [ ] `/cgm` loads with correct styling
- [ ] Kajabi link works (opens new tab)

### Mobile (iPhone/Android)
- [ ] Layout is responsive
- [ ] Videos play properly
- [ ] Buttons are tap-friendly (large enough)
- [ ] Text is readable (not too small)
- [ ] No layout shifts while scrolling

### External Embeds
- [ ] Calendly loads and is interactive (try selecting a time)
- [ ] YouTube embeds load (check network tab if they don't)
- [ ] Testimonial videos play (check video sources are accessible)

### Analytics
- [ ] Vercel analytics dashboard shows page views
- [ ] Any Ploy or custom analytics tracking (if configured)

---

## Updating Content

### To update `/call` page content

Edit `pages/call.jsx`:
- Update video sources in the `<video>` tag
- Update album cards in the `albumCards` array
- Update testimonials in component data

Edit `styles/call.module.css`:
- Change colors (search for `--call-gold`)
- Adjust spacing/sizes

### To update `/cgm` page content

Edit `pages/cgm.jsx`:
- Update FAQ questions/answers in the `faqs` array
- Update pricing or payment terms
- Change Kajabi link in `handleKajabiClick` function

Edit `styles/cgm.module.css`:
- Change colors/styling
- Adjust layout

### After making changes

```bash
npm run dev  # Test locally
git add .
git commit -m "Update content"
git push origin main
```

Vercel will auto-deploy when you push to main.

---

## Troubleshooting

### Videos not loading

- Check URLs are accessible (copy paste into browser)
- Verify CORS headers on external video sources
- Try adding `crossOrigin="anonymous"` to video tags

### Calendly not showing

- Verify URL has correct spelling: `calendly.com/todd-pritch/1on1withtoddpritch`
- Check if GDPR banner hide param is working
- Try accessing Calendly URL directly in browser

### Page not found errors

- Verify Next.js page file is in `pages/` directory
- Check file names match route names (e.g., `pages/cgm.jsx` = `/cgm`)
- Restart dev server after adding new pages

### Styling issues

- Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Restart dev server

---

## Next Steps

### Short-term (Week 1)
- [ ] Deploy to Vercel
- [ ] Test all embeds and CTAs
- [ ] Share `/call` link with warm leads
- [ ] Monitor Calendly bookings

### Medium-term (Week 2-4)
- [ ] Share `/cgm` link with community
- [ ] Monitor Kajabi conversions
- [ ] Collect testimonials from first cohort
- [ ] Update social proof on pages

### Long-term
- [ ] A/B test headlines
- [ ] Add email capture to `/call` (pre-booking)
- [ ] Add payment tracker to `/cgm`
- [ ] Integrate with GHL for lead tagging

---

## Questions?

Check:
1. Vercel docs: https://vercel.com/docs
2. Next.js docs: https://nextjs.org/docs
3. Commit history in GitHub for recent changes
