'use client'

import React, { useMemo } from 'react'
import { useDishStore } from '@/components/stores/dishStore'
import { useOrderStore } from '@/components/stores/orderStore'
import { useUserStore } from '@/components/stores/userStore'
import { Coffee, UtensilsCrossed, Users, DollarSign } from 'lucide-react'

// Conversion rate (USD → NGN)
const USD_TO_NGN = 1333

const Summary: React.FC = () => {
  const { orders } = useOrderStore()
  const { dishes } = useDishStore()
  const { users } = useUserStore()

  // ✅ Calculate all summary values using useMemo
  const {
    totalStripeUSD,
    totalPaystackNGN,
    totalRevenueNGN,
    totalOrders,
    totalDishes,
    totalUsers,
  } = useMemo(() => {
    if (!Array.isArray(orders)) {
      return {
        totalStripeUSD: 0,
        totalPaystackNGN: 0,
        totalRevenueNGN: 0,
        totalOrders: 0,
        totalDishes: dishes.length,
        totalUsers: users.length,
      }
    }

    const stripeOrders = orders.filter(o => o.payment?.toUpperCase() === 'STRIPE')
    const paystackOrders = orders.filter(o => o.payment?.toUpperCase() === 'PAYSTACK')

    const totalStripeUSD = stripeOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
    const totalPaystackNGN = paystackOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    // ✅ Convert Stripe to Naira, then add to Paystack total
    const totalRevenueNGN = (totalStripeUSD * USD_TO_NGN) + totalPaystackNGN

    return {
      totalStripeUSD,
      totalPaystackNGN,
      totalRevenueNGN,
      totalOrders: orders.length,
      totalDishes: dishes.length,
      totalUsers: users.length,
    }
  }, [orders, dishes, users])

  // ✅ Prepare summary cards
  const summaryData = [
    {
      title: 'Total Revenue (₦)',
      icon: <DollarSign size={22} />,
      number: `₦${totalRevenueNGN.toLocaleString()}`,
      color: 'bg-gradient-to-br from-[#facc15] to-[#f59e0b]',
    },
    {
      title: 'Total Stripe Revenue ($)',
      icon: <UtensilsCrossed size={22} />,
      number: `$${totalStripeUSD.toLocaleString()}`,
      color: 'bg-gradient-to-br from-[#3b82f6] to-[#1e40af]',
    },
    {
      title: 'Total Paystack Revenue (₦)',
      icon: <Coffee size={22} />,
      number: `₦${totalPaystackNGN.toLocaleString()}`,
      color: 'bg-gradient-to-br from-[#16a34a] to-[#065f46]',
    },
    {
      title: 'Total Orders',
      icon: <Users size={22} />,
      number: totalOrders.toLocaleString(),
      color: 'bg-gradient-to-br from-[#ef4444] to-[#7f1d1d]',
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
            <h1 className="text-2xl md:text-3xl font-bold">{sum.number}</h1>
          </div>
          <p className="text-sm opacity-90">{sum.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Summary
