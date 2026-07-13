# Fulfillment: What Happens After the Call is Booked

A lead opts in. They book a call. The call happens. Then what?

This doc outlines what happens next: confirmations, course access, payment collection, follow-ups, and how to track it all through to a closed deal.

---

## The Post-Call Journey

```
Call Booked ✓
    ↓
24 hours before: Reminder email + SMS from GHL
    ↓
Call Happens ✓ (You handle this)
    ↓
Call Ends → You update CRM with outcome
    ↓
If "interested": Send course link + payment link → GHL automation
If "not interested": Tag "not-qualified" → nurture sequence 2.0
If "objection": Send specific objection handler
    ↓
Payment made → Telegram notification to you + course access email
    ↓
Course/Onboarding begins
    ↓
30 days later: Check-in → upsell or nurture
```

---

## Automation 1: Call Reminder (24 Hours Before)

**Trigger:** Lead has tag "call-booked" AND scheduled call is in 24 hours

**In GHL:**
1. Create Automation
2. Trigger: **Workflow Trigger** → "Call is scheduled 24 hours from now"
3. Actions:
   - **Send Email:** "Reminder: Your call with [Your Name] is tomorrow at [TIME]"
   - **Send SMS:** "Quick reminder: we're talking tomorrow at [TIME]. See you then!"
   - (Optional) **Delay 30 min** → Send SMS: "Link: [Calendly link] if you need to reschedule"

---

## Automation 2: Post-Call Follow-Up (Based on Call Outcome)

**Scenario 1: You Talked → They're Interested**

After the call, you manually update the contact in GHL with a custom field or tag: "Outcome: Interested" or add tag "ready-to-buy"

```
GHL Automation:
├─ Trigger: Tag Added → "ready-to-buy"
├─ Delay: 15 minutes (give them time to think)
├─ Send Email: "Here's the course we discussed..."
├─ Attach: Course access link + Payment link
├─ SMS: "Check your email for the next step 👇"
├─ Delay: 2 days
├─ If payment made: Tag "paid-customer" + send course onboarding email
├─ If payment NOT made: Send SMS: "Still thinking about it? Happy to answer questions."
└─ Delay: 3 days → "Last chance" email with limited-time offer
```

**Scenario 2: You Talked → They Need Time (Objection)**

Tag: "objection-price" OR "objection-timing" OR "objection-unsure"

```
GHL Automation:
├─ Trigger: Tag Added → "objection-price"
├─ Send Email: "I understand cost is a factor. Here's why it works..."
│  (Include: ROI calculator, payment plan option, testimonial from similar client)
├─ Delay: 7 days
├─ Send SMS: "Quick follow-up: any questions about the investment?"
├─ Delay: 7 days
├─ Send Email: "Last spot available this month. Can we make this work?"
└─ If still no response: Tag "cold-lead" → put in quarterly re-engagement sequence
```

**Scenario 3: You Talked → Not Interested**

Tag: "not-interested-now" OR "wrong-fit"

```
GHL Automation:
├─ Trigger: Tag Added → "not-interested-now"
├─ Send Email: "No problem! If things change, here's a resource..."
│  (Include: free guide, discount code for future, referral bonus)
├─ Add to Workflow: "Quarterly Re-engagement" (reach out every 90 days)
└─ Status: "Not Qualified" (so you don't waste time)
```

---

## Sending Course Access & Payment Links

After someone books a call or indicates interest, send them both links:

### Option 1: Gated Course (Paid)
```
Email body:
---
Hi John,

Here's what we discussed on the call:

1. Your 3-step framework to [outcome] 
2. Common mistakes that keep [audience] stuck
3. My exact funnel that converts [metric]

**Get instant access** (one-time $97 payment)
→ [PAYMENT LINK]

After payment, you'll get:
- Lifetime access to all 5 modules
- Private community access
- Email support for 30 days

→ [PAYMENT LINK]

Talk soon,
[Your Name]
---
```

### Option 2: Free Lead Magnet (Then Upsell)
```
Email body:
---
Hi John,

Here's the free guide we talked about:
→ [FREE GUIDE LINK]

This covers the first 2 steps. Once you've done those, 
we have a paid course that covers the money-making step 3 ($97).

Grab the free guide first, then we can talk about the paid course if you want.

→ [FREE GUIDE LINK]

Talk soon,
[Your Name]
---
```

### Creating Payment & Access Links

