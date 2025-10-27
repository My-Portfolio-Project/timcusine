'use client'

import React from 'react'
import { motion } from 'framer-motion'
import AnimateTextWord from '@/components/animations/AnimatedText'

const History = () => {
  return (
    <div
      className="flex flex-col items-center lg:flex-row min-h-[500px]
      justify-center gap-10 py-20 px-4 md:px-8 bg-black overflow-hidden"
    >
      {/* LEFT SECTION (Text + Big Image) */}
      <div className="lg:max-w-[75%] w-full flex flex-col lg:flex-row items-center gap-10">
        {/* LEFT TEXT BLOCK */}
        <div className="flex flex-col gap-4 lg:gap-20 md:max-w-[50%]">
          <div className="md:w-full">
            <h1 className="md:text-4xl text-[28px] text-white w-full ">
              <AnimateTextWord type="largeText" align="start">
                Our History
              </AnimateTextWord>
            </h1>
          </div>

          {/* About the restaurant */}
          <div className="flex flex-col gap-5">
            <h1 className="text-[#999999] text-base w-full lg:w-[85%]">
              <AnimateTextWord type="smallText" align="start">
                Founded years ago with a vision to serve authentic flavors
                crafted from premium ingredients, our restaurant quickly became
                a beloved culinary destination.
              </AnimateTextWord>
            </h1>

            <h1 className="text-[#999999] text-base w-full lg:w-[85%]">
              <AnimateTextWord type="smallText" align="start">
                Our history is not just about food — it’s about the memories
                created at every table, the friendships forged, and the moments
                shared.
              </AnimateTextWord>
            </h1>
          </div>

          <div className="md:w-full">
            <h1 className="text-[#999999] text-base w-full lg:w-[75%]">
              <AnimateTextWord type="smallText" align="start">
                Albert Flores, Founder of TimCuisine.
              </AnimateTextWord>
            </h1>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="w-full relative overflow-hidden rounded-lg">
          {/* overlay animation */}
          <motion.div
            initial={{ width: '100%' }}
            whileInView={{ width: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="bg-black absolute top-0 left-0 h-full z-10"
          ></motion.div>

          {/* image with scale animation */}
          <motion.img
            src="/landing-page/history (2).png"
            alt="Restaurant History"
            className="w-full lg:h-[480px] md:h-[750px] h-[386px] object-cover"
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* RIGHT SMALL SECTION */}
      <div className="flex flex-col gap-6 lg:max-w-[25%] w-full">
        <h1 className="text-[#999999] text-base w-full">
          <AnimateTextWord type="smallText" align="start">
            Every dish tells a story, every meal creates an experience, and
            every guest becomes a part of our ever-growing family.
          </AnimateTextWord>
        </h1>

        {/* Animated Small Image with Overlay */}
        <div className="relative w-full overflow-hidden rounded-lg">
          {/* overlay animation for small image */}
          <motion.div
            initial={{ width: '100%' }}
            whileInView={{ width: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="bg-black absolute top-0 left-0 h-full z-10"
          ></motion.div>

          <motion.img
            src="/landing-page/history (1).png"
            alt="Founder"
            className="hidden lg:block w-full h-[248px] object-cover"
            initial={{ opacity: 0, scale: 1.2 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 1, ease: 'easeOut' },
            }}
            viewport={{ once: true }}
          />
        </div>
      </div>

    </div>
  )
}

export default History
