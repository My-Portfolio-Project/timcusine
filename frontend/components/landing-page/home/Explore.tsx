'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimateTextWord from '@/components/animations/AnimatedText'
import { DishProps } from '@/components/interface/dish.interface'
import { useDishStore } from '@/components/stores/dishStore'

const Explore = () => {
  const categData = [
    {
      img: '/landing-page/Category Image_3.png',
      title: 'African Dishes',
      subtitle: 'Rich flavors and authentic local recipes',
    },
    {
      img: '/landing-page/Category Image_2.png',
      title: 'Continental Meals',
      subtitle: 'Delicious international cuisine prepared to perfection',
    },
    {
      img: '/landing-page/Category Image.png',
      title: 'Desserts & Drinks',
      subtitle: 'Sweet treats and refreshing beverages for every occasion',
    },
  ]

  const { dishes, loading, fetchAll } = useDishStore()

  useEffect(() => {
    if (dishes.length === 0) {
      fetchAll(1, 8)
    }
  }, [dishes, fetchAll])

  return (
    <div className="flex flex-col px-4 md:px-8 py-16 bg-black text-white">
      {/* ---------- Top Section ---------- */}
      <div className="flex flex-col items-center gap-10 mb-16">
        <h1 className="text-4xl font-bold text-center">
          <AnimateTextWord type="smallText" align="center">
            Explore Our Cuisine
          </AnimateTextWord>
        </h1>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {categData.map((cat, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl overflow-hidden group cursor-pointer h-[380px] "
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Image */}
              <motion.img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover transition-all duration-500 brightness-75 group-hover:brightness-110"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4 }}
              />

              {/* Overlay Text */}
              <div className="absolute inset-0 flex flex-col items-start justify-end px-2
               pb-8 text-center bg-gradient-to-t from-black/70 to-transparent">
                <h2 className="text-2xl text-start font-semibold mb-2">{cat.title}</h2>
                <p className="text-sm text-start text-gray-200 max-w-xs">{cat.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------- Lower Section ---------- */}
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left dishes */}

          
<div className='flex flex-col gap-2'>

<h1 className='text-white text-lg font-semibold font-railway flex gap-2 uppercase '>
         <AnimateTextWord type="largeText" align="start">
 Appetizer
             </AnimateTextWord>
    </h1>
          <div className="flex flex-col gap-6">
            {dishes.slice(0, 4).map((dish: DishProps) => (
              <motion.div
                key={dish.id}
                className="flex items-center gap-5 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={dish.image ?? ''}
                  alt={dish.name}
                  className="w-20 h-20 object-cover "
                />
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-lg font-semibold">{dish.name}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2">{dish.desc}</p>
                </div>
                <p className="text-lg font-bold">₦{dish.price}</p>
              </motion.div>
            ))}
          </div>

</div>
          {/* Right image */}
          <motion.img
            src="/landing-page/Category Image_2.png"
            alt="Featured Dish"
            className="rounded-2xl object-cover w-full h-[500px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Second row flipped */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {/* Left image */}
          <motion.img
            src="/landing-page/Category Image_3.png"
            alt="Special Meal"
            className=" object-cover w-full h-[500px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />


<div className='flex flex-col gap-2'>

<h1 className='text-white text-lg font-semibold font-railway flex gap-2  uppercase'>
         <AnimateTextWord type="largeText" align="start">
    Main Dishes

                </AnimateTextWord>
    </h1>

          {/* Right dishes */}
          <div className="flex flex-col gap-6">
            {dishes.slice(4, 8).map((dish: DishProps) => (
              <motion.div
                key={dish.id}
                className="flex items-center gap-5 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={dish.image ?? ''}
                  alt={dish.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-lg font-semibold">{dish.name}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2">{dish.desc}</p>
                </div>
                <p className="text-lg font-bold">₦{dish.price}</p>
              </motion.div>
            ))}
          </div>


          </div>


        </div>
      </div>
    </div>
  )
}

export default Explore
