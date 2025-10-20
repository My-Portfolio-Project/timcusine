'use client'

import Sidebar from '@/components/common/Sidebar'
import DashboardIndex from '@/components/dashboard'
import React from 'react'

const page = () => {
  return (
    <div className='bg-white max-h-screen'>
        <Sidebar >
      <DashboardIndex  />
      </Sidebar>
    </div>
  )
}

export default page
