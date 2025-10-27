'use client'
import React from 'react'
import DishesSummary from './Summary'
import DishesTable from './Table'
import TopHeader from '@/components/reuseabale/TopHeader'

const DishesIndex = () => {
  return (
    <div className='max-h-screen overflow-hidden flex flex-col gap-5 '>
              <TopHeader title="Dishes" />
      <DishesSummary  />
      <DishesTable  />
    </div>
  )
}

export default DishesIndex
