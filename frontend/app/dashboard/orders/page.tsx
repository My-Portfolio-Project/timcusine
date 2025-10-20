
'use client'
import Sidebar from '@/components/common/Sidebar'
import OrderIndex from '@/components/dashboard/orders'
import React from 'react'

const OrderPage = () => {
  return (
          <div className='bg-white '>
     
        <Sidebar >
      <OrderIndex  />
      </Sidebar>
    </div>
  )
}

export default OrderPage
