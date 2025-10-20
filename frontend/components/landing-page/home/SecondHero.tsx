'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const heroData = [
  { img: '/landing-page/gallery (1).png' },
  { img: '/landing-page/gallery (2).png' },
  { img: '/landing-page/gallery (3).png' },
  { img: '/landing-page/gallery (4).png' },
  { img: '/landing-page/gallery (5).png' },
  { img: '/landing-page/gallery (6).png' },
]


interface MarqueeProps {
  direction?: 'left' | 'right'
  speed?: number
}

const Marquee: React.FC<MarqueeProps> = ({ direction = 'left', speed = 30 }) => {
  return (
    <div className="overflow-hidden w-full flex">
      <motion.div
        className="flex gap-0"
        animate={{
          x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {[...heroData, ...heroData].map((item, idx) => (
          <img
            key={idx}
            src={item.img}
            alt="gallery"
            className="w-[300px] h-[200px] object-cover rounded-2xl"
          />
        ))}
      </motion.div>
    </div>
  )
}

const SecondHero: React.FC = () => {
  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">

      {/* === 3 Animated Marquees === */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center">
        <Marquee direction="left" speed={100} />
        <Marquee direction="right" speed={75} />
        <Marquee direction="left" speed={100} />
      </div>



       {/* === Overlay gradient (darker) === */}
<div
  className="absolute inset-0 bg-gradient-to-b 
  from-black/90 via-black/40 to-black/90"
/>


      {/* === Overlay Content === */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center px-4">
        <h1 className="uppercase text-4xl md:text-[80px] md:leading-[89px] font-bold forum mb-4">
          Authentic Food
        </h1>
        <p className="text-base md:text-lg max-w-xl mb-8">
          Experience the Art of Sushi: Fresh, Authentic, <br />and Exquisite Delights
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="#"
            className="bg-[#700002] px-8 h-12 rounded-lg flex items-center justify-center text-white text-base hover:bg-[#8a0003] transition-all"
          >
            Book Now
          </Link>

          <Link
            href="#"
            className="bg-transparent px-8 h-12 rounded-lg flex items-center justify-center text-white text-base border border-white hover:bg-white hover:text-black transition-all"
          >
            View Menu
          </Link>
        </div>
      </div>

    </div>
  )
}

export default SecondHero
