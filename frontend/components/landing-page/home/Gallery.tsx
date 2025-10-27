'use client'
import AnimateTextWord from '@/components/animations/AnimatedText'
import Heading from '@/components/reuseabale/Heading'
import React from 'react'

const heroData = [
  { img: '/landing-page/gallery (1).png' },
  { img: '/landing-page/gallery (2).png' },
  { img: '/landing-page/gallery (3).png' },
  { img: '/landing-page/gallery (4).png' },
  { img: '/landing-page/gallery (5).png' },
  { img: '/landing-page/gallery (6).png' },
]

const Gallery = () => {
  return (
    <div className="min-h-[500px] w-full py-20 bg-black flex  px-4 md:px-8
    flex-col gap-10 m:px-12">

      {/* Heading */}
      <div className="w-full">
   <h1 className="md:text-4xl text-[28px] font-bold text-center text-white hidden md:block">
          <AnimateTextWord type="smallText" align="start">
       Photo Gallery
          </AnimateTextWord>
        </h1>

           <h1 className="md:text-4xl text-[28px] font-bold text-center text-white md:hidden">
          <AnimateTextWord type="smallText" align="center">
       Photo Gallery
          </AnimateTextWord>
        </h1>

      </div>

      {/* Gallery Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {heroData.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[250px]"
          >
            <img
              src={item.img}
              alt={`gallery-${index}`}
              className="w-full h-full object-cover"
            />
            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
