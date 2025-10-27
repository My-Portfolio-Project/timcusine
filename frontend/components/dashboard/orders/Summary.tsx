'use client'
import { useOrderStore } from '@/components/stores/orderStore'
import { ShoppingCart, Clock, XCircle, CheckCircle } from 'lucide-react'
import React from 'react'

const OrderSummary = () => {
  const { orders } = useOrderStore()

  const totalOrders = orders.length
  const pendingOrders = orders.filter((item) => item.status === 'PENDING').length
  const canceledOrders = orders.filter((item) => item.status === 'CANCELLED').length
  const deliveredOrders = orders.filter((item) => item.status === 'DELIVERED').length

  const summaryData = [
    {
      title: 'Total Orders',
      icon: <ShoppingCart size={22} />,
      number: totalOrders,
        color: 'bg-gradient-to-br from-[#6a5acd] to-[#483d8b]', 
    },
    {
      title: 'Delivered Orders',
      icon: <Clock size={22} />,
      number: deliveredOrders,
      color: 'bg-gradient-to-br from-[#22c55e] to-[#15803d]',
    },
    {
      title: 'Cancelled Orders',
      icon: <XCircle size={22} />,
      number: canceledOrders,
         color: 'bg-gradient-to-br from-[#ef4444] to-[#7f1d1d]',
    },
    {
      title: 'Pending Orders',
      icon: <CheckCircle size={22} />,
     number: pendingOrders,
      color: 'bg-gradient-to-br from-[#f59e0b] to-[#b45309]',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:p-3">
      {summaryData.map((sum, index) => (
        <div
          key={index}
          className={`rounded-2xl text-white shadow-md p-5 flex flex-col justify-center gap-3 ${sum.color} transition-transform hover:scale-105 duration-200`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">{sum.icon}</div>
            <h1 className="text-3xl font-bold">{sum.number}</h1>
          </div>
          <p className="text-sm opacity-90">{sum.title}</p>
        </div>
      ))}
    </div>
  )
}

export default OrderSummary
