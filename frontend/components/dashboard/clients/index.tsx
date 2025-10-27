'use client'
import React from 'react'
import ClientSummary from './Summary'
import ClientTable from './Table'
import TopHeader from '@/components/reuseabale/TopHeader'

const ClientIndex = () => {
  return (
    <div className='max-h-screen  scrollbar'>

      <TopHeader  title="Customer" />
      <ClientSummary   />
      <ClientTable  />

    </div>
  )
}

export default ClientIndex
