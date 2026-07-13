# Dashboard: Real-Time Analytics & Lead Tracking

Once your funnel is live and leads are flowing in, you need to see it all in one place:
- How many leads today? This week? This month?
- Which source drives the most conversions?
- How many calls booked? How many paid?
- What's your conversion rate from lead to customer?

This is your dashboard.

---

## What Your Dashboard Shows

```
REAL-TIME STATS (Top of Dashboard)
┌──────────────────────────────────────────────────────────────┐
│ Leads This Month: 127  │  Calls Booked: 18  │  Revenue: $1,746 │
│ Conversion: 14.2%      │  Call-to-Close: 56%                   │
└──────────────────────────────────────────────────────────────┘

BY SOURCE (What's driving your business?)
┌─────────────┬────────┬─────────┬────────┬──────────┐
│ Source      │ Leads  │ Calls % │ Paid % │ Revenue  │
├─────────────┼────────┼─────────┼────────┼──────────┤
│ shorts      │ 87     │ 14.9%   │ 8.0%   │ $1,113   │
│ youtube     │ 28     │ 32.1%   │ 14.3%  │ $485     │
│ organic     │ 12     │ 8.3%    │ 0%     │ $0       │
└─────────────┴────────┴─────────┴────────┴──────────┘

CONVERSION FUNNEL (Leads → Customers)
Leads (127) → Calls (18, 14.2%) → Paid (10, 7.9% of leads, 55.6% of calls)

TIME SERIES (Trends over 30 days)
Leads:     ↗ (trending up, +12% vs last week)
Calls:     ↗ (14 this week, up from 8 last week)
Revenue:   ↘ (slightly down, 1 fewer close this week)
```

---

## Setup: Connecting Data Sources

Your dashboard pulls data from two places:

1. **Google Analytics** → traffic, source breakdown
2. **GHL API** → leads, tags, conversions

### Step 1: Google Analytics

1. Go to: https://analytics.google.com
2. Click your property
3. Settings → Data Streams
4. Copy your **Measurement ID** (looks like: G-XXXXXXXXXX)
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
6. In your funnel's `<head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', '{GA_ID}');
   </script>
   ```
7. Wait 24 hours for GA to backfill data

### Step 2: GHL API

1. In GHL, get your API key (Settings → Integrations → API Keys)
2. Add to `.env` (NOT `.env.local`—this is server-side):
   ```
   GHL_API_KEY=your_api_key_here
   GHL_LOCATION_ID=your_location_id_here
   ```
3. Your dashboard will query GHL API to pull:
   - Total contacts created (leads)
   - Contacts with tag "call-booked" (calls)
   - Contacts with tag "paid-customer" (revenue)
   - Breakdown by tag (source-shorts, source-youtube, etc.)

---

## Dashboard Page Structure

Create `/pages/dashboard.jsx` in your funnel template:

```javascript
import { useEffect, useState } from 'react';
import { LineChart, BarChart, PieChart } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalCalls: 0,
    totalRevenue: 0,
    bySource: [],
    funnel: [],
    trendData: []
  });

  useEffect(() => {
    // Fetch from backend API
    fetch('/api/dashboard/stats')
      .then(r => r.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="dashboard">
      <h1>Funnel Dashboard</h1>
      
      {/* Top Stats */}
      <StatsCards stats={stats} />
      
      {/* Source Breakdown */}
      <SourceChart data={stats.bySource} />
      
      {/* Funnel */}
      <FunnelChart data={stats.funnel} />
      
      {/* Trend Over Time */}
      <TrendChart data={stats.trendData} />
      
      {/* Recent Leads Table */}
      <RecentLeads />
    </div>
  );
}
```

---

## Backend: Dashboard API

Create `/api/dashboard/stats.js` in your backend:

```javascript
import { GHL_API_KEY, GHL_LOCATION_ID } from '@/config/env';

async function getGHLStats() {
  // Get all contacts
  const contactsResponse = await fetch(
    `https://api.gohighlevel.com/v1/contacts?limit=500`,
    {
      headers: { 'Authorization': `Bearer ${GHL_API_KEY}` }
    }
  );
  const { contacts } = await contactsResponse.json();

  // Count by tag
  const totalLeads = contacts.length;
  const callsBooked = contacts.filter(c => c.tags?.includes('call-booked')).length;
  const paidCustomers = contacts.filter(c => c.tags?.includes('paid-customer')).length;

  // Group by source
  const bySource = {};
  contacts.forEach(contact => {
    const sourceTag = contact.tags?.find(t => t.startsWith('source-'));
    const source = sourceTag?.replace('source-', '') || 'direct';
    
    if (!bySource[source]) {
      bySource[source] = { leads: 0, calls: 0, paid: 0 };
    }
    bySource[source].leads++;
    if (contact.tags?.includes('call-booked')) bySource[source].calls++;
    if (contact.tags?.includes('paid-customer')) bySource[source].paid++;
  });

  return {
    totalLeads,
    totalCalls: callsBooked,
    totalRevenue: paidCustomers * 97, // Replace 97 with your actual price
    bySource,
    paidCustomers
  };
}

export default async function handler(req, res) {
  const stats = await getGHLStats();
  res.json(stats);
}
```

---

## Real-Time Dashboard Components

### Component 1: Stats Cards

```jsx
function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="Leads This Month"
        value={stats.totalLeads}
        trend={"+12%"}
        trendColor="green"
      />
      <StatCard
        title="Calls Booked"
        value={stats.totalCalls}
        percentage={(stats.totalCalls / stats.totalLeads * 100).toFixed(1) + '%'}
      />
      <StatCard
        title="Revenue"
        value={`$${stats.totalRevenue.toLocaleString()}`}
        subtext={`${stats.paidCustomers} paid customers`}
      />
      <StatCard
        title="Conversion Rate"
        value={(stats.paidCustomers / stats.totalLeads * 100).toFixed(1) + '%'}
        subtext="Leads → Paid"
      />
    </div>
  );
}

