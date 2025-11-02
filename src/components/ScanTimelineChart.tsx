'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RFIDTag } from '@/lib/supabase'
import { format } from 'date-fns'

interface ScanTimelineChartProps {
  data: RFIDTag[]
}

export function ScanTimelineChart({ data }: ScanTimelineChartProps) {
  // Group by scan date and count scans
  const aggregatedData = data.reduce(
    (acc, item) => {
      const date = format(new Date(item.created_at), 'MMM dd')
      const existing = acc.find((d) => d.date === date)
      if (existing) {
        existing.scans += 1
      } else {
        acc.push({ date, scans: 1 })
      }
      return acc
    },
    [] as Array<{ date: string; scans: number }>
  )

  return (
    <Card className="group">
      <CardHeader>
        <CardTitle>Scan Timeline</CardTitle>
        <CardDescription>Daily scan activity history</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart 
            data={aggregatedData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))"
              opacity={0.3}
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'hsl(var(--foreground))', opacity: 0.7, fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--foreground))', opacity: 0.7, fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              }}
              cursor={{ stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 2 }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="scans"
              stroke="url(#lineGradient)"
              name="Number of Scans"
              strokeWidth={3}
              dot={{ fill: 'rgb(59, 130, 246)', r: 5 }}
              activeDot={{ r: 7, fill: 'rgb(59, 130, 246)' }}
              isAnimationActive={true}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity={1} />
                <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity={1} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
