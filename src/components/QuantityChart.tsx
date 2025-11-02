'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RFIDTag } from '@/lib/supabase'

interface QuantityChartProps {
  data: RFIDTag[]
}

export function QuantityChart({ data }: QuantityChartProps) {
  // Group by product name and sum quantities
  const aggregatedData = data.reduce(
    (acc, item) => {
      const existing = acc.find((d) => d.name === item.epc_text)
      if (existing) {
        existing.quantity += item.quantity
        existing.count += 1
      } else {
        acc.push({
          name: item.epc_text || 'Unknown',
          quantity: item.quantity,
          count: 1,
        })
      }
      return acc
    },
    [] as Array<{ name: string; quantity: number; count: number }>
  )

  const chartData = aggregatedData.slice(0, 10) // Top 10 products

  return (
    <Card className="group">
      <CardHeader>
        <CardTitle>Product Quantities</CardTitle>
        <CardDescription>Top 10 products by quantity</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))"
              opacity={0.3}
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
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
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Legend />
            <Bar 
              dataKey="quantity" 
              fill="url(#barGradient)"
              name="Total Quantity"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity={1} />
                <stop offset="100%" stopColor="rgb(96, 165, 250)" stopOpacity={0.7} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
