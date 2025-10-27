'use client'

import { CornerDownLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  const pathname = usePathname()
  const isDashboard = pathname.includes('dashboard')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
      {/* Logo */}
      <img
        src="/landing-page/tims_logo.png"
        alt="Tims Logo"
        className="w-34 h-28 md:w-52 mb-6 object-cover"
      />

      {/* Error Message */}
      <h1 className="text-4xl font-bold text-white mb-2 font-railway">404 - Page Not Found</h1>
      <p className="text-white mb-6 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        href={isDashboard ? '/dashboard' : '/'}
        className="bg-white text-black font-medium px-6 py-3  
        transition-colors flex items-center"  >
        <CornerDownLeft />Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
