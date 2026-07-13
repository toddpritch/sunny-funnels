# Geolocation: Auto-Populate City & Timezone

When visitors land on your page, auto-detect their city, state, and timezone. Pre-fill form fields. Use timezone to schedule calls at their local time. Improve conversion by showing they're in the right place.

---

## Why This Matters

**Frictionless Entry:** Instead of "Select your city", they see their city pre-filled. Less thinking, more submitting.

**Timezone Accuracy:** Calendly auto-fills their timezone. They book a call without realizing you just made scheduling frictionless.

**Personalization:** "We've helped 47 founders in San Francisco like you..." → specific to their location.

---

## Setup (10 minutes)

### Option 1: Browser Geolocation API (Free, Privacy-Respecting)

Uses the visitor's browser to detect location (they can decline).

**Pros:**
- Free
- No API key needed
- Respects user privacy
- Accurate to ~1km

**Cons:**
- User must grant permission
- Doesn't work on HTTP (needs HTTPS)
- VPN breaks it

**Setup:**

```javascript
// In /components/form/geolocation.js

import { useEffect, useState } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState({ city: '', state: '', timezone: '' });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode: coordinates → city/state
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          setLocation({
            city: data.address.city || data.address.town || '',
            state: data.address.state || '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          });
        },
        (error) => {
          console.log('Geolocation denied or unavailable');
          // Fallback: ask them manually
        }
      );
    }
  }, []);

  return location;
}
```

Then in your form:

```jsx
<input 
  name="city"
  placeholder="Your city"
  defaultValue={location.city}
  onChange={(e) => setFormData({...formData, city: e.target.value})}
/>
```

### Option 2: IP Geolocation API (Recommended for Production)

Detect location based on visitor's IP address. No permission needed. Works everywhere.

**Pros:**
- No permission needed
- Works on HTTP + HTTPS
- Works with VPNs (usually)
- Fast, reliable

**Cons:**
- Requires API key ($0-20/month)
- Less accurate (~5km city level, but good enough)

**Free options:**
- `https://geoip-db.com` — 30k/month free
- `https://ip-api.com` — 45/min free
- `https://ipapi.co` — 30k/month free

**Setup with geoip-db:**

```bash
# Get free API key at https://geoip-db.com
# Add to .env.local
NEXT_PUBLIC_GEOLOCATION_API_KEY=your_api_key
```

```javascript
// In /components/form/geolocation.js

export async function detectLocationFromIP(apiKey) {
  try {
    const response = await fetch(
      `https://geoip-db.com/api/v1/geoip?apikey=${apiKey}`
    );
    const data = await response.json();
    
    return {
      city: data.city || '',
      state: data.state || '',
      country: data.country_name || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  } catch (error) {
    console.error('Geolocation API error:', error);
    return { city: '', state: '', country: '', timezone: '' };
  }
}
```

Then on page load:

```jsx
useEffect(() => {
  const location = await detectLocationFromIP(
    process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY
  );
  setFormData(prev => ({...prev, ...location}));
}, []);
```

---

## Timezone Detection (No API Needed)

```javascript
// Get visitor's timezone automatically from their browser

function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Returns: "America/Los_Angeles", "Europe/London", etc.
}

// Use for Calendly auto-fill
```

Then pass to Calendly:

```javascript
const calendlyUrl = `https://calendly.com/${yourCalendlyUsername}?text_color=003a82&primary_color=00a86b`;
// Calendly auto-detects timezone from visitor's browser
```

---

## Using Location Data in Your Funnel

### 1. Pre-Fill Form Fields

```jsx
<input name="city" defaultValue={location.city} />
<input name="state" defaultValue={location.state} />
<input name="timezone" defaultValue={location.timezone} type="hidden" />
```

### 2. Personalized Copy

```jsx
{location.city && (
  <p>Join 47 founders in {location.city} who have transformed their {industry}</p>
)}
```

### 3. Local Social Proof

```jsx
{location.city && (
  <div className="testimonial">
    <p>"This changed my business." — Sarah, {location.city}</p>
  </div>
)}
```

### 4. Timezone-Aware Calendar Scheduling

```javascript
// When passing to Calendly, timezone is auto-detected
// But you can also pre-fill it:

const timezoneMapped = {
  'America/Los_Angeles': 'PT',
  'America/Denver': 'MT',
  'America/Chicago': 'CT',
  'America/New_York': 'ET'
};

const urlParams = new URLSearchParams({
  hide_landing_page_details: true,
  hide_event_type_details: false
});

