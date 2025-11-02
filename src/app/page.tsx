'use client'

import { useState, useEffect } from 'react'
import { QuantityChart } from '@/components/QuantityChart'
import { ScanTimelineChart } from '@/components/ScanTimelineChart'
import { DashboardHeader } from '@/components/DashboardHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RFIDTag, supabase } from '@/lib/supabase'

export default function Home() {
  const [data, setData] = useState<RFIDTag[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalScans: 0,
    uniqueProducts: 0,
    totalQuantity: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: rfidData, error } = await supabase
          .from('rfid_tags')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching data:', error)
          setData([])
        } else {
          setData(rfidData || [])
          
          // Calculate stats
          const uniqueProducts = new Set((rfidData || []).map(d => d.epc_text)).size
          const totalQuantity = (rfidData || []).reduce((sum, d) => sum + d.quantity, 0)
          
          setStats({
            totalScans: rfidData?.length || 0,
            uniqueProducts,
            totalQuantity,
          })
        }
      } catch (error) {
        console.error('Error:', error)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30 dark:from-background dark:via-background dark:to-slate-900/50">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3 animate-fade-in">
          {/* Total Scans Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-smooth"></div>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-smooth duration-500"></div>
              <CardHeader className="pb-3 relative z-10">
                <CardDescription className="text-foreground/60">Total Scans</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
                  {stats.totalScans}
                </div>
                <p className="text-xs text-foreground/50 mt-3">
                  RFID tags detected
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Unique Products Card */}
          <div className="group relative" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-smooth"></div>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-smooth duration-500"></div>
              <CardHeader className="pb-3 relative z-10">
                <CardDescription className="text-foreground/60">Unique Products</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-300">
                  {stats.uniqueProducts}
                </div>
                <p className="text-xs text-foreground/50 mt-3">
                  Different product types
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Total Quantity Card */}
          <div className="group relative" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-smooth"></div>
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-smooth duration-500"></div>
              <CardHeader className="pb-3 relative z-10">
                <CardDescription className="text-foreground/60">Total Quantity</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                  {stats.totalQuantity}
                </div>
                <p className="text-xs text-foreground/50 mt-3">
                  Items in stock
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          {loading ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Product Quantities</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-blue-500"></div>
                    <p className="text-sm text-foreground/60">Loading data...</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Scan Timeline</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-blue-500"></div>
                    <p className="text-sm text-foreground/60">Loading data...</p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : data.length > 0 ? (
            <>
              <QuantityChart data={data} />
              <ScanTimelineChart data={data} />
            </>
          ) : (
            <Card className="lg:col-span-2 border-2 border-dashed border-border/50">
              <CardHeader>
                <CardTitle>No Data Available</CardTitle>
                <CardDescription className="mt-2">
                  Start scanning RFID tags to populate the dashboard with data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-sm text-foreground/60">
                  <p>✓ Ensure Supabase credentials are in <code className="bg-card px-2 py-1 rounded text-foreground/80">.env.local</code></p>
                  <p>✓ Check that the <code className="bg-card px-2 py-1 rounded text-foreground/80">rfid_tags</code> table exists</p>
                  <p>✓ Begin scanning products with your RFID reader</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
