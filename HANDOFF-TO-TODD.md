# HANDOFF: Sunny's Funnels for Todd

**Date:** July 2024  
**Purpose:** Fast landing pages + funnels + GHL integration for YouTube + Shorts traffic

---

## What You Got

A complete, open-source template library for building high-converting landing pages and funnels. Everything from this repo is yours to use, customize, and build on.

**Included:**
- 4 production-ready templates (landing page, opt-in, course upsell, squeeze)
- Complete backend (GHL integration, geolocation, forms)
- Analytics dashboard (track leads by source)
- Documentation (6 guides covering every step)
- Component library (reusable form fields, testimonials, etc.)

**Your job:** Fork this repo, customize it for your offers, deploy to Vercel, connect to GHL, and start collecting leads from your YouTube + Shorts content.

---

## Your Workflow (5-Step Daily)

### Step 1: Record Content (Your Shorts or YouTube)
- Shorts: 15-60 seconds, hook-driven
- Long-form: 15-45 min value video

### Step 2: Create Funnel Link
```
Pick a campaign name: "shorts-copywriting-secrets" or "15-min-deep-dive"

Generate URL:
https://yourfunnel.vercel.app/?utm_source=shorts&utm_campaign=shorts-copywriting&utm_medium=organic

Shorten it: mony.so/copywriting-shorts (or use Linktree)
```

### Step 3: Drop Link in Content
- Shorts: "Link in bio: mony.so/copywriting-shorts"
- YouTube: Add to description, use YouTube chapters to link at key moments

### Step 4: Visitor Lands on Funnel
```
Page loads
  ↓
City auto-populates (geolocation)
  ↓
They fill form: name, email, city
  ↓
Form submits
  ↓
Lead appears in GHL with tags: "source-shorts", "campaign-shorts-copywriting"
  ↓
GHL automation fires: welcome email + SMS
```

### Step 5: Follow Up
- Check your Telegram for notifications (lead came in!)
- If they book a call: automate confirmation + preparation email
- If they buy: automate course access + onboarding sequence
- Track everything in your dashboard (which video drove which leads?)

---

## Getting Started (Day 1: 2 Hours)

### 1. Fork & Clone (10 min)
```bash
# Fork this repo on GitHub
git clone https://github.com/YOUR-GITHUB/sunny-funnels.git
cd sunny-funnels/templates/landing-page
npm install
```

### 2. Configure Your Offer (10 min)
Edit `config/offer.json`:
```json
{
  "title": "Your Offer Title",
  "price": 97,
  "ctaLink": "https://calendly.com/yourname"
}
```

Edit `.env.local` (get keys from GHL):
```
GHL_API_KEY=your_ghl_api_key
GHL_LOCATION_ID=your_ghl_location_id
```

### 3. Edit Copy (20 min)
- `content/hero.md` — your headline
- `content/benefits.md` — 3-5 benefits
- `content/testimonials.md` — social proof (use Fathom clips or YouTube)
- `content/faq.md` — objection handlers

### 4. Test Locally (10 min)
```bash
npm run dev
# Open http://localhost:3000
# Fill out form
# Check console for errors
```

### 5. Deploy to Vercel (10 min)
```bash
npm install -g vercel
vercel deploy
```

Done. Your funnel is live at `something.vercel.app`.

### 6. Test End-to-End (20 min)
1. Open your Vercel URL
2. Fill out form (different browser or incognito)
3. Wait 5 seconds
4. Go to GHL → Contacts
5. See your lead appear with tags

### 7. Connect GHL Automations (20 min)
In GHL:
- Create automation: "Contact Created" → send welcome email
- Create automation: Tag "call-booked" → send call reminder
- See `docs/GHL-INTEGRATION.md` for detailed setup

---

## Your First Campaign (Day 2-3: 1 Hour Setup)

### 1. Shoot Your First Shorts
```
30 seconds, hook in first 3 seconds
"If you want to charge more for your work without feeling guilty..."
→ "Link in bio"
```

### 2. Generate Your Link
```
Campaign name: shorts-charging-more
Full URL: https://yourfunnel.vercel.app/?utm_source=shorts&utm_campaign=shorts-charging-more&utm_medium=organic
Shortened: mony.so/charging-more
```

