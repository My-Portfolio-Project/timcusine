'use client'
import AnimateTextWord from '@/components/animations/AnimatedText'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div
      className="flex flex-col-reverse items-center md:flex-row min-h-[500px]
      justify-center gap-10 py-20 px-4 md:px-8 bg-black"
    >
      {/* Left Section */}
      <div className="flex flex-col gap-4 lg:gap-20 md:max-w-[50%]">
        <div className="md:w-full">
          <h1 className="md:text-4xl text-[28px] text-white w-full hidden md:block">
            <AnimateTextWord type="largeText" align="start">
              More than just a restaurant
            </AnimateTextWord>
          </h1>
        </div>

        {/* About the restaurant */}
        <div className="flex flex-col gap-5">
          <h1 className="text-white text-lg uppercase">
            <AnimateTextWord type="largeText" align="start">
              About the restaurant
            </AnimateTextWord>
          </h1>

          <h1 className="text-[#999999] text-base w-full lg:w-[75%]">
            <AnimateTextWord type="smallText" align="start">
              Our journey is rooted in a love for fresh, high-quality ingredients and a dedication to crafting dishes that blend
              tradition with innovation.
            </AnimateTextWord>
          </h1>

          <div className="flex items-center gap-5">
            <Link
              href="/abouts"
              className="bg-transparent px-4 md:px-8 h-12 flex uppercase border border-white/60
               items-center justify-center text-white text-base transition-all duration-300 hover:bg-white hover:text-black"
            >
              More about Timcusine
            </Link>
          </div>

          {/* Animated Image (small image inside text section) */}
          <motion.img
            src="./landing-page/ceo.webp"
            alt="CEO"
            className="hidden lg:block w-full h-[298px] object-cover rounded-lg"
            initial={{ opacity: 0, scale: 0.8, width: '80%' }}
            whileInView={{
              opacity: 1,
              scale: 1,
              width: '100%',
              transition: { duration: 1, ease: 'easeOut' },
            }}
            viewport={{ once: true }}
          />
        </div>
      </div>

      {/* Right Section */}
      <motion.div
        className="md:max-w-[50%] w-full"
        initial={{ opacity: 0, scale: 0.9, width: '80%' }}
        whileInView={{
          opacity: 1,
          scale: 1,
          width: '100%',
          transition: { duration: 1, ease: 'easeOut' },
        }}
        viewport={{ once: true }}
      >
        <motion.img
          src="./landing-page/ceo_two.webp"
          alt="CEO"
          className="w-full md:h-[620px] h-[366px] object-cover rounded-lg"
          whileInView={{ scale: 1.1 }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.4, ease: 'easeInOut' },
          }}
          viewport={{once: true}}
        />
      </motion.div>
    </div>
  )
}

export default About