**Payment (Stripe/Whop):**
```
https://payment.example.com/checkout?course_id=copywriting&customer_email=john@example.com
```

**Course Access (Teachable/Thinkific/Custom):**
```
https://courses.example.com/access?token=xxxxx&course=copywriting
```

Or simpler: Use Whop to handle both payment + access automatically.

---

## Telegram Notifications (For You)

When a lead books a call or makes a payment, get instant Telegram notification:

### Setup: Telegram Bot

1. Go to Telegram → search "@BotFather"
2. /newbot → name your bot → get a token
3. Add your bot to your personal Telegram
4. Send it a message: "test"
5. Go to: `https://api.telegram.org/botYOUR_TOKEN/getUpdates`
6. Copy your chat ID (the long number in "id" field)

### In Your Funnel

```javascript
// When lead books call or makes payment

const sendTelegramNotification = async (message) => {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    })
  });
};

// When call booked
sendTelegramNotification(`
🚀 NEW CALL BOOKED
Name: John Doe
Email: john@example.com
City: San Francisco
Time: Tomorrow 2 PM PT
Source: shorts-copywriting
`);

// When payment received
sendTelegramNotification(`
💰 PAYMENT RECEIVED
Name: Sarah Smith
Email: sarah@example.com
Course: Copywriting
Amount: $97
Total this month: $485
`);
```

---

## Email Sequences: Post-Purchase

Once someone pays, trigger this sequence:

### Email 1: Payment Confirmation + Access
```
Subject: Your access is ready! 🚀

Hi John,

Thanks for your purchase! Here's everything you need:

1. **Your login:** [username], password sent separately
2. **Course link:** [https://courses.example.com/copywriting]
3. **Getting started:** Start with Module 1: "The 3-Step Framework"
4. **Need help?** Reply to this email or ping me on Slack

You're gonna crush this.

– [Your Name]
```

### Email 2: Welcome + First Module (Day 1)
```
Subject: Module 1 unlocked: Let's dive in 📚

Hi John,

Module 1 is now live: "The 3-Step Framework"

This module covers:
- Why most people get this wrong (& how to fix it)
- Your exact 3-step process
- Real examples from my own business

**Watch Module 1 now:** [link]
Time: ~15 minutes

Don't skip the homework at the end. That's where the magic happens.

– [Your Name]
```

### Email 3: Module 1 Homework Reminder (Day 3)
```
Subject: Did you do the Module 1 homework?

Hi John,

Some students told me they got stuck on the homework from Module 1.

Quick question: Have you done it yet?

If yes → great! Module 2 unlocks tomorrow.
If no → hit reply, tell me what's blocking you. I'll help.

– [Your Name]
```

### Email 4: Module 2 Unlocks (Day 4)
```
Subject: Module 2 is live (and it's the money-maker) 💰

Hi John,

Module 1 down! Now for the good stuff.

Module 2: "The Money-Making Step"

This is where most courses get fuzzy. We're gonna be specific:
- How to price this (show your profit margin)
- How to sell it (copy + funnel)
- Real numbers from real students

**Watch Module 2 now:** [link]
Time: ~20 minutes

This one has a workbook. Fill it out. It's where you make money.

– [Your Name]
```

### Email 5: Mid-Course Check-In (Day 7)
```
Subject: How's it going? What's next?

Hi John,

A week in! How's the course treating you?

Quick poll:
- [ ] Completed all modules
- [ ] Doing the homework but slow
- [ ] Stuck on something specific
- [ ] Haven't started (no judgment, hit reply if you need help)

Hit reply + let me know. I read every response.

– [Your Name]
```

### Email 6: Bonus Module Unlock (Day 10)
```
Subject: Bonus: How to scale this to $10K/month

Hi John,

You've made it through all 5 core modules. Nice work.

Here's a bonus (10-minute) training most people don't see:
"How to scale this system to $10K/month"

This is the next level.

**Watch bonus module:** [link]

– [Your Name]
```

### Email 7: Upsell (Day 14)
```
Subject: Ready for the next level?

Hi John,

If you've finished the course + done the homework, you're probably seeing results.

Some students ask: "What's next?"

We have a 1-on-1 program ($2,000, 3 months) where we build your entire system for you.

Not for everyone. But if you want to go faster, it's there.

→ Let's schedule a quick call to see if it's a fit.

Book here: [Calendly link]

– [Your Name]
```