### 3. Post the Shorts
- Hook → value → CTA → link

### 4. Track in Spreadsheet
```
Date: 2024-08-15
Title: Charging More Secrets
Campaign: shorts-charging-more
Link: mony.so/charging-more
Status: Posted
```

### 5. Check Your Dashboard (24 Hours Later)
```
Dashboard: yourfunnel.vercel.app/dashboard
(if you set up the dashboard—optional but recommended)

You should see:
- X leads from "shorts-charging-more" campaign
- Which of them booked calls?
- Which bought your course?
```

---

## Dashboard: See What's Working

Once leads start flowing in, you'll see:

```
SHORTS PERFORMANCE
├─ shorts-charging-more: 23 leads → 3 calls → 1 paid
├─ shorts-objection-handler: 18 leads → 2 calls → 0 paid
└─ shorts-story-time: 12 leads → 1 call → 0 paid

INSIGHT: "Charging More" video works. Double down.

YOUTUBE PERFORMANCE
├─ 15-min-deep-dive: 15 leads → 8 calls → 4 paid
└─ how-to-raise-price: 8 leads → 2 calls → 1 paid

INSIGHT: Deep dive crushes it. Invest in more long-form.
```

From this data, you know:
- Which content to keep making
- Which to kill
- Which platform (shorts vs YouTube) converts better
- Which gives you qualified leads

---

## GHL Automations You Need

### Automation 1: Welcome Email (Fires when lead opts in)
```
Trigger: Contact Created (or "from-landing-page" tag added)
Email: "Thanks for opting in! Here's what's next..."
Wait: 1 hour
SMS: "Did you see the email? Hit reply if you have questions"
```

### Automation 2: Call Booked Reminder (Fires when they book)
```
Trigger: 24 hours before Calendly event
Email: "Your call is tomorrow at [TIME]"
SMS: "Quick reminder: we're talking tomorrow at 2 PM"
```

### Automation 3: Post-Call Follow-Up (You manually tag them)
```
After your call, tag them: "interested" or "objection-price" or "not-qualified"
GHL automation handles the rest:
- "interested" → Send course link + payment link
- "objection-price" → Send ROI calculator + payment plan
- "not-qualified" → Nurture sequence (email every 2 weeks)
```

### Automation 4: Payment Received
```
Trigger: Contact tagged "paid-customer"
Email: "Welcome! Here's your course access..."
SMS: "Check your email for login details"
Telegram (to you): "💰 NEW PAID CUSTOMER: [Name]"
```

See `docs/GHL-INTEGRATION.md` for exact step-by-step setup.

---

## Attribution: Know What's Working

Every link you share has a tag:

```
shorts: ?utm_source=shorts&utm_campaign=shorts-TOPIC
youtube: ?utm_source=youtube&utm_campaign=VIDEO-TITLE
organic: ?utm_source=organic&utm_campaign=blog-TITLE
```

GHL auto-tags your leads:
```
Tags added automatically:
- source-shorts (or source-youtube, source-organic)
- campaign-shorts-copywriting
- from-landing-page
```

Then your dashboard breaks down:
```
Shorts: 100 leads → 14 calls (14%) → 8 paid (8%)
YouTube: 25 leads → 10 calls (40%) → 5 paid (20%)
Organic: 8 leads → 1 call (12%) → 0 paid (0%)

→ YouTube is your money maker. Invest there.
```

See `docs/ATTRIBUTION.md` for the full system.

---

## Your First Month Targets

### Week 1
- [ ] Deploy funnel to Vercel
- [ ] Connect to GHL
- [ ] Post 3 shorts with funnel links
- [ ] Get first 5 leads

### Week 2
- [ ] Post 3 more shorts
- [ ] Post 1 long-form video
- [ ] Get 15-20 leads total
- [ ] See first call booked (hopefully)

### Week 3
- [ ] Review your dashboard data
- [ ] Which content drives leads?
- [ ] Which leads book calls?
- [ ] Which calls convert to sales?
- [ ] Double down on what works

### Week 4
- [ ] Optimize based on data
- [ ] Kill what's not working
- [ ] Scale what is working
- [ ] Build post-purchase sequences
- [ ] Measure revenue per content piece

---

## Key Files (Customize These First)

