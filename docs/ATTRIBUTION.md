# Attribution: Track Which Content Drives Which Leads

Your shorts convert differently than your long-form videos. Your YouTube drives different leads than organic. You need to know which content actually moves the needle.

This guide shows you how to tag every lead with its source, so you can measure: which video made me $$$?

---

## The System

### Shorts
```
Shorts video ends → "Link in bio: [URL]"
   ↓
URL includes tag: mony.so/funnel?utm_source=shorts&utm_campaign=shorts-title&utm_medium=organic
   ↓
Form submits with source data
   ↓
Lead appears in GHL with tag: "source-shorts" + "campaign-shorts-title"
   ↓
Dashboard shows: "23 leads from shorts, 4 booked calls, 2 paid"
```

### Long-Form Video
```
Video description: "Book your call below"
   ↓
URL includes tag: mony.so/funnel?utm_source=youtube&utm_campaign=15-min-deep-dive&utm_medium=organic
   ↓
Form submits with source data
   ↓
Lead appears in GHL with tag: "source-youtube" + "campaign-15-min-deep-dive"
   ↓
Dashboard shows: "12 leads from long-form, 8 booked calls, 3 paid"
```

---

## Setting Up UTM Parameters

### What Are UTM Parameters?

They're just URL tags that follow you through the funnel:

```
mony.so/funnel
?utm_source=shorts        ← Where the lead came FROM (shorts, youtube, instagram, organic, google, linkedin, etc.)
&utm_campaign=shorts-title ← Specific content piece (shorts-headline-variation-a, video-title, blog-post-name)
&utm_medium=organic       ← Type of traffic (organic, paid, email, referral)
&utm_content=cta-button   ← Which element did they click? (optional)
```

### Structure for Todd (YouTube + Shorts)

**Shorts:**
- `utm_source=shorts`
- `utm_campaign=shorts-SHORTNAME` (e.g., `shorts-copywriting-secrets`)
- `utm_medium=organic`

**Long-Form:**
- `utm_source=youtube`
- `utm_campaign=VIDEO-TITLE-SHORT` (e.g., `15-min-deep-dive`)
- `utm_medium=organic`

**Paid Ads (Optional):**
- `utm_source=facebook` (or `google`, `tiktok`, etc.)
- `utm_campaign=AD-NAME` (e.g., `fb-adset-aug-2024`)
- `utm_medium=paid`

### Building URLs

**Manual (copy-paste):**
```
https://yourfunnel.vercel.app/?utm_source=shorts&utm_campaign=shorts-copywriting&utm_medium=organic
```

**Using a URL builder:**
- https://ga-dev-tools.web.app/campaign-url-builder/
- Fill in your domain, source, campaign, medium
- Copy the full URL
- Paste in your video description or Linktree

**Programmatic (in your funnel):**
```javascript
function generateAttributionUrl(source, campaign, medium = 'organic') {
  const params = new URLSearchParams({
    utm_source: source,
    utm_campaign: campaign,
    utm_medium: medium
  });
  return `https://yourfunnel.vercel.app/?${params.toString()}`;
}

// Usage
const shortsLink = generateAttributionUrl('shorts', 'shorts-copywriting');
// Result: https://yourfunnel.vercel.app/?utm_source=shorts&utm_campaign=shorts-copywriting&utm_medium=organic
```

---

## Capturing UTM Parameters in Your Funnel

### 1. Read UTM Params on Page Load

```javascript
// In your form or page component

import { useSearchParams } from 'next/navigation';

export function useAttribution() {
  const searchParams = useSearchParams();
  
  return {
    source: searchParams.get('utm_source') || 'direct',
    campaign: searchParams.get('utm_campaign') || 'unknown',
    medium: searchParams.get('utm_medium') || 'direct',
    content: searchParams.get('utm_content')
  };
}
```

### 2. Store in Form State

```javascript
const [formData, setFormData] = useState({
  firstName: '',
  email: '',
  // ... other fields
  utm_source: '',
  utm_campaign: '',
  utm_medium: ''
});

