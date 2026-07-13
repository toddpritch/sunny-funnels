# Quick Start: 5 Minutes to a Live Landing Page

## Step 1: Clone & Install (1 min)

```bash
git clone https://github.com/sunnymfmoney/sunny-funnels.git
cd sunny-funnels/templates/landing-page
npm install
```

## Step 2: Edit Config (2 min)

Open `config/offer.json`:

```json
{
  "title": "Your Offer Here",
  "subtitle": "The transformation they get",
  "price": 97,
  "currency": "USD",
  "ctaText": "Get Started",
  "ctaLink": "https://calendly.com/yourname",
  "ghlWebhookUrl": "https://api.gohighlevel.com/v1/contacts",
  "ghlApiKey": "paste_your_ghl_key_here"
}
```

To get your GHL API key:
1. Log in to GHL
2. Settings → Integrations → API Keys
3. Copy the key, paste it above

## Step 3: Edit Copy (1 min)

Open `content/hero.md`:

```markdown
# Your Headline

Your subheadline goes here. This is where you hook them.

> "This changed my business." — Real Customer

## What You Get
- Benefit 1
- Benefit 2
- Benefit 3
```

## Step 4: Deploy (1 min)

```bash
vercel deploy
```

Done. Your funnel is live.

---

## Next: Connect GHL

When a form is submitted, it automatically sends to your GHL contacts. Test it:

1. Open your Vercel URL
2. Fill out the form
3. Go to GHL → Contacts
4. You should see the lead appear within 5 seconds

See `docs/GHL-INTEGRATION.md` if it's not working.

---

## Add Geolocation (Optional, 5 min extra)

To auto-populate the visitor's city:

1. Open `components/form/geolocation.js`
2. Uncomment the `useGeolocation()` hook (line 12)
3. Get a free GeoIP API key: https://geoip-db.com (free tier: 30k/month)
4. Add to `.env.local`: `GEOLOCATION_API_KEY=your_key`
5. Redeploy: `vercel deploy`

Now when someone loads your page, their city auto-fills.

---

## What Comes Next

- **Testimonials:** Add 2-3 video clips (use Fathom clips, YouTube embeds, or recorded Zoom)
- **FAQ:** Answer 3 objections (see `content/faq.md`)
- **Call to Action:** Make it specific ("Book Your Free Audit" not just "Learn More")
- **Analytics:** Add your Google Analytics ID to track conversions
- **Mobile Test:** Open on your phone, make sure forms are tap-friendly

See `docs/DASHBOARD.md` to start tracking leads by source (shorts, YouTube, organic, etc.).

**Ship it. Get leads. Book calls. Close deals.**
