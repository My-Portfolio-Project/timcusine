'use client'

import { useAuthStore } from '@/components/stores/authStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import GeneralLoading from '../reuseabale/GeneralLoading'

export default function UnProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  
    const timer = setTimeout(() => {
 
      if (!user || user.role !== 'ADMIN' || !token) {
        router.replace('/auth')
      } else {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [user, token, router])

  if (loading) return <GeneralLoading />

  return <>{children}</>}
