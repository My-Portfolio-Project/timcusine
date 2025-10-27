'use client'
import { useAuthStore } from '@/components/stores/authStore'
import { useUserStore } from '@/components/stores/userStore'
import {
  Users,
  UserCheck,
  UserX,
  Star,
} from 'lucide-react'
import React, { useEffect } from 'react'

const ClientSummary = () => {

  const {fetchAllUsers, users} = useUserStore()
  const {user} = useAuthStore()
  console.log("All Users", users)

  useEffect(() => {
    if (!user?.id) {
      console.log('user is not provided')
      return
    }

    fetchAllUsers(user.id, 1, 10)
  }, [user, fetchAllUsers]) 


  const totalUsers = users.length
//   const activeUsers = users.filter((u) => u.status === 'active').length
//   const suspendedUsers = users.filter((u) => u.status === 'suspended').length
//   const featuredUsers = users.filter((u) => u.featured).length

  const summaryData = [
    {
      title: 'Total Users',
      icon: <Users size={22} />,
      number: totalUsers,
      color: 'bg-gradient-to-br from-[#6a5acd] to-[#483d8b]', // purple
    },
    {
      title: 'Active Users',
      icon: <UserCheck size={22} />,
      number:  totalUsers,
      color: 'bg-gradient-to-br from-[#22c55e] to-[#15803d]', // green
    },
    {
      title: 'Suspended',
      icon: <UserX size={22} />,
      number:  totalUsers,
      color: 'bg-gradient-to-br from-[#ef4444] to-[#7f1d1d]', // red
    },
    {
      title: 'Featured Users',
      icon: <Star size={22} />,
      number:  totalUsers,
      color: 'bg-gradient-to-br from-[#f59e0b] to-[#b45309]', // amber
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

export default ClientSummary
