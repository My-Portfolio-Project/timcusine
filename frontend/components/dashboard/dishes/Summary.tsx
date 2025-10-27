'use client'

import { useDishStore } from '@/components/stores/dishStore'
import { Coffee, UtensilsCrossed, CheckCircle, XCircle } from 'lucide-react'
import React, { useEffect } from 'react'

const DishesSummary = () => {
  const { dishes, fetchAll } = useDishStore()

  useEffect(() => {
    fetchAll(1, 10)
  }, [fetchAll])

  const totalDishes = dishes.length
//   const availableDishes = dishes.filter((dish) => dish.available).length
//   const unavailableDishes = dishes.filter((dish) => !dish.available).length
//   const featuredDishes = dishes.filter((dish) => dish.isFeatured).length

  const summaryData = [
    {
      title: 'Total Dishes',
      icon: <UtensilsCrossed size={22} />,
      number: totalDishes,
      color: 'bg-gradient-to-br from-[#6a5acd] to-[#483d8b]', 
    },
    {
      title: 'Available Dishes',
      icon: <CheckCircle size={22} />,
        number: totalDishes,
      color: 'bg-gradient-to-br from-[#22c55e] to-[#15803d]', 
    },
    {
      title: 'Unavailable Dishes',
      icon: <XCircle size={22} />,
        number: totalDishes,
      color: 'bg-gradient-to-br from-[#ef4444] to-[#7f1d1d]', 
    },
    {
      title: '',
      icon: <Coffee size={22} />,
     number: totalDishes,
      color: 'bg-gradient-to-br from-[#f59e0b] to-[#b45309]',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:p-3">
      {summaryData.map((sum, index) => (
        <div
          key={index}
          className={`rounded-2xl text-white shadow-md p-5 flex flex-col
             justify-center gap-3 ${sum.color} transition-transform hover:scale-105 duration-200`}
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

export default DishesSummary
