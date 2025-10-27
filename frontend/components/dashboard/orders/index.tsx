import React from 'react'
import OrderSummary from './Summary'
import OrdersTable from './Table'
import TopHeader from '@/components/reuseabale/TopHeader'

const OrderIndex = () => {
  return (
    <div className='max-h-screen  scrollbar flex flex-col gap-5'>
            <TopHeader  title="Orders" />
      <OrderSummary  />
      <OrdersTable  />
    </div>
  )
}

export default OrderIndex