```
config/offer.json          ← Your offer details (title, price, CTA link)
content/hero.md           ← Your headline + subheadline
content/benefits.md       ← 3-5 key benefits
content/testimonials.md   ← Social proof (video clips or quotes)
content/faq.md           ← 3-5 objections you hear + how you answer them
.env.local               ← Your GHL API keys (KEEP SECRET)
```

Everything else is pre-configured and ready to go.

---

## Common Questions

**Q: Can I use a different payment gateway?**  
A: Yes. Edit `/backend/payments` to integrate Stripe, PayPal, or whatever. See templates for examples.

**Q: Can I host this somewhere other than Vercel?**  
A: Yes. It's Next.js. Deploy to Netlify, Railway, Heroku, etc. Vercel is easiest for beginners.

**Q: Do I need to know how to code?**  
A: No. You're just editing JSON, markdown, and `.env`. If you want to customize components, basic React knowledge helps, but not required.

**Q: How do I track who actually bought something?**  
A: In GHL, manually tag them "paid-customer" after they pay. Or integrate Stripe webhooks to auto-tag them. See `docs/FULFILLMENT.md`.

**Q: What if I don't want geolocation?**  
A: Comment it out in `/components/form/geolocation.js`. Form still works without it.

**Q: Can I run this locally on my Mac?**  
A: Yes. Run `npm run dev`, open http://localhost:3000. Works great for testing before deploying.

---

## Your Support System

### Documentation (In This Repo)
- `docs/QUICK-START.md` — 5 min setup
- `docs/GHL-INTEGRATION.md` — Connect to GHL
- `docs/ATTRIBUTION.md` — Track what drives leads
- `docs/DASHBOARD.md` — See your metrics
- `docs/GEOLOCATION.md` — Auto-populate city/timezone
- `docs/FULFILLMENT.md` — What happens after the call

### Live Examples (In This Repo)
- `examples/mony-profile/` — Full working example (for reference)
- `examples/multiply-challenge/` — Upsell funnel (for reference)

### Getting Help
1. Check the docs first (likely answers there)
2. Check `/examples` for working code you can copy
3. Check Vercel logs: `vercel logs` (shows all errors)
4. Open an issue on GitHub

---

## Phase 2: Advanced (After 30 Days)

Once your basic funnel is working:

### Add Course Delivery
- Upload course videos to Vimeo or YouTube (private)
- Set up email sequence to drip out modules
- Track course completion

### Add High-Ticket Offer
- Create a $2K-$5K offer
- Sell in your welcome sequence
- Use GHL to segment buyers vs. non-buyers

### Scale to Multiple Offers
- Lead magnet funnel ($0 → email)
- Course funnel ($97)
- High-ticket funnel ($2K)
- Use tags to route different leads to different sequences

### Build Community
- Private Slack or Telegram for course students
- Monthly group call
- Referral bonus program

### Develop AI-Powered Features
- AI email follow-ups (generate based on contact history)
- Personalized course recommendations
- Chatbot on landing page for instant answers

---

## Remember: Your North Star

This system does ONE thing:
```
Content → Lead Magnet → Call Booking → Close Deal → Fulfilled Customer
```

Every optimization should move someone closer to buying from you.

- Shorts are awareness (top of funnel)
- Long-form is consideration (middle of funnel)
- Call is closing (bottom of funnel)

Your dashboard will show you which is working. Double down on that. Kill what isn't.

---

## Final Checklist Before You Launch

- [ ] Funnel deployed to Vercel
- [ ] GHL API key working (test form submission)
- [ ] Calendly link added to CTA
- [ ] Copy edited (your voice, not generic)
- [ ] Testimonials added (real social proof)
- [ ] Mobile tested (open on iPhone, tap-friendly?)
- [ ] GHL automations set up (at least welcome email)
- [ ] Telegram notifications working (you get notified when lead comes in)
- [ ] First 3 content pieces recorded (shorts or video ready to post)
- [ ] Attribution links ready (utm params in each link)

---

## Ship It

You have everything you need. The tools are there. The docs are there. The templates are there.

Now go make your first shorts. Post it. Get your first lead.

Then do it again. And again. And again.

That's the game.

**Questions? Check the docs. Building something cool? Share it.**

---

**Built by Sunny | Use freely, modify boldly, sell confidently**
