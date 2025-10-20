'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { LogOut, MenuIcon, Search, ShoppingCart, User } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'next/navigation'
import { useCartStore } from '../stores/cartStore'

const navData = [
  { path: '/', display: 'Home' },
    { path: '/', display: 'About Us' },
  { path: '/', display: 'Shop' },
  { path: '/', display: 'Contact' },
]

const Navbar = () => {
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        menuRef.current?.classList.add('sticky-header')

        navContainerRef.current
          ?.querySelectorAll('h1')
          .forEach((el) => {
            el.classList.remove('text-white')
            el.classList.add('text-[#a16d57]')
          })
      } else {
        menuRef.current?.classList.remove('sticky-header')

        navContainerRef.current
          ?.querySelectorAll('h1')
          .forEach((el) => {
            el.classList.remove('text-[#a16d57]')
            el.classList.add('text-white')
          })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

const {user, setUser} = useAuthStore()
const {  userProfile } = useUserStore()
const {carts} =  useCartStore()

let users = user

useEffect(() => {
  userProfile()
},[userProfile, user])


const handleLogout = () => {
  localStorage.removeItem("token")
 setUser(null)
  router.push("/auth")

}

// console.log('User details:', user)

  return (
    <div
      ref={menuRef}
      className="h-14 w-full flex items-center justify-between
       p-3 md:p-5 rounded-[1px] bg-[#121212]"
    >
      {/* Logo */}
      <Link href="/">
        <img src="/landing-page/tims_logo.png" alt="logo" className="h-10" />
      </Link>

      {/* Nav links */}
      <div
        ref={navContainerRef}
        className="hidden md:flex items-center gap-4"
      >
        {navData.map((item, index) => (
          <Link key={index} href={item.path}>
            <h1 className="text-white text-lg">{item.display}</h1>
          </Link>
        ))}
      </div>

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
        <div className="flex md:hidden">
          <MenuIcon color="white" size={20} />
        </div>

        {/* Desktop order button */}
        <Link href={ "/carts"}
          style={{ background: 'var(--secondary-color)' }}
          className="hidden md:flex items-center px-4
           py-2  gap-3 hover:border rounded-md"
        >
          <div className="relative">
            <ShoppingCart color="white" size={20} />
    { carts &&        <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center absolute top-[-7px] right-[-9px] z-10">
              <h1 className="text-xs">{carts ? carts.length  : '0' } </h1>
            </div>
            }
          </div>

          <h1 className="text-white text-xs md:text-base">{user ? user.fullName : ''}</h1>
        </Link>

        <button onClick={handleLogout}
         className='cursor-pointer'>
        {user ?  
                <Link href={  "/auth"}>
                
                <LogOut   color='red' size={20}/>

                </Link>
        : 
           <Link href={  "/auth"}>
        <User size={20}  color='white' /> 
          </Link>
        }
          
        </button>

      </div>
    </div>
  )
}

export default Navbar
