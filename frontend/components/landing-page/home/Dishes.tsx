"use client";
import Heading from "@/components/reuseabale/Heading";
import React, { useEffect, useState } from "react";
import { Heart, MoveUpRight, ShoppingCart, Star,  UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useDishStore } from "@/components/stores/dishStore";
import { motion } from 'framer-motion'
import { useCartStore } from "@/components/stores/cartStore";
import { DishProps } from "@/components/interface/dish.interface";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { useAuthStore } from "@/components/stores/authStore";
import { CartProps } from "@/components/interface/cart.interface";



const Dishes = () => {

  // const [page, setPage] = useState<number>(1)
  const {dishes, loading, fetchAll} = useDishStore()
  const {addToCart, updateCart} = useCartStore()
  const {user} = useAuthStore()
  // console.log('All Dishes', dishes)

  useEffect(() => {
    if(dishes.length === 0) {
  fetchAll(1, 8)
    }

  },[dishes, fetchAll])

const handleAddToCart = async (dish: DishProps) => {
  if (!user?.id) {   
    toast.error("You must be logged in to add items to cart");
    return;
  }

  const res = await addToCart(dish); 

  if (res.success) {
    toast.success("Dish added to cart!");
  } else {
    toast.error("Failed to add to cart!");
  }
};




  return (
    <div
     className="flex flex-col items-center bg-black justify-center px-3 md:px-12 gap-10 py-10">

     <Toaster/>
      {/* Heading */}
      <div className="md:max-w-[65%]">
        <Heading title="Our Menu" desc="Our Special Dishes" />
      </div>

      {/* Food Grid */}

   {loading ? (
        <div className="flex flex-col items-center justify-center py-10 text-white">
          <span className="animate-pulse text-gray-400">Loading dishes...</span>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row flex-wrap justify-center ">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="shadow-md hover:shadow-xl transition md:max-w-[300px] w-full relative border border-[#BFBFBF]"
            >
              {/* Image with heart */}
              <div className="relative">
                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full inset-0 z-10
                 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />

                <img
                  src={dish.image}
                  alt={dish.name}
                  className="md:max-w-[300px] w-full md:h-[286px] z-20 object-cover hover:scale-105 transition-transform duration-500"
                />

                <button className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:bg-red-100">
                  <Heart size={18} className="text-red-500 hidden" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-white uppercase">
                  {dish.name}
                </h3>

                <p className="text-base text-[#bfbfbf] font-medium">
                  {dish.desc}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-[#BFBFBF] text-sm">
                    ₦{Number(dish.price ?? 0).toFixed(2)}
                  </p>

                  <button
                  onClick={() => handleAddToCart(dish)}
                    className="flex items-center gap-2 px-3 py-1 bg-transparent text-[#BFBFBF] text-sm 
hover:border-3 cursor-pointer rounded-lg border border-[#545454] hover:bg-[#222]"
                  >
                    <ShoppingCart size={16} />
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    {!loading && dishes.length > 0 && (
        <Link
          href="#"
          className="bg-[#700002] px-8 h-12 rounded-lg flex items-center justify-center text-white text-base hover:bg-[#8a0003] transition-all"
        >
          View Menu
        </Link>
      )}

    </div>
  );
};

export default Dishes;







 function EmptyFoodState() {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[60vh] text-center p-6">
      <div
        className="bg-muted/20 rounded-full p-6 mb-4 shadow-md"
      >
        <UtensilsCrossed className="w-16 h-16 text-gray-500 dark:text-gray-400" />
      </div>

      <h1
        className="text-2xl font-semibold text-gray-800 dark:text-gray-100"
      >
        No Food Available
      </h1>

      <p
        className="text-gray-500 dark:text-gray-400 mt-2 max-w-md"
      >
        Looks like our kitchen is taking a break. C
        heck back later or refresh the page to see new dishes!
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-2 rounded-xl bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow hover:shadow-lg transition"
        onClick={() => window.location.reload()}
      >
        Refresh Menu
      </motion.button>
    </div>
  )
}


  const dishet = [
    {
      id: 1,
      name: "Delicious Burger",
      desc: 'A simple and elegant roll with raw tuna  at the center.',
      price: 8.99,
      rating: 4.5,
      image:
        "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      name: "Cheese Pizza",
      desc: 'A simple and elegant roll with raw tuna  at the center.',
      price: 10.5,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      name: "Fresh Salad",
     desc: 'A simple and elegant roll with raw tuna  at the center.',
      price: 6.75,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      name: "Pasta Bowl",
      desc: 'A simple and elegant roll with raw tuna  at the center.',
      price: 9.25,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60",
    },
      {
      id: 5,
      name: "Delicious Burger",
      desc: 'A simple and elegant roll with raw tuna  at the center.',
      price: 8.99,
      rating: 4.5,
      image:
        "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 6,
      name: "Cheese Pizza",
      desc: 'A simple and elegant roll with raw tuna  at the center.',
      price: 10.5,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 7,
      name: "Fresh Salad",
     desc: 'A simple and elegant roll with raw tuna  at the center.',
      price: 6.75,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 8,
      name: "Pasta Bowl",
      desc: 'A simple and elegant roll with raw tuna  at the center.',
      price: 9.25,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=60",
    },
  ];

