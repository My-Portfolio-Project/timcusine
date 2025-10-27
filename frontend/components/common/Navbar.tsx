'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { LogOut, MenuIcon, Search, ShoppingCart, User, X } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'next/navigation'
import { useCartStore } from '../stores/cartStore'

const navData = [
  { path: '/', display: 'Home' },
  { path: '/abouts', display: 'About Us' },
  { path: '/shops', display: 'Shop' },
  { path: '/contacts', display: 'Contact' },
]

const Navbar = () => {
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [openSidebar, setOpenSidebar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        menuRef.current?.classList.add('sticky-header')

        navContainerRef.current
          ?.querySelectorAll('h1')
          .forEach((el) => {
            el.classList.remove('text-white')
            el.classList.add('text-white')
          })
      } else {
        menuRef.current?.classList.remove('sticky-header')


        navContainerRef.current
          ?.querySelectorAll('h1')
          .forEach((el) => {
            el.classList.remove('text-white')
            el.classList.add('text-white')
          })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { user, setUser } = useAuthStore()
  const { userProfile } = useUserStore()
  const { carts } = useCartStore()

  useEffect(() => {
    userProfile()
  }, [userProfile, user])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/auth')
  }

  return (
    <>
      {/* ======= Navbar ======= */}
      <div
        ref={menuRef}
        className="h-14 w-full flex items-center justify-between bg-black
         p-3 md:p-6 rounded-[1px] border-t border-gray-800 z-50 relative"
      >
     {/* Desktop Nav links */}
        <div ref={navContainerRef} className="hidden md:flex items-center gap-4">
          {navData.map((item, index) => (
            <Link key={index} href={item.path}>
              <h1 className="text-white text-lg  transition">
                {item.display}
              </h1>
            </Link>
          ))}
        </div>


        {/* Logo */}
        <Link href="/">
          <img src="/landing-page/tims_logo.png" alt="logo" className="h-10" />
        </Link>

   
        {/* Right section */}
        <div className="flex items-center gap-3">
          <Search color="white" size={20} />

          {/* Mobile cart */}
          <div className="relative flex md:hidden">
            <ShoppingCart color="white" size={20} />
            <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center absolute top-[-7px] right-[-9px] z-10">
              <h1 className="text-xs">0</h1>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="flex md:hidden" onClick={() => setOpenSidebar(true)}>
            <MenuIcon color="white" size={20} className="cursor-pointer" />
          </div>

          {/* Desktop cart */}
          <Link
            href={'/carts'}
            style={{ background: 'var(--secondary-color)' }}
            className="hidden md:flex items-center px-4 py-2 gap-3 hover:border rounded-md"
          >
            <div className="relative">
              <ShoppingCart color="white" size={20} />
              {carts && (
                <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center absolute top-[-7px] right-[-9px] z-10">
                  <h1 className="text-xs">{carts ? carts.length : '0'}</h1>
                </div>
              )}
            </div>

            <h1 className="text-white text-xs md:text-base">
              {user ? user.fullName : ''}
            </h1>
          </Link>

          {/* Auth */}
          <button onClick={handleLogout} className="cursor-pointer">
            {user ? (
              <Link href={'/auth'}>
                <LogOut color="red" size={20} />
              </Link>
            ) : (
              <Link href={'/auth'}>
                <User size={20} color="white" />
              </Link>
            )}
          </button>
        </div>

      </div>

      {/* ======= Mobile Sidebar ======= */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-black w-[70%] z-50 flex flex-col items-start p-5 transform transition-transform duration-300 ${
          openSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="w-full flex justify-between items-center mb-8">
          <img src="/landing-page/tims_logo.png" alt="logo" className="h-10" />
          <X
            size={24}
            color="white"
            onClick={() => setOpenSidebar(false)}
            className="cursor-pointer"
          />
        </div>

        {/* Nav Links */}
        <div className="flex flex-col w-full">
          {navData.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setOpenSidebar(false)}
              className="text-white py-4 border-b border-gray-700 w-full"
            >
              {item.display}
            </Link>
          ))}
        </div>

      </div>
    </>
  )
}

export default Navbar
