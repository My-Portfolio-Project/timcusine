'use client'
import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import OrderSummary from './OrderSummary'
import CartItem from './CartItem'
import { DishesProps } from '@/lib/types/dishes.types'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import Cta from '../home/Cta'
import { useCartStore } from '@/components/stores/cartStore'
import { useAuthStore } from '@/components/stores/authStore'
import { DishProps } from '@/components/interface/dish.interface'
import { CartProps } from '@/components/interface/cart.interface'
import TopNavbar from '@/components/common/TopNavbar'


const CartIndex = () => {
  // ✅ carts should be an array, not a single object
  // const carts: DishesProps[] = []
  const {carts,loading, fetchCart} = useCartStore()
  const {user} = useAuthStore()

useEffect(() => {
  if (!user?.id) {
    console.log('No user');
    return;
  }
  fetchCart(user.id);
}, [user?.id, fetchCart]);

  // console.log('Carts:',carts)

  return (
    <div className='bg-black w-full'>
      <TopNavbar />
      <Navbar />

      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0 py-8 md:py-16 '>
        <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
          <motion.div
            className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* ✅ Check if array is empty instead of comparing to true */}
            {carts.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className='space-y-6 lg:max-w-760%] w-full'>
                {carts.map((item: CartProps) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className='mx-auto mt-6 lg:max-w-[30%] flex-1 space-y-6 lg:mt-0 w-full'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <OrderSummary />
          </motion.div>
        </div>
      </div>

      <Cta />

      <Footer />
    </div>
  )
}

export default CartIndex




const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-4 py-16'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className='h-24 w-24 text-white' />
		<h3 className='text-2xl font-semibold text-white '>Your cart is empty</h3>
		<p className='text-white'>Looks like you {"haven't"} added anything to your cart yet.</p>
		<Link
className='mt-4 rounded-md bg-transparent px-6 py-2 text-black transition-colors '
			href='/'
		>
			Start Shopping
		</Link>
	</motion.div>
);
