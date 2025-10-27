'use client'
import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import AnimateTextWord from '@/components/animations/AnimatedText'

const Stats = () => {
  const statsData = [
    {
      title: 'Delicious Dishes Served',
      value: 12000,
      suffix: '+',
    },
    {
      title: 'Happy Customers',
      value: 5000,
      suffix: '+',
    },
    {
      title: 'Years of Excellence',
      value: 10,
      suffix: '+',
    },
    {
      title: 'Locations Worldwide',
      value: 8,
      suffix: '',
    },
  ]

  return (
    <div
      className="flex flex-col items-center lg:items-start   min-h-[500px]
      justify-center gap-10 py-20 px-4 md:px-8 bg-black overflow-hidden"
    >
      {/* desktop Left Text Section */}
      <div className="hidden lg:flex flex-col gap-3 lg:max-w-[60%]">
        <h1 className="md:text-[28px] text-xl text-[#D9D9D9] w-full">
          <AnimateTextWord type="largeText" align="start">
            Unmatched dining experience always
          </AnimateTextWord>
        </h1>

        <h1 className="text-[20px] text-[#D9D9D9] w-full">
          <AnimateTextWord type="smallText" align="start">
            Unforgettable dining experiences across multiple locations
          </AnimateTextWord>
        </h1>
      </div>

         <div className="flex flex-col lg:hidden gap-3 w-full">
        <h1 className="md:text-[28px] text-xl text-[#D9D9D9] w-full">
          <AnimateTextWord type="largeText" align="start">
            Unmatched dining experience always
          </AnimateTextWord>
        </h1>

        <h1 className="text-[20px] text-[#D9D9D9] w-full">
          <AnimateTextWord type="smallText" align="start">
            Unforgettable dining experiences across multiple locations
          </AnimateTextWord>
        </h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full justify-center items-center m:px-8">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-white text-[34px] md:text-[44px] font-bold">
              <CountUp
                end={stat.value}
                duration={2}
                suffix={stat.suffix}
                enableScrollSpy
                scrollSpyOnce
              />
            </h2>
            <p className="text-[#999999] text-[14px] mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Stats