### Email 8: Final Follow-Up (Day 30)
```
Subject: Your 30-day guarantee expires today

Hi John,

You have 24 hours left on your 30-day money-back guarantee.

No questions asked if you want a refund. Just hit reply.

But here's what I'm guessing happened:
- You finished the course ✓
- You did the homework ✓
- You started seeing results ✓

So I don't think you want a refund. I think you're just getting started.

Next step? The 1-on-1 program or our community Slack.

Either way, you're in the right place.

– [Your Name]
```

---

## Tracking: Full Funnel

To measure everything end-to-end, tag your leads as they progress:

```
new-lead
  ↓
call-booked → (GHL Automation adds this when Calendly books)
  ↓
call-completed → (You manually add this after the call)
  ↓
course-purchased → (GHL Automation adds when payment confirmed)
  ↓
course-started → (You add manually or hook to LMS)
  ↓
course-completed → (LMS sends webhook when student finishes)
  ↓
upsell-offered → (GHL Automation after 14 days)
  ↓
upsell-purchased → (You add when high-ticket customer signs)
```

Then in your dashboard, you see:

```
100 leads → 15 calls (15%) → 8 paid courses (8%) → 2 high-ticket customers (2%)
```

---

## Refunds & Unhappy Customers

**Set a clear refund policy:**

```
30-Day Money-Back Guarantee

If the course doesn't deliver what it promises, 
email us within 30 days and we'll refund every penny.

No questions asked.
```

**When someone requests a refund:**

1. Respond within 24 hours (shows you care)
2. Ask why (feedback, not confrontational)
3. If they say "not for me" → refund it, no push-back
4. If they say "too hard" → send them an email with common mistakes + how to fix
5. If they still want refund → give it
6. Tag them "refunded" + remove "course-access"
7. Send final email: "Happy to chat if things change. Door's always open."

**In GHL:**
- Tag: "refunded"
- Status: "Not Qualified"
- Add to workflow: "Re-engagement (yearly)"

**On your P&L:** Track refund rate. If it's >15%, your course might have an issue. Fix it.

---

## Attribution + Fulfillment Loop

Connect attribution to fulfillment:

```
Lead comes in from "shorts-copywriting"
  ↓
(GHL tags: source-shorts, campaign-shorts-copywriting)
  ↓
Books call, goes through course, pays
  ↓
Dashboard shows:
  "shorts-copywriting" campaign
  - 45 leads
  - 7 calls booked
  - 4 paid courses
  - Revenue: 4 × $97 = $388
  - ROI: Infinite (organic traffic)
  
Action: Double down on this type of shorts
```

Vs.

```
Lead comes in from "youtube-long-form"
  ↓
(GHL tags: source-youtube, campaign-long-form-video)
  ↓
Books call, gets objection, doesn't buy course yet
  ↓
Objection sequence fires, 2 weeks later pays
  ↓
Dashboard shows:
  "long-form-video" campaign
  - 23 leads
  - 18 calls booked (78% call rate!)
  - 6 paid courses (26% conversion!)
  - Revenue: 6 × $97 = $582
  - ROI: Infinite (organic traffic)
  
Action: YouTube is your best converter. Invest more here.
```

---

## Checking In: 30-Day Review

**Once a month, ask yourself:**

1. How many leads came in? (Goal: X per week)
2. How many calls booked? (Goal: X% conversion)
3. How many paid? (Goal: X% of callers)
4. Which source drove the most revenue? (shorts? youtube? organic?)
5. What's breaking? (Automation not firing? Forms not validating? Payment not working?)

**Update your offer ladder:**

```
Month 1: Free lead magnet → $97 course → $2K high-ticket
Month 2 (if $97 worked well): $27 mini-course → $97 full course → $2K high-ticket
Month 3 (if $97 didn't work): $97 course → $3K group program → $10K VIP
```

---

## Summary: Fulfillment Checklist

- [ ] GHL Automations set up (reminders, follow-ups, objection handlers)
- [ ] Course access + payment links created
- [ ] Telegram notifications for calls booked + payments
- [ ] Email sequence created (7+ emails, Day 1 → Day 30)
- [ ] Refund policy documented
- [ ] Tags in place to track funnel progress
- [ ] Dashboard shows full funnel (leads → calls → paid → completed)
- [ ] 30-day review scheduled
- [ ] Monthly optimization plan in place

**Once this is done, you've got a closed loop. Leads flow in, get nurtured, pay you, get the course, and you know exactly which content made you money.**

See `docs/DASHBOARD.md` to build the dashboard that visualizes this entire journey.
