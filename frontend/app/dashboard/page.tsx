'use client'

import Sidebar from '@/components/common/Sidebar'
import DashboardIndex from '@/components/dashboard'
import AdminProtected from '@/components/protection/AdminProtected'
import React from 'react'

const page = () => {
  return (
    <AdminProtected>


    <div className='bg-white max-h-screen'>
        <Sidebar >
      <DashboardIndex  />
      </Sidebar>
      </div>

          </AdminProtected>

  )
}

export default page
