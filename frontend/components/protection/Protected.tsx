'use client'

import { useAuthStore } from '@/components/stores/authStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import GeneralLoading from '../reuseabale/GeneralLoading'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuthStore()
  const router = useRouter()
  const [isHydrated, setIsHydrated] = useState(false) 

  // Handle Zustand hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Redirect logic
  useEffect(() => {
    if (!isHydrated) return // Wait for hydration

    if (user && token) {
      const redirectTo = user.role === 'ADMIN' ? '/dashboard' : '/'
      router.replace(redirectTo)
    }
  }, [user, token, isHydrated, router])

 
  if (!isHydrated || (user && token)) {
    return <GeneralLoading />
  }

  // Render children (auth page) only if not authenticated
  return <>{children}</>
}