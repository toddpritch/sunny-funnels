# GHL Integration: Connect Your Funnel to Your CRM

When someone fills out your form, their data automatically flows into GHL. From there, your automations handle email sequences, SMS follow-ups, calendar reminders, Telegram notifications—everything.

---

## Setup (5 minutes)

### 1. Get Your GHL API Key

1. Log in to GHL dashboard
2. Go to **Settings** → **Integrations** → **API Keys**
3. Click **Create New API Key**
4. Name it: "Funnels Webhook"
5. Give it these permissions:
   - ✅ `Contacts:Create`
   - ✅ `Contacts:Read`
   - ✅ `Contacts:Update`
   - ✅ `Tags:Read`
   - ✅ `Tags:Create`
6. Copy the key

### 2. Add to Your Template

Create `.env.local` in your template folder:

```
GHL_API_KEY=your_api_key_here
NEXT_PUBLIC_GHL_WEBHOOK_URL=https://api.gohighlevel.com/v1/contacts
GHL_LOCATION_ID=your_location_id_here
```

To find your Location ID:
1. In GHL, go to any contact page
2. Copy the URL: `https://app.gohighlevel.com/contacts/...?locationId=abc123`
3. The `locationId` is what you need

### 3. Test the Connection

1. Deploy: `vercel deploy`
2. Open your live funnel URL
3. Fill out the form
4. Wait 5 seconds
5. Go to GHL → Contacts
6. You should see the lead

If it's not working, see **Troubleshooting** below.

---

## What Gets Synced

When your form is submitted:

```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890",        // if included in your form
  city: "San Francisco",       // if geolocation enabled
  source: "shorts",            // if utm_source in URL
  campaignName: "video-title", // if utm_campaign in URL
  tags: ["from-landing-page"]
}
```

All fields are optional. Send what you collect.

---

## Auto-Tagging Leads

Add tags automatically based on form data:

```javascript
// In /backend/ghl-webhook.js

const tags = [
  "from-landing-page",
  `source-${urlParams.utm_source || 'direct'}`, // source-shorts, source-youtube, etc.
  visitor.city ? `city-${visitor.city}` : null,
  "needs-follow-up"
].filter(Boolean);

// Send to GHL with tags
```

Then in GHL, create automations that trigger on these tags:

- **Tag: "source-shorts"** → Add to "Shorts Leads" segment → Email nurture sequence
- **Tag: "source-youtube"** → Add to "Long-Form Leads" segment → SMS + email
- **Tag: "needs-follow-up"** → SMS: "Hey John, did you see our offer?"

---

## Building Automations

### Automation 1: Welcome Email (runs immediately)

1. In GHL, go to Automations
2. Click **Create New**
3. Trigger: **Contact Created** (or **Contact Tag Added** → "from-landing-page")
4. Action 1: **Send Email** → "Welcome to [Your Offer]"
5. Action 2 (optional): **Send SMS** → "Check your email for the link"
6. Action 3: **Add to Workflow** → "Nurture Sequence"
7. Save & publish

### Automation 2: Lead Scoring (optional)

- Tag **"engaged"** when they click email link
- Tag **"high-intent"** when they submit a second form (booking calendar, etc.)
- Create **workflow** for high-intent leads → SMS: "Let's talk about your [goal]"

### Automation 3: Unresponsive Leads (Day 7 follow-up)

- Trigger: 7 days since **Contact Created**
- Condition: Contact does NOT have tag "call-booked"
- Action: Send SMS → "Last chance: does this still interest you?"

---

## Webhook Testing

### Local Testing

To test the webhook locally before deploying:

```bash
# Terminal 1: Start your local server
npm run dev

# Terminal 2: Send a test form submission
curl -X POST http://localhost:3000/api/forms/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "email": "test@example.com",
    "city": "San Francisco"
  }'
```

Check your terminal logs for the webhook response.

### Production Testing

