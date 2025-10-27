'use client'
import { OrderProps } from '@/components/interface/order.interface'
import { UserProps } from '@/components/interface/user.interface'
import { 
  User, 
  Mail, 
  ShoppingBag, 
  XCircle, 
  Clock, 
  DollarSign, 
  Ban, 
  CheckCircle,
  CalendarDays
} from 'lucide-react'
import React from 'react'

interface Props {
  clients: UserProps | null
  setShowDetails: (value: boolean) => void
}

const ClientDetails = ({ clients, setShowDetails }: Props) => {
  if (!clients) return null

  const joinedDate = clients.createdAt
    ? new Date(clients.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A'

  return (
    <div className="flex flex-col w-full rounded-r-lg md:px-6 px-4 text-white relative bg-[#111827]
    scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-5">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ShoppingBag size={20} className="text-[#6159e7]" />
          Client Details
        </h1>
        <button
          onClick={() => setShowDetails(false)}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <XCircle size={22} />
        </button>
      </div>

      {/* User Role */}
      <div className="flex justify-end mb-6">
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${
            clients.role === 'ADMIN'
              ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
              : 'bg-green-500/10 border-green-500/40 text-green-400'
          }`}
        >
          <CheckCircle size={16} />
          {clients.role}
        </span>
      </div>

      {/* Client Information */}
      <div className="mb-8">
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-3">
          <User size={18} className="text-[#6159e7]" />
          Client Information
        </h2>

        <div className="bg-[#1b2433] rounded-lg p-4 space-y-3">
          <p className="flex items-center gap-2 text-gray-300">
            <User size={15} className="text-gray-400" />
            <span className="font-medium text-white">{clients.fullName}</span>
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <Mail size={15} className="text-gray-400" />
            {clients.email}
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <CalendarDays size={15} className="text-gray-400" />
            Joined on <span className="text-white">{joinedDate}</span>
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-3">
          <ShoppingBag size={18} className="text-[#6159e7]" />
          Recent Orders
        </h2>

        {clients.orders && clients.orders.length > 0 ? (
          <div className="bg-[#1b2433] rounded-lg p-4">
            {clients.orders.map((order: OrderProps, i: number) => (
              <div
                key={i}
                className="flex flex-col border-b border-gray-700 last:border-none py-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">
                    #{order.id?.slice(0, 8)}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      order.status === 'PENDING'
                        ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
                <div className="flex items-center justify-between text-gray-400 text-sm mt-1">
                  <p className="flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-1">
                    <DollarSign size={14} /> ₦{order.totalAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1b2433] rounded-lg p-6 text-center text-gray-400 flex flex-col items-center justify-center gap-2">
            <ShoppingBag size={28} className="text-gray-500" />
            <p className="text-sm">This client hasn’t made any orders yet.</p>
          </div>
        )}
      </div>

      {/* Suspend Account Button */}
      <div className="flex justify-end">
        <button
          className="btn bg-red-500/20 text-red-400 border-none hover:bg-red-500/40 
          text-sm px-5 py-2 rounded-md transition cursor-pointer flex items-center gap-2"
        >
          <Ban size={16} />
          Suspend Account
        </button>
      </div>
    </div>
  )
}

export default ClientDetails
