# Warehouse Monitoring Dashboard

A modern, real-time warehouse monitoring dashboard built with Next.js, React, and Supabase. Features interactive charts, real-time RFID tag tracking, and inventory management.

## Features

- **Real-time RFID Tracking**: Monitor RFID tags as they are scanned in your warehouse
- **Interactive Charts**: 
  - Product Quantity Bar Chart (top products by quantity)
  - Daily Scan Timeline (scan activity visualization)
- **Inventory Dashboard**: View total inventory, product counts, and unique items
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Real-time Updates**: Data refreshes automatically every 30 seconds

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **UI Framework**: React with Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Data Fetching**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Theme Management**: Custom React Context

## Project Structure

```
src/
 app/
    layout.tsx          # Root layout with theme setup
    page.tsx            # Main dashboard page
    providers.tsx       # Query and theme providers
    globals.css         # Global styles with theme variables
 components/
    ui/
       card.tsx        # Reusable card component
    QuantityChart.tsx   # Product quantity bar chart
    ScanTimelineChart.tsx # Daily scan timeline
    ThemeToggle.tsx     # Dark/light mode toggle
    theme-provider.tsx  # Theme context provider
 hooks/
    useRFIDData.ts      # Custom hook for fetching RFID data
 lib/
     supabase.ts         # Supabase client configuration
     utils.ts            # Utility functions
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd warehouse-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The dashboard expects the following Supabase table and view:

### Table: `rfid_tags`
- `id` (BIGSERIAL PRIMARY KEY)
- `tid` (VARCHAR(64)) - Tag ID
- `epc` (VARCHAR(64)) - EPC identifier
- `epc_text` (TEXT) - Product name
- `quantity` (INTEGER) - Product quantity
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

### View: `rfid_tags_view`
A predefined view that orders tags by creation date in descending order.

## API Integration

The dashboard automatically fetches data from your Supabase `rfid_tags_view` table every 30 seconds with caching and background refetching through React Query.

## Customization

### Change Colors
Edit the CSS custom properties in `src/app/globals.css` under `:root` and `.dark` selectors.

### Modify Chart Data
Edit the data aggregation logic in:
- `src/components/QuantityChart.tsx`
- `src/components/ScanTimelineChart.tsx`

### Update Refresh Interval
Modify the `staleTime` and `refetchInterval` in `src/hooks/useRFIDData.ts`:
```typescript
staleTime: 30 * 1000,        // Consider data stale after 30s
refetchInterval: 30 * 1000,  // Refetch every 30s
```

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Required for deployment:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## License

MIT

## Support

For issues or questions, please check the Supabase documentation or create an issue in the repository.