const calendlyUrl = `https://calendly.com/${username}?${urlParams.toString()}`;
```

---

## Privacy & Compliance

### GDPR Compliance

If you're in EU or have EU visitors:

1. **Show a notice:** "We'll detect your location to improve your experience. [Learn more]"
2. **Ask permission:** "Allow location access? Yes / No"
3. **Respect their choice:** If they decline, don't pester them
4. **Allow manual entry:** Even with geolocation, let them change city/timezone

### Data Storage

**DON'T:** Store location data in your database if you don't have permission.

**DO:** 
- Only use it to pre-fill the form (doesn't require storage)
- If storing, follow GDPR (include in privacy policy, allow deletion)
- If using IP geolocation, you're not storing personal data (IPs are anonymized)

### California (CCPA) & Others

- Disclose: "We use geolocation to personalize your experience"
- Allow opt-out: They can disable it in form settings
- No sale of location data

### Implementation Example:

```jsx
function GeolocationNotice() {
  const [accepted, setAccepted] = useState(false);

  if (accepted) {
    return <LocationForm />;
  }

  return (
    <div className="notice">
      <p>We'll detect your location to personalize your experience.</p>
      <button onClick={() => setAccepted(true)}>Allow</button>
      <button onClick={() => setAccepted(false)}>Decline</button>
    </div>
  );
}
```

---

## Fallback (If Geolocation Fails)

If the API is down, VPN blocks it, or user declines:

```javascript
const getLocation = async () => {
  try {
    // Try IP geolocation first
    const location = await detectLocationFromIP(apiKey);
    if (location.city) return location;
  } catch (e) {}

  try {
    // Fall back to browser geolocation
    const location = await browserGeolocation();
    if (location.city) return location;
  } catch (e) {}

  // Last resort: ask manually
  return { city: '', state: '', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone };
};
```

---

## Testing

### Test 1: Local Browser (Before Deploying)

```bash
npm run dev
open http://localhost:3000

# Check DevTools → Console
# Should see: { city: "San Francisco", state: "CA", timezone: "America/Los_Angeles" }
```

### Test 2: Production (After Deploying)

1. Open your Vercel URL on your phone (different location or city than you)
2. Open DevTools → Console
3. Check that city is correct
4. Open in incognito (clear cache)
5. Refresh—should still detect location

### Test 3: Incognito + Different VPN

```bash
# Test with VPN enabled (geolocation might be less accurate)
# Test with incognito (no cookies, fresh session)
# Form should still populate with detected location
```

### Test 4: Form Submission

1. Let geolocation detect your city
2. Submit form
3. Check GHL: city field should be populated
4. Check Vercel logs: geolocation data should appear

---

## Optimization: Caching Location

If many visitors come from the same regions, cache the location data:

```javascript
// In browser localStorage (1 hour TTL)

const getCachedLocation = () => {
  const cached = localStorage.getItem('userLocation');
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < 3600000) { // 1 hour
      return data;
    }
  }
  return null;
};

const setLocationCache = (location) => {
  localStorage.setItem('userLocation', JSON.stringify({
    data: location,
    timestamp: Date.now()
  }));
};
```

This saves API calls, speeds up page load, and respects user privacy (data stays local).

---

## What This Powers

Once geolocation is working, you can:

1. **Segment leads by region** → See which cities convert best
2. **Personalize follow-up emails** → "Hi John, we've helped 23 founders in SF..."
3. **Schedule timezone-aware calls** → No confusion about PST vs EST
4. **Route to local affiliates** → If you have local partners in their region
5. **Dynamic pricing** → Show price in their currency (USD, EUR, GBP)

See `docs/DASHBOARD.md` for how to track leads by city/timezone.

---

## Common Issues

### Geolocation Detected But Form Not Pre-Filling

**Check:**
- Is `defaultValue` set on the input? (Use `defaultValue`, not `value` for uncontrolled components)
- Is location state updating before form renders? (Use `useEffect` + dependency array)
- Is the input clearing on parent component re-render?

### Accuracy Off (Wrong City)

**Possible causes:**
- VPN active (masks real location)
- IP database outdated (try different provider)
- User is mobile (location might lag a few seconds)

**Solution:** Always allow manual override:

```jsx
<input 
  name="city" 
  defaultValue={location.city}
  placeholder="Your city (or enter manually)"
/>
```

### API Rate Limit Hit

**If using IP geolocation:**
- Check if you've exceeded free tier
- Upgrade to paid ($5-20/month)
- Or switch to browser Geolocation API (free, but needs permission)

---

## Recommended: Hybrid Approach

1. Use IP geolocation on page load (no permission needed, instant)
2. Offer browser geolocation as option (more accurate, requires permission)
3. Always allow manual entry (fallback)

```javascript
async function detectLocation() {
  // 1. Try IP first (instant, no permission needed)
  const ipLocation = await detectLocationFromIP(apiKey);
  if (ipLocation.city) {
    setLocation(ipLocation);
    return;
  }

  // 2. Fall back to browser geolocation (ask for permission)
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const browserLocation = await reverseGeocode(position.coords);
        setLocation(browserLocation);
      },
      () => {
        // User declined or error
        // Show manual entry form
      }
    );
  }
}
```

**Result:** ~80% of visitors see their city pre-filled automatically. The rest enter it manually (still better than nothing).
