'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-2.5 text-foreground transition-smooth"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  return <ThemeToggleButton />
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="group inline-flex items-center justify-center rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-2.5 text-foreground transition-smooth hover:bg-card/70 hover:border-blue-400/30 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-400/20"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === 'light' ? (
          <Moon className="w-5 h-5 transition-transform group-hover:scale-110" />
        ) : (
          <Sun className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
        )}
      </div>
    </button>
  )
}
