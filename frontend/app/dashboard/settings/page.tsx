'use client'

import Sidebar from '@/components/common/Sidebar'
import SettingsIndex from '@/components/dashboard/settings'
import React from 'react'

const SettingsPage = () => {
  return (
       <div className='bg-white '>
     
        <Sidebar >
      <SettingsIndex  />
            </Sidebar>
    </div>
  )
}

export default SettingsPage
