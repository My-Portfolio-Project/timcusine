'use client'
import React from 'react'
import Summary from './Summary'
import Table from './Table'
import Chart from './Chart'
import TopHeader from '@/components/reuseabale/TopHeader'

const DashboardHomeIndex = () => {
  return (
    <div className='p-3 md:p-5 w-full flex flex-col gap-5 bg-[#111828]   mb-5'>
            <TopHeader  title="Dashboard" />
      <Summary />
      <Chart />
      <Table  />
    </div>
  )
}

export default DashboardHomeIndex
