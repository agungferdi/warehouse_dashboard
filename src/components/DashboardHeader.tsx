'use client'

import { ThemeToggle } from '@/components/ThemeToggle'

interface DashboardHeaderProps {
  title?: string
  description?: string
}

export function DashboardHeader({ 
  title = "Warehouse Dashboard",
  description = "Real-time inventory monitoring & RFID tracking"
}: DashboardHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border/50">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 animate-fade-in">
          {/* Left content */}
          <div className="flex-1 animate-slide-in-left">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
              <span className="gradient-text">{title}</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/70">
              {description}
            </p>
            
            {/* Status badge */}
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-foreground/60">Live monitoring active</span>
            </div>
          </div>

          {/* Right - Theme toggle */}
          <div className="flex-shrink-0 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
    </div>
  )
}
