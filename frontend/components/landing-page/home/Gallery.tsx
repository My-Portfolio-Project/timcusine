'use client'
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
    <div className="min-h-[500px] w-full py-20 bg-black flex 
    flex-col gap-10 m:px-12">
      {/* Heading */}
      <div className="md:max-w-[65%] mx-auto text-center items-center justify-center">
        <Heading title="Our Gallery" desc="EXPLORE THE FOOD & AMBIENCE" />
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
