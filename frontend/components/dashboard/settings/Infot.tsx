'use client'

import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/components/stores/authStore'
import { useUserStore } from '@/components/stores/userStore'
import { User, Mail, Shield, Calendar, Edit2 } from 'lucide-react'
import Form from './Form'
import LoadingSpinner from '@/components/reuseabale/Loading'


const Infot = () => {
  const { user } = useAuthStore()
  const { userProfile } = useUserStore()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        await userProfile()
      } catch (error) {
        console.error('Failed to load user profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userProfile])

  // ✅ Show loading state
  if (loading) {
    return <LoadingSpinner />
  }

  // ✅ If user data doesn’t exist
  if (!user) {
    return (
      <div className="text-center text-gray-400 py-10">
        No user information available.
      </div>
    )
  }

  return (
    <div className="w-full border border-gray-700 rounded-lg p-5 md:p-6 gap-6 bg-[#202938] text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <User size={20} className="text-[#6159e7]" />
          Account Info
        </h1>
      </div>

      {/* Info Fields */}
      <div className="space-y-4 bg-[#1b2433] p-4 rounded-lg">
        {/* Full Name */}
        <div className="flex items-center justify-between border-b border-gray-700 pb-2">
          <div className="flex items-center gap-2 text-gray-300">
            <User size={16} className="text-gray-400" />
            <span className="font-medium">{user.fullName}</span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-400 hover:text-[#6159e7] transition"
          >
            <Edit2 size={16} />
          </button>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-gray-300 border-b border-gray-700 pb-2">
          <Mail size={16} className="text-gray-400" />
          <span>{user.email}</span>
        </div>

        {/* Role */}
        <div className="flex items-center gap-2 text-gray-300 border-b border-gray-700 pb-2">
          <Shield size={16} className="text-gray-400" />
          <span className="uppercase font-semibold">{user.role}</span>
        </div>

        {/* Verified */}
        <div className="flex items-center gap-2 text-gray-300 border-b border-gray-700 pb-2">
          <Shield
            size={16}
            className={user.isVerified ? 'text-green-400' : 'text-red-400'}
          />
          <span>
            {user.isVerified ? 'Verified Account ✅' : 'Not Verified ❌'}
          </span>
        </div>

        {/* Created At */}
        <div className="flex items-center gap-2 text-gray-300">
          <Calendar size={16} className="text-gray-400" />
          <span>
            Joined on{' '}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '—'}
          </span>
        </div>
      </div>

      {/* ✅ Modal Section */}
      {isOpen && (
        <>
          <div className="modal modal-open">
            <div className="modal-box bg-[#1b2433] text-white border border-gray-700 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Edit Account Info</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  ✕
                </button>
              </div>

              {/* Render your Form component */}
              <Form />

              <div className="modal-action">
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn bg-red-500/20 text-red-400 border-none hover:bg-red-500/40"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* ✅ Modal Backdrop */}
          <div
            className="modal-backdrop bg-black/50 fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  )
}

export default Infot
