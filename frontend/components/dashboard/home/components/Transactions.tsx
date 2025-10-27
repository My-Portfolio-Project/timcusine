'use client'

import React, { useMemo } from 'react'
import { useOrderStore } from '@/components/stores/orderStore'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// ✅ Define order structure
interface Order {
  id: string
  payment: 'PAYSTACK' | 'STRIPE' | string
  totalAmount: number
  createdAt: string
}

// ✅ Define chart structure
interface ChartData {
  name: string
  stripeTotal: number
  paystackTotal: number
  totalOrders: number
}

const TransactionChart: React.FC = () => {
  const { orders } = useOrderStore()

  const chartData: ChartData[] = useMemo(() => {
    if (!Array.isArray(orders)) return []

    // Create months Jan–Dec
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ]

    // Initialize structure for each month
    const monthlyData = months.map(month => ({
      name: month,
      stripeTotal: 0,
      paystackTotal: 0,
      totalOrders: 0,
    }))

    // Loop through orders
    orders.forEach((order: Order) => {
      const date = new Date(order.createdAt)
      const monthIndex = date.getMonth()

      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyData[monthIndex].totalOrders += 1

        if (order.payment?.toUpperCase() === 'STRIPE') {
          monthlyData[monthIndex].stripeTotal += order.totalAmount
        } else if (order.payment?.toUpperCase() === 'PAYSTACK') {
          monthlyData[monthIndex].paystackTotal += order.totalAmount
        }
      }
    })

    return monthlyData
  }, [orders])

  // ✅ Custom tooltip to add $ and ₦ icons
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const stripe = payload.find((p: any) => p.dataKey === 'stripeTotal')
      const paystack = payload.find((p: any) => p.dataKey === 'paystackTotal')
      const totalOrders = payload.find((p: any) => p.dataKey === 'totalOrders')

      return (
        <div className="bg-white p-3 rounded-md shadow-md border text-sm">
          <p className="font-semibold mb-1">{label}</p>
          {stripe && (
            <p className="text-[#82ca9d]">
              💵 Stripe: ${stripe.value.toLocaleString()}
            </p>
          )}
          {paystack && (
            <p className="text-[#8884d8]">
              🇳🇬 Paystack: ₦{paystack.value.toLocaleString()}
            </p>
          )}
          {totalOrders && (
            <p className="text-[#ffc658]">
              🧾 Orders: {totalOrders.value}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full max-w-5xl h-[400px] space-y-2">
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
       
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Bars with emoji-enhanced names */}
          <Bar dataKey="stripeTotal" fill="#82ca9d" name="💵 Stripe Total ($)" />
          <Bar dataKey="paystackTotal" fill="#8884d8" name="🇳🇬 Paystack Total (₦)" />
          <Bar dataKey="totalOrders" fill="#ffc658" name="🧾 Total Orders" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TransactionChart
