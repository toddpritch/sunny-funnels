# Landing Page Template

Production-ready landing page with form opt-in, GHL integration, and geolocation support.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Configuration

Edit `config/offer.json`:
- `title`: Your offer headline
- `price`: Price (or free)
- `ghlWebhookUrl`: Your GHL API endpoint
- `ghlApiKey`: Your GHL API key

## File Structure

```
├── pages/
│   ├── index.jsx          (Main landing page)
│   ├── api/
│   │   └── forms/
│   │       └── submit.js  (Form submission handler → GHL)
│   └── dashboard.jsx      (Analytics dashboard - optional)
├── components/
│   ├── form/
│   │   ├── OptInForm.jsx
│   │   ├── geolocation.js
│   │   └── validation.js
│   ├── Hero.jsx
│   ├── Benefits.jsx
│   ├── Testimonials.jsx
│   └── FAQ.jsx
├── content/
│   ├── hero.md
│   ├── benefits.md
│   ├── testimonials.md
│   └── faq.md
├── config/
│   └── offer.json
└── styles/
    └── globals.css
```

## Deployment

### To Vercel

```bash
vercel deploy
```

### Environment Variables

Create `.env.local`:

```
GHL_API_KEY=your_ghl_api_key
NEXT_PUBLIC_GHL_WEBHOOK_URL=https://api.gohighlevel.com/v1/contacts
GEOLOCATION_API_KEY=your_geoip_key (optional)
NEXT_PUBLIC_OFFER_PRICE=97
NEXT_PUBLIC_OFFER_TITLE=Your Offer
```

## Features

- ✅ Responsive design (mobile-first)
- ✅ Form validation
- ✅ GHL webhook integration
- ✅ Geolocation auto-population (optional)
- ✅ Google Analytics ready
- ✅ Calendly embed
- ✅ Testimonial sections
- ✅ FAQ accordion

## Customization

### Change Colors

Edit `styles/globals.css`:
- `--primary`: Main brand color
- `--secondary`: Accent color
- `--background`: Page background

### Change Copy

Edit files in `/content`:
- `hero.md` — headline, subheadline, CTA
- `benefits.md` — list of benefits
- `testimonials.md` — social proof
- `faq.md` — objection handlers

### Add/Remove Sections

In `pages/index.jsx`:
```jsx
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

// Add or remove components as needed
```

## Testing

### Form Submission

1. Open http://localhost:3000
2. Fill out form
3. Check console for errors
4. Check GHL to see if lead was created

### Geolocation

Open in incognito, you should see city pre-filled.

### Mobile

```bash
# Toggle device mode in DevTools (F12 → Cmd+Shift+M)
# Or open on your phone
```

## Troubleshooting

### Form not submitting?
- Check GHL_API_KEY in .env.local
- Check GHL has Contacts:Create permission
- Check browser console for errors

### GHL lead not appearing?
- Wait 5 seconds after form submit
- Check GHL_LOCATION_ID is correct
- Check Vercel logs: `vercel logs`

### Geolocation not working?
- Geolocation API requires https (works on Vercel, localhost with chrome flags)
- User must grant permission
- Check GEOLOCATION_API_KEY is valid

## Next Steps

1. Deploy to Vercel
2. Test form submission
3. Connect Google Analytics
4. Add Calendly link to CTA
5. Connect GHL automations
6. Build dashboard
7. Launch with content (shorts, long-form videos)

See `/docs` in parent folder for full guides.
