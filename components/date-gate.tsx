"use client"

import { useState, useEffect } from "react"

interface DateGateProps {
  revealDate: string
  children: React.ReactNode
}

export function DateGate({ revealDate, children }: DateGateProps) {
  // Start with false to avoid server/client hydration mismatch if date hasn't passed
  // We'll calculate the actual visibility on the client
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    const checkDate = () => {
      const targetDate = new Date(revealDate)
      setShouldShow(new Date() >= targetDate)
    }

    // Check immediately on mount
    checkDate()

    // Periodically check (every minute) so it appears automatically
    // even if the user leaves the tab open during the launch
    const intervalId = setInterval(checkDate, 60000)

    return () => clearInterval(intervalId)
  }, [revealDate])

  if (!shouldShow) return null

  return <>{children}</>
}