1. Fill out your live form
2. Open GHL → Contacts, sort by **Created Date** (most recent first)
3. You should see the lead appear within 5 seconds
4. Click the contact → check that all fields populated correctly

---

## Troubleshooting

### Form Submits But Lead Doesn't Appear in GHL

**Problem:** Webhook is failing silently.

**Solution:**
1. Check `.env.local` has correct `GHL_API_KEY` and `GHL_LOCATION_ID`
2. Check GHL API key has `Contacts:Create` permission
3. Check Vercel logs: `vercel logs` (in your terminal)
4. Look for webhook error response in logs
5. If 403 Forbidden → API key doesn't have permission. Generate new one.
6. If 404 Not Found → Location ID is wrong. Check GHL URL again.

### Some Fields Empty in GHL

**Problem:** Name, city, or phone didn't sync.

**Solution:**
1. Check that your form actually collects those fields
2. In your form component, make sure the field name matches what the webhook expects
3. Optional fields can be empty—that's fine, don't force them
4. If a required field is empty, the entire submission will fail (check Vercel logs)

### Too Many/Wrong Leads Syncing

**Problem:** You're getting bot traffic or test submissions in GHL.

**Solution:**
1. Add form validation (email regex, phone format)
2. Add reCAPTCHA to form (prevent bots)
3. Add rate limiting (1 submission per IP per 5 minutes)

See `/components/form/rate-limit.js` for example.

### Automations Not Triggering

**Problem:** Lead came in but email didn't send.

**Solution:**
1. Check the automation is **Published** (not Draft)
2. Check trigger matches (e.g., "Contact Created" vs "Tag Added")
3. Check conditions (if you have any)
4. Check the email is properly configured (subject line, from address)
5. In GHL, go to Automations → click your automation → view execution logs

---

## Advanced: Multiple Forms, One Funnel

If your page has multiple CTAs (free lead magnet form, paid course form, high-ticket call form):

```javascript
// In each form's submit handler, add a source identifier:

await submitForm({
  ...formData,
  source: "free-lead-magnet", // or "paid-course", "high-ticket", etc.
  tags: ["from-landing-page", `cta-${source}`]
});
```

Then in GHL automations:
- Tag: **"cta-free-lead-magnet"** → Email nurture
- Tag: **"cta-paid-course"** → Email receipt + course access
- Tag: **"cta-high-ticket"** → SMS: "Let's schedule your call"

---

## Advanced: Custom Field Mapping

If your GHL has custom fields (e.g., "Preferred Timezone", "Lead Temperature"), you can map form fields to them:

```javascript
// In /backend/ghl-webhook.js

const fieldMap = {
  timezone: "customField_123", // Get ID from GHL
  leadTemperature: "customField_456",
  referralSource: "customField_789"
};

const customFields = {};
Object.entries(fieldMap).forEach(([key, ghlId]) => {
  if (formData[key]) {
    customFields[ghlId] = formData[key];
  }
});

// Send to GHL with custom fields
```

---

## Monitoring: What to Watch

### Daily
- How many leads came in?
- From which source? (utm_source breakdown)
- Which emails got opened?
- Which leads booked calls?

### Weekly
- Conversion rate: leads → calls booked
- Cost per lead (if running paid ads)
- Cost per call booked (leads ÷ booking rate ÷ ad spend)
- Which video/content drove the most leads?

### Monthly
- Lifetime value of leads from each source
- Which source produces the best buyers?
- Automations: are they triggering correctly?
- Unsubscribe rate (if rising, your email sequence is wrong)

---

## Next Steps

1. **Set up welcome email** → fires when lead submits form
2. **Set up call booking automation** → when they click Calendly link
3. **Set up SMS sequence** → 3 texts over 7 days if they don't respond
4. **Monitor dashboard** → see leads flowing in by source
5. **Optimize copy** → test different CTAs, measure which gets more bookings

See `docs/DASHBOARD.md` to track all this data in one place.

**Your funnel is now connected to your CRM. Leads flow in. Automations flow out. You close deals.**