useEffect(() => {
  const attribution = useAttribution();
  setFormData(prev => ({
    ...prev,
    utm_source: attribution.source,
    utm_campaign: attribution.campaign,
    utm_medium: attribution.medium
  }));
}, []);
```

### 3. Send to GHL When Form Submits

```javascript
const handleFormSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch('/api/forms/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      // UTM data goes here
      utm_source: formData.utm_source,
      utm_campaign: formData.utm_campaign,
      utm_medium: formData.utm_medium
    })
  });

  // Handle response
};
```

### 4. GHL Auto-Tags the Lead

In your backend webhook handler (`/backend/ghl-webhook.js`):

```javascript
export async function sendToGHL(contactData) {
  const tags = [
    'from-landing-page',
    // Add attribution tags
    `source-${contactData.utm_source}`,
    `campaign-${contactData.utm_campaign}`,
    `medium-${contactData.utm_medium}`,
    // Additional tags
    contactData.email ? 'has-email' : 'no-email',
    contactData.phone ? 'has-phone' : 'no-phone'
  ].filter(Boolean);

  const payload = {
    firstName: contactData.firstName,
    lastName: contactData.lastName,
    email: contactData.email,
    phone: contactData.phone,
    city: contactData.city,
    tags: tags,
    customFields: {
      utm_source: contactData.utm_source,
      utm_campaign: contactData.utm_campaign,
      utm_medium: contactData.utm_medium,
      utm_content: contactData.utm_content
    }
  };

  const response = await fetch('https://api.gohighlevel.com/v1/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return response.json();
}
```

---

## Tracking Through the Funnel

### Step 1: Lead Opt-In (Tracked)
```
shorts video → click link → form submit → lead created in GHL with tag "source-shorts"
```

### Step 2: Lead Books Call (Tracked)
```
GHL automation fires when lead clicks Calendly link → tag added "call-booked" → lead scored higher
```

### Step 3: Call Happens (Semi-Tracked)
```
You book the call manually (or use Calendly automation) → You know they booked
→ Note: You'll manually track if call happened (or use call recording service)
```

### Step 4: Deal Closes (Manual Tracking)
```
In GHL, update lead status to "Closed - Won" or add tag "paid-customer"
→ Dashboard can then calculate: shorts → 23 leads → 4 calls booked → 2 paid = 8.7% close rate
```

---

## Dashboard View: Attribution Breakdown

Once set up, you'll see in your dashboard:

```
SOURCE PERFORMANCE
┌─────────────┬────────┬────────┬─────────┬──────────┐
│ Source      │ Leads  │ Calls  │ Paid    │ ROI      │
├─────────────┼────────┼────────┼─────────┼──────────┤
│ shorts      │ 127    │ 18     │ 8       │ 87%      │
│ youtube     │ 42     │ 15     │ 6       │ 112%     │
│ organic     │ 23     │ 4      │ 1       │ 34%      │
│ direct      │ 8      │ 1      │ 0       │ 0%       │
└─────────────┴────────┴────────┴─────────┴──────────┘

CAMPAIGN PERFORMANCE
┌────────────────────────┬────────┬────────┬───────┐
│ Campaign               │ Leads  │ Calls  │ Paid  │
├────────────────────────┼────────┼────────┼───────┤
│ shorts-copywriting     │ 45     │ 7      │ 4     │
│ shorts-sales-mistake   │ 38     │ 6      │ 2     │
│ 15-min-deep-dive       │ 28     │ 11     │ 5     │
│ how-to-raise-price     │ 14     │ 4      │ 1     │
└────────────────────────┴────────┴────────┴───────┘

CONVERSION FUNNEL BY SOURCE
shorts:    127 leads → 18 calls (14.2%) → 8 paid (5.1% final) → $776/lead acquisition cost
youtube:   42 leads → 15 calls (35.7%) → 6 paid (14.3% final) → $280/lead acquisition cost
organic:   23 leads → 4 calls (17.4%) → 1 paid (4.3% final) → $2,300/lead acquisition cost
```

From this, you immediately see:
- **Shorts** = high volume, lower conversion → good for brand awareness
- **YouTube** = lower volume, HIGH conversion → focus here for sales
- **Organic** = low volume, low conversion → probably not worth optimizing yet

---

## Implementation: Step-by-Step

### For Your Next Shorts Video (Today):

1. **Record your shorts** (as usual)
2. **Pick a campaign name:** `shorts-YOUR-HOOK`
3. **Generate URL:**
   ```
   https://yourfunnel.vercel.app/?utm_source=shorts&utm_campaign=shorts-copywriting&utm_medium=organic
   ```
4. **Shorten it** (use Linktree or bit.ly):
   ```
   Short link: mony.so/copywriting-shorts
   (points to the UTM URL above)
   ```
5. **Put in Linktree or video description:**
   ```
   "Want to charge your worth for your work? Link in bio: mony.so/copywriting-shorts"
   ```
6. **Record the campaign name somewhere** (spreadsheet or note):
   ```
   Date: 2024-08-15
   Video: Copywriting Hook
   Campaign: shorts-copywriting
   Link: mony.so/copywriting-shorts
   ```
7. **Wait 48 hours** → check dashboard for leads

### For Your Next YouTube Video (Today):

1. **Record your video** (as usual)
2. **Pick a campaign name:** `VIDEO-TITLE-SHORT` (e.g., `15-min-deep-dive`)
3. **Generate URL:**
   ```
   https://yourfunnel.vercel.app/?utm_source=youtube&utm_campaign=15-min-deep-dive&utm_medium=organic
   ```
4. **Shorten it** (same as shorts):
   ```
   mony.so/deep-dive
   ```
5. **Add to video description:**
   ```
   "In this video, I share my 3-step process to..."
   
   Book a free call to see if this works for your business:
   👉 [shortened URL]
   
   (The full URL with UTM params is hidden in the link)
   ```
6. **Record in spreadsheet:**
   ```
   Date: 2024-08-20
   Title: 15-Min Deep Dive on Pricing
   Campaign: 15-min-deep-dive
   Link: mony.so/deep-dive
   ```
7. **Wait 48 hours** → check dashboard

---

## Google Analytics Integration (Optional)

If you have Google Analytics set up on your funnel, UTM parameters auto-populate and you get free attribution:

1. Set up GA4 on your Vercel site (add tracking code to `<head>`)
2. Wait 24 hours for data to backfill
3. Go to GA4 → Reports → Traffic → Source/Medium
4. You'll see all your shorts, YouTube, organic traffic broken down

---

## Spreadsheet Tracking (Low-Tech)

If you want a simple alternative to dashboards:

Create a Google Sheet:

```
Date       | Source   | Campaign              | Leads | Calls | Paid | Notes
-----------|----------|----------------------|-------|-------|------|----------
2024-08-15 | shorts   | shorts-copywriting   | 12    | 2     | 1    | Hook worked
2024-08-20 | youtube  | 15-min-deep-dive     | 8     | 3     | 2    | Strong converter
2024-08-22 | organic  | blog-article         | 4     | 0     | 0    | Low priority
```

Each day:
1. Check GHL for leads with tag "source-shorts" (or YouTube, organic, etc.)
2. Count calls booked from those leads (tag: "call-booked")
3. Count deals closed (tag: "paid-customer")
4. Update spreadsheet

Takes 5 minutes/day, gives you the data you need.

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Typos in Campaign Names
```
shorts-copywriting (first video)
shorts-copywrting  (second video, typo)
→ Dashboard shows them as different campaigns
→ You can't compare performance
```

**Fix:** Use a naming convention and stick to it:
```
shorts-TOPIC-VARIATION
youtube-TITLE-SHORT
organic-SOURCE-TYPE
```

### ❌ Mistake 2: Forgetting UTM Params
```
You share the link in 10 shorts without UTM params
→ Leads come in but you don't know which shorts drove them
→ You can't optimize
```

**Fix:** Make it a habit—every link to your funnel gets UTM params.

### ❌ Mistake 3: UTM Params on Every Link (Over-Tracking)
```
Homepage → utm_source=shorts
Contact page → utm_source=youtube
Thank you page → utm_source=organic
→ Too much noise, data is unreliable
```

**Fix:** Only add UTM params to the **first entry point** (the link you share in content).

### ❌ Mistake 4: Not Closing the Loop
```
Lead comes in from shorts
Lead books call
→ But you never check if they actually bought
→ You measure leads, not revenue
```

**Fix:** Track all the way to payment. Tag them "paid-customer" in GHL, see the full funnel.

---

## Next Level: Revenue Attribution

Once you have lead-level attribution, you can calculate true ROI:

```
Shorts campaign: "copywriting"
- 45 leads
- 7 booked calls
- 4 buyers
- Revenue: 4 × $97 = $388

Cost per lead: $388 ÷ 45 = $8.62 per lead (organic, so actually free)
Lead-to-close rate: 4 ÷ 45 = 8.9%
Call-to-close rate: 4 ÷ 7 = 57%

Action: This shorts campaign is working. Double down.
```

Vs.

```
Blog article: "organic search"
- 23 leads
- 2 booked calls
- 0 buyers

Lead-to-close rate: 0 ÷ 23 = 0%
Action: Blog article needs work or readers aren't qualified. Investigate.
```

---

## Summary

1. **Add UTM params** to every link you share (shorts, YouTube, etc.)
2. **Your funnel captures them** and stores in form data
3. **GHL auto-tags leads** with their source + campaign
4. **Dashboard shows the breakdown** of which content drives which leads
5. **You measure what matters:** shorts 8.9% close rate vs. YouTube 14.3% close rate
6. **You optimize:** Keep doing shorts (high volume), optimize YouTube (high conversion)

**That's attribution. That's how you know which content makes you money.**

See `docs/DASHBOARD.md` to build the dashboard that visualizes all this data.
