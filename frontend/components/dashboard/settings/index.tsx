'use client'
import TopHeader from '@/components/reuseabale/TopHeader'
import React from 'react'
import Infot from './Infot'

const  SettingsIndex = () => {
  return (
       <div className='max-h-screen overflow-hidden flex flex-col gap-5 '>
   <TopHeader title="Settings" />
   <Infot  />
      
    </div>
  )
}

export default  SettingsIndex
