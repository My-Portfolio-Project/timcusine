'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimateTextWord from '@/components/animations/AnimatedText'

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
            className="md:w-[300px] w-1/2 h-[200px] object-cover rounded-2xl"
          />
        ))}
      </motion.div>
    </div>
  )
}

const SecondHero: React.FC = () => {
  return (
    <div className="relative md:h-screen h-[70vh] w-full
     text-white overflow-hidden">

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex 
      flex-col items-center justify-center text-center px-4">
        <h1 className="uppercase text-5xl md:text-[80px] lg:text-[120px] lg:leading-[128px] md:leading-[89px] 
        font-extrabold forum mb-4 railway">
          <AnimateTextWord type='largeText' align='center'>
     
          Authentic Food
                 
          </AnimateTextWord>
        </h1>
        <h1 className="text-base md:text-lg md:max-w-xl mb-8">
             <AnimateTextWord type='smallText'  align='center'>
         We bring you a fusion of flavours crafted with passion.From fresh ingredients
to expertly prepared dishes, every bite is a celebration.
                    </AnimateTextWord>
        </h1>

        <div className="flex items-center gap-5">
          <Link
            href="#"
            className="bg-white px-4 md:px-8 h-12 rounded-lg flex uppercase
             items-center justify-center text-black text-base  transition-all"
          >
            Book Now
          </Link>

   
        </div>

      </div>

    </div>
  )
}

export default SecondHero
