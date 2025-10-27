'use client'
import React from 'react'
import { OrderProps } from '@/components/interface/order.interface'
import { 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  XCircle, 
  CheckCircle, 
  Package, 
  Truck 
} from 'lucide-react'

interface Props {
  orders: OrderProps | null
  setShowDetails: (value: boolean) => void
}

const OrderDetails = ({ orders, setShowDetails }: Props) => {
  if (!orders) return null

  return (
    <div className="flex flex-col w-full rounded-r-lg md:p-6 p-4 text-white relative scrollbar">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ShoppingBag size={20} className="text-[#6159e7]" />
          Order Details
        </h1>
        <button
          onClick={() => setShowDetails(false)}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <XCircle size={22} />
        </button>
      </div>

      {/* Status + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className="text-gray-400" />
          <span className="text-gray-400">Status:</span>
          <span
            className={`font-semibold ${
              orders.status === 'PENDING' ? 'text-yellow-400' : 'text-green-400'
            }`}
          >
            {orders.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {orders.status === 'PENDING' ? (
            <button
              className="btn bg-green-500/20 text-green-400 border-none hover:bg-green-500/40 
              text-sm px-4 py-2 rounded-md transition cursor-pointer flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Mark as Completed
            </button>
          ) : (
            <button
              className="btn bg-yellow-500/20 text-yellow-400 border-none hover:bg-yellow-500/40 
              text-sm px-4 py-2 rounded-md transition cursor-pointer flex items-center gap-2"
            >
              <Clock size={16} />
              Mark as Pending
            </button>
          )}

          <button
            className="btn bg-red-500/20 text-red-400 border-none hover:bg-red-500/40 
            text-sm px-4 py-2 rounded-md transition cursor-pointer flex items-center gap-2"
          >
            <XCircle size={16} />
            Cancel Order
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-2">
          <Package size={18} className="text-[#6159e7]" />
          Products
        </h2>

        <div className="bg-[#1b2433] rounded-lg p-3">
          {orders.items?.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-gray-700 last:border-none py-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">₦{item.price}</p>
              </div>
              <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
            </div>
          ))}

          <div className="flex items-center justify-between pt-3 border-t border-gray-700 mt-2">
            <span className="font-medium text-gray-300 flex items-center gap-1">
              <DollarSign size={14} /> Total:
            </span>
            <span className="font-semibold text-white">₦{orders.totalAmount}</span>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-2">
          <User size={18} className="text-[#6159e7]" />
          Customer Info
        </h2>

        <div className="bg-[#1b2433] rounded-lg p-3 space-y-2">
          <p className="flex items-center gap-2 text-gray-300">
            <User size={14} className="text-gray-400" />
            {orders.user?.fullName}
          </p>
          <p className="flex items-center gap-2 text-gray-300">
            <Mail size={14} className="text-gray-400" />
            {orders.user?.email}
          </p>
          {/* {orders.user?.phone && (
            <p className="flex items-center gap-2 text-gray-300">
              <Phone size={14} className="text-gray-400" />
              {orders.user?.phone}
            </p>
          )} */}
        </div>
      </div>

      {/* Delivery Address */}
      <div>
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-2">
          <Truck size={18} className="text-[#6159e7]" />
          Delivery Address
        </h2>

        <div className="bg-[#1b2433] rounded-lg p-3 text-gray-300 space-y-1">
          <p className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            {orders.street}, {orders.city}, {orders.state}, {orders.country}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