function StatCard({ title, value, trend, percentage, subtext, trendColor = 'gray' }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-sm text-gray-600 mb-2">{title}</div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      {trend && (
        <div className={`text-sm ${trendColor === 'green' ? 'text-green-600' : 'text-gray-500'}`}>
          {trend}
        </div>
      )}
      {percentage && <div className="text-sm text-gray-500">{percentage}</div>}
      {subtext && <div className="text-xs text-gray-500 mt-2">{subtext}</div>}
    </div>
  );
}
```

### Component 2: Source Breakdown (Bar Chart)

```jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function SourceChart({ data }) {
  const chartData = Object.entries(data).map(([source, stats]) => ({
    source,
    leads: stats.leads,
    calls: stats.calls,
    paid: stats.paid,
    conversionRate: (stats.calls / stats.leads * 100).toFixed(1)
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-lg font-bold mb-4">Performance by Source</h2>
      <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="source" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
        <Bar dataKey="calls" fill="#10b981" name="Calls" />
        <Bar dataKey="paid" fill="#f59e0b" name="Paid" />
      </BarChart>
    </div>
  );
}
```

### Component 3: Conversion Funnel

```jsx
function FunnelChart({ totalLeads, totalCalls, totalPaid }) {
  const stageHeight = 60;
  const stages = [
    { label: 'Leads', value: totalLeads, width: '100%' },
    { label: 'Calls', value: totalCalls, width: `${(totalCalls / totalLeads * 100)}%` },
    { label: 'Paid', value: totalPaid, width: `${(totalPaid / totalLeads * 100)}%` }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-lg font-bold mb-6">Conversion Funnel</h2>
      {stages.map((stage, i) => (
        <div key={i} className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">{stage.label}</span>
            <span className="text-sm text-gray-600">
              {stage.value} ({((stage.value / totalLeads) * 100).toFixed(1)}%)
            </span>
          </div>
          <div
            className="bg-blue-500 h-10 rounded flex items-center justify-end pr-3 text-white font-bold"
            style={{ width: stage.width }}
          >
            {stage.value}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Component 4: Recent Leads Table

```jsx
import { useEffect, useState } from 'react';

function RecentLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch('/api/dashboard/recent-leads')
      .then(r => r.json())
      .then(data => setLeads(data));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-lg font-bold mb-4">Recent Leads</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Email</th>
            <th className="text-left py-2">Source</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{lead.firstName} {lead.lastName}</td>
              <td className="py-3">{lead.email}</td>
              <td className="py-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {lead.source}
                </span>
              </td>
              <td className="py-3">
                {lead.callBooked ? (
                  <span className="text-green-600">Call Booked</span>
                ) : (
                  <span className="text-gray-600">Opt-in</span>
                )}
              </td>
              <td className="py-3 text-gray-500">{formatDate(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Deployment: Adding Dashboard to Your Funnel

1. **Create pages/dashboard.jsx** (or add to your template)
2. **Create /api/dashboard/stats.js** (backend)
3. **Create /api/dashboard/recent-leads.js** (backend)
4. **Add to .env:** GHL_API_KEY, GHL_LOCATION_ID
5. **Deploy:** `vercel deploy`
6. **Access:** `yourfunnel.vercel.app/dashboard`

### Protecting the Dashboard (Optional)

You probably don't want the world seeing your metrics. Protect it:

```javascript
// pages/dashboard.jsx

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
      localStorage.setItem('dashboardAuth', 'true');
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('dashboardAuth')) {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return (
      <form onSubmit={handleLogin} className="max-w-xs mx-auto mt-20">
        <input
          type="password"
          placeholder="Dashboard password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    );
  }

  // Rest of dashboard...
}
```

Add to .env.local:
```
NEXT_PUBLIC_DASHBOARD_PASSWORD=your_secure_password
```

---

## Manual Google Sheets Alternative

If you don't want to code a dashboard, use Google Sheets:

1. Create a Google Sheet
2. Each morning, manually enter:
   - Date
   - Leads from GHL (Contacts → filter by date created)
   - Calls booked (Contacts → filter by tag "call-booked")
   - Paid customers (Contacts → filter by tag "paid-customer")
3. Use Google Sheets charts (Insert → Chart) to visualize
4. Set a reminder every morning to update

Takes 5 minutes, gives you a basic dashboard.

---

## What to Monitor Daily

```
✓ How many new leads came in? (goal: X per day)
✓ What's your lead source breakdown? (shorts vs YouTube vs organic)
✓ How many calls are booked? (goal: X per day)
✓ Any payment issues? (check if paid-customer tag is being added)
✓ Any automation failures? (check GHL logs)
```

## What to Review Weekly

```
✓ Total leads this week vs last week (trend?)
✓ Total calls booked (up or down?)
✓ Conversion rate: leads → calls (healthy?)
✓ Conversion rate: calls → paid (strong closer?)
✓ Which content drove the most revenue? (double down)
✓ Which content underperformed? (kill or iterate)
```

## What to Analyze Monthly

```
✓ Total revenue (target hit?)
✓ Cost per lead (organic should be low)
✓ Lifetime value of leads from each source (which pays best?)
✓ Refund rate (>15% = problem)
✓ Course completion rate (if applicable)
✓ ROI breakdown (shorts? youtube? organic?)
✓ Next month's focus areas (which to scale? which to kill?)
```

---

## Example: Real Numbers

Let's say you reviewed your dashboard and saw:

```
LAST 30 DAYS
├─ Total Leads: 127
├─ Total Calls: 18 (14.2% conversion)
├─ Total Paid: 10 (7.9% of leads, 55.6% of calls)
├─ Revenue: $970 (10 × $97)
│
├─ SHORTS: 87 leads, 13 calls (15%), 7 paid (8%)
│  └─ ROI: Good volume, solid converter
│
└─ YOUTUBE: 28 leads, 12 calls (43%), 8 paid (28.6%)
   └─ ROI: LOW volume, INSANE converter

INSIGHT: YouTube is your cash cow. If you doubled YouTube output,
you'd probably double revenue. Shorts are good for volume. 
Keep making both, but invest more in YouTube.
```

---

## Summary

1. **Set up Google Analytics** → captures traffic + utm params
2. **Connect GHL API** → pulls lead + conversion data
3. **Build dashboard** → visualizes everything in one place
4. **Monitor daily** → leads coming in? Any issues?
5. **Review weekly** → trends? What's working?
6. **Optimize monthly** → which content should you double down on?

**Once this is done, you don't fly blind. You know exactly what's working and what's not.**
