# Sunny's Funnels

Production-ready website, landing page, and funnel templates built for creators, agencies, and DFY operators. Everything you need to build fast, convert high, and connect to GHL for shorts + YouTube long-form traffic.

**Live Examples:** [Mony Profile](https://mony.so/profile.html) | [Time Audit](https://mony.so/timeaudit) | [Multiply Challenge](https://mony.so/multiply.html)

---

## What's Inside

### 🎯 Core Templates
- **Landing Pages** — single-CTA hero → testimonial → call-to-action
- **Opt-In Funnels** — tab system with progressive fields + geolocation
- **Course/Upsell Pages** — sequenced module reveal, payment integration
- **Call Booking** — Calendly embed with pre-fill from funnel data
- **Squeeze Pages** — high-velocity lead capture for cold traffic

### 🔌 Backend + Integration
- **GHL Webhook Setup** — auto-sync leads from forms to GHL contacts
- **Geolocation Auto-Population** — detect city, state, timezone; pre-fill on form load
- **Dashboard** — real-time lead tracking, conversion metrics, attribution
- **OAuth + Auth** — Clerk integration for gated content (optional)
- **Email/SMS Sequences** — GHL automations triggered on form submission

### 📊 Attribution + Fulfillment
- **Event Tracking** — where did the lead come from? (organic, paid, direct, referral)
- **Conversion Pipeline** — lead → opt-in → course → call → close
- **Post-Purchase Fulfillment** — Telegram delivery, course access, receipt emails
- **Refund/Churn Handling** — automated workflows for failed payments and cancellations

---

## Quick Start

### 1. Clone & Deploy

```bash
git clone https://github.com/sunnymfmoney/sunny-funnels.git
cd sunny-funnels

# Choose your template
cd templates/landing-page
npm install
npm run dev
```

### 2. Configure Your Offer

Edit `config/offer.json`:

```json
{
  "name": "Your Offer Title",
  "price": 97,
  "currency": "USD",
  "cta": "Get Access",
  "calendlyUrl": "https://calendly.com/yourname",
  "ghlWebhook": "https://api.gohighlevel.com/v1/contacts",
  "ghlApiKey": "YOUR_GHL_API_KEY"
}
```

### 3. Add Your Copy

Each template has:
- `content/hero.md` — headline + subheadline + CTA
- `content/benefits.md` — 3-5 key benefits (bullet list)
- `content/testimonials.md` — 2-3 video testimonials (Fathom clips or YouTube)
- `content/faq.md` — common objection handlers

### 4. Deploy to Vercel

```bash
npm install -g vercel
vercel deploy
```

Your funnel is live. GHL is listening. Next step: traffic.

---

## Architecture

```
Page Load
    ↓
[Geolocation Detection] → Auto-populate city/state
    ↓
[Tab Opt-In Form]
├─ Tab 1: Email only
├─ Tab 2: Email + City (geolocation pre-filled)
└─ Tab 3: Full profile (pre-qual)
    ↓
[Form Submit] → GHL Webhook
    ↓
[GHL Automation]
├─ Email receipt
├─ Add tag: "from-landing-page"
└─ Trigger nurture sequence
    ↓
[Dashboard] → Track lead source, conversion, booking
    ↓
[Call Booked] → Fulfillment system (Telegram, course access, etc.)
```

---

## File Structure

```
sunny-funnels/
├── README.md (you are here)
├── docs/
│   ├── QUICK-START.md
│   ├── GEOLOCATION.md
│   ├── GHL-INTEGRATION.md
│   ├── DASHBOARD.md
│   ├── ATTRIBUTION.md
│   └── FULFILLMENT.md
├── templates/
│   ├── landing-page/
│   ├── opt-in-funnel/
│   ├── course-upsell/
│   └── squeeze-page/
├── components/
│   ├── tab-optins/
│   ├── testimonial-video/
│   ├── booking-widget/
│   └── hero-section/
├── backend/
│   ├── ghl-webhook/
│   ├── geolocation-api/
│   ├── dashboard/
│   └── auth/
├── examples/
│   ├── mony-profile/
│   ├── multiply-challenge/
│   └── timeaudit/
└── config/
    └── offer.json
```

---

## For Todd: YouTube + Shorts Integration

This repo is built for your content funnel:

1. **Shorts** → 15-60s hook → link in bio → landing page (squeeze → email)
2. **Long-form** → 15-45 min value video → deeper opt-in (name + email + city)
3. **Call CTA** → Calendly pre-filled with GHL data
4. **Dashboard** → See which video drove which lead, which leads booked calls, which calls closed

### Attribution Flow
- Shorts link tagged: `?utm_source=shorts&utm_medium=organic&utm_campaign=short-name`
- Long-form link tagged: `?utm_source=youtube&utm_medium=organic&utm_campaign=video-title`
- GHL auto-tags leads with source
- Dashboard groups by source → shows ROI

See `/docs/ATTRIBUTION.md` for the full setup.

---

## Key Features

### ✅ Tab Opt-Ins
Three opt-in depth levels—users choose how much they share:
- **Tab 1 (Lightest):** Email only → instant access to lead magnet
- **Tab 2 (Medium):** Email + first name + city → unlock bonus
- **Tab 3 (Deepest):** Full profile (name, email, city, phone, timezone) → calendar pre-fill

### ✅ Geolocation Auto-Population
- Detect visitor's city/state on page load (IP-based, with fallback for VPN)
- Pre-fill city field automatically
- Store timezone for calendar scheduling
- Respect privacy (ask permission, allow manual override)

### ✅ Course/Upsell Sequence
- After opt-in, show "Next Step" upsell (course, high-ticket call, group program)
- Progressive disclosure (Tab 1 → upsell small thing, Tab 3 → upsell big thing)
- Payment gateway integrated (Whop, Stripe, PayPal—configurable)

### ✅ Call Booking
- Embed Calendly with pre-filled fields (name, email, timezone from form)
- Track booking event in GHL + dashboard
- Auto-send Telegram notification to you when someone books

### ✅ Backend Dashboard
- Real-time lead count by source (shorts, long-form, organic, referral)
- Conversion rates (leads → course buyers → call bookers → closed deals)
- Cohort analysis (leads from this video converted 32%, leads from that video 8%)
- Export CSV for your CRM or analysis

---

## Getting Started (For Todd)

### Phase 1: Landing Page (Day 1)
- Pick a template in `/templates`
- Edit `config/offer.json` with your offer details
- Replace hero copy, testimonials, FAQ
- Deploy to Vercel
- Send me the URL for review

### Phase 2: GHL Connection (Day 2)
- Get your GHL API key (in GHL → Integrations)
- Add webhook URL to template config
- Test: submit a form → watch lead appear in GHL
- See `/docs/GHL-INTEGRATION.md` for detailed walkthrough

### Phase 3: Geolocation + Auto-Population (Day 3)
- Enable geolocation in `/components/form/geolocation.js`
- Test in different browsers (you should see your city pre-filled)
- See `/docs/GEOLOCATION.md` for privacy considerations

### Phase 4: Dashboard (Day 4)
- Deploy backend dashboard (`/backend/dashboard`)
- Connect to GHL API + Google Analytics
- Start tracking: leads by source, conversion funnel, booking rate
- See `/docs/DASHBOARD.md` for setup

### Phase 5: Fulfillment Planning (Day 5)
- Who gets Telegram notification when lead comes in?
- Who gets notified when someone books a call?
- What happens after the call (email sequence, course access, Notion sync)?
- See `/docs/FULFILLMENT.md` for the full system

---

## Technology Stack

- **Frontend:** React/Next.js, Tailwind CSS, shadcn/ui
- **Forms:** React Hook Form + Zod validation
- **Backend:** Node.js (Vercel Functions / serverless)
- **Geolocation:** MaxMind GeoIP2 (free tier available)
- **GHL Sync:** GHL REST API + webhooks
- **Dashboard:** React + Recharts for analytics
- **Auth (optional):** Clerk for gated content
- **Payments:** Whop / Stripe (configurable per template)

---

## Environment Variables

Create `.env.local` in your template directory:

```
NEXT_PUBLIC_GHL_WEBHOOK_URL=https://api.gohighlevel.com/v1/contacts
GHL_API_KEY=your_ghl_api_key_here
GEOLOCATION_API_KEY=your_geoip_api_key
CALENDLY_URL=https://calendly.com/your-calendar
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
NEXT_PUBLIC_OFFER_PRICE=97
NEXT_PUBLIC_CURRENCY=USD
```

See each template's `.env.example` for the full list.

---

## Deployment Checklist

Before going live:

- [ ] Copy updated with your voice (not generic)
- [ ] Testimonials added (video clips or typed with consent)
- [ ] CTA link tested (Calendly, payment, whatever your funnel)
- [ ] Form fields validated (email regex, phone format, etc.)
- [ ] GHL webhook tested (submit form, watch lead appear in GHL)
- [ ] Geolocation tested (load in incognito, see city pre-filled)
- [ ] Mobile tested (forms stack, buttons tap-friendly, 320px+)
- [ ] Analytics pixel added (Google Analytics, Meta Pixel if using paid)
- [ ] Error handling (form submission fails → user sees clear error)
- [ ] Email working (test email arrives from GHL)

---

## Support & Customization

### Common Customizations
- **Different payment gateway?** See `/backend/payments` for Stripe, PayPal, Whop integrations
- **Different calendar?** Acuity Scheduling, Calendly, HubSpot Meetings—swap the embed URL
- **Multiple offers on one page?** See `/templates/multi-offer` for tabbed upsells
- **SMS instead of email?** Enable Twilio in `/backend/notifications`

### Troubleshooting
- **Form not submitting?** Check `.env.local` for GHL API key—must have `Contacts:Create` permission
- **Geolocation not working?** Check browser privacy settings (some block geolocation by default)
- **Dashboard empty?** Verify Google Analytics property ID in config, give it 24h to populate
- **Mobile rendering broken?** Run `npm run dev`, open DevTools, toggle device toolbar (F12 → Cmd+Shift+M)

---

## Next Steps

1. **Clone this repo** → pick a template → deploy to Vercel (5 min)
2. **Connect GHL** → watch leads flow in (15 min)
3. **Set up geolocation** → watch city auto-populate (10 min)
4. **Turn on analytics** → see attribution by traffic source (20 min)
5. **Build dashboard** → track conversions end-to-end (30 min)
6. **Plan fulfillment** → know exactly what happens after the call (planning doc)

**Total time to production:** ~2 hours  
**Total time to first attribution insights:** 48 hours (analytics backfill)

---

## License

MIT. Use freely. Fork it. Customize it. Make money with it.

---

## Questions?

Open an issue. Check the `/docs` folder for detailed guides. See `/examples` for working code.

**Let's go make funnels.**
