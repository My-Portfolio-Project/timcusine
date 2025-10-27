'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'


// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/pagination'

import { Utensils } from 'lucide-react'
import AnimateTextWord from '@/components/animations/AnimatedText'

const Journey = () => {
  const littleData = [
    {
      icon: '/landing-page/Journey Icon.png',
      title: 'Serving Excellence for 15+ Years',
    },
    {
      icon: '/landing-page/Journey Icon (1).png',
      title: 'Daily fresh ingredients, no compromises',
    },
    {
      icon: '/landing-page/Journey Icon (2).png',
      title: 'Over 1,000 online reservations monthly',
    },
  ]

  const biggerData = [
    {
      img: '/landing-page/journey (1).png',
      title: 'Signature Dishes',
      subtitle:
        'Our signature dishes are crafted with passion, using the finest ingredients and time-honored recipes.',
    },
    {
      img: '/landing-page/journey (2).png',
      title: 'Cultural Flavors',
      subtitle:
        'Experience a fusion of global cuisines that tell stories of tradition and creativity.',
    },
    {
      img: '/landing-page/journey (1).png',
      title: 'Timeless Taste',
      subtitle:
        'Every bite connects you to rich traditions and culinary excellence that stand the test of time.',
    },
    {
      img: '/landing-page/journey (2).png',
      title: 'Chef’s Craft',
      subtitle:
        'Each dish is designed with precision, bringing the perfect harmony of flavor and presentation.',
    },
    {
      img: '/landing-page/journey (1).png',
      title: 'Fresh Ingredients',
      subtitle:
        'We carefully select every ingredient to ensure freshness and authenticity in every meal.',
    },
    {
      img: '/landing-page/journey (2).png',
      title: 'Inspired Dining',
      subtitle:
        'Our menu evolves with creativity, delivering new flavors while preserving the classics.',
    },
  ]

  return (
    <div
      className="flex flex-col items-center md:flex-row min-h-[500px]
      justify-center gap-10 py-20 px-4 md:px-8 bg-black overflow-hidden"
    >
      {/* Left Section */}
      <div className="flex flex-col justify-between h-full w-full lg:max-w-[50%]">
        {/* Headings */}
        <div className="flex flex-col gap-3">
          <h1 className="text-[28px] md:text-4xl text-white w-full">
            <AnimateTextWord type="largeText" align="start">
              A journey through taste & culture
            </AnimateTextWord>
          </h1>

          <h1 className="text-base w-full text-[#999999]">
            <AnimateTextWord type="smallText" align="start">
              Embark on a flavorful adventure where rich traditions and
              authentic tastes come together in every bite.
            </AnimateTextWord>
          </h1>
        </div>

        {/* Mini Data */}
        <div className="flex flex-col gap-4 mt-10">
          {littleData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-[#D9D9D9] text-sm"
            >
  <img
                  src={item.icon}
                  alt={item.title}
                  className="w-6 h-6 object-cover "
                />

              <span>{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Swiper Section */}
      <div className="w-full lg:max-w-[50%]">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          className="w-full"
        >
          {biggerData.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative  overflow-hidden group"
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[340px] object-cover "
                />

                {/* Overlay for small screens */}
                <div className="absolute inset-0 bg-black/60 md:hidden flex flex-col justify-end p-4 transition-all duration-500">
                  <h2 className="text-white text-lg font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-[#D9D9D9] text-sm">{item.subtitle}</p>
                </div>

                {/* Overlay (desktop hover effect) */}
                <div className="absolute inset-0 hidden md:flex flex-col justify-end bg-gradient-to-t
                 from-black/70 via-black/30 to-transparent  transition-all duration-500 p-5">
                  <h2 className="text-white text-lg font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-[#D9D9D9] text-sm">{item.subtitle}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Journey
