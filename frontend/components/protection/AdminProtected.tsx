'use client'
import React, { useEffect, useState } from 'react'
import GeneralLoading from '../reuseabale/GeneralLoading'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

const AdminProtected: React.FC<Props> = ({ children }) => {
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

  return <>{children}</>
}

export default AdminProtected
