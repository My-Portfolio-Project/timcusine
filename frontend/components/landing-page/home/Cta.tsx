'use client'
import React from 'react'
import Link from 'next/link'

const Cta = () => {
  return (
    <div className="relative w-full min-h-[500px] flex items-center justify-start px-6 md:px-12 overflow-hidden">

      {/* === Background Image === */}
      <img
        src="/landing-page/gallery (6).png"
        alt="CTA background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* === Overlay (dark left → bright right) === */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-white/20" />

      {/* === Content === */}
      <div className="relative z-10 max-w-xl text-left text-white space-y-5">
        <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight">
          Experience True Taste
        </h2>

        <p className="text-lg md:text-xl text-gray-200 max-w-md">
          Discover flavors that tell a story. Fresh ingredients, authentic recipes, and unforgettable moments.
        </p>

        <Link
          href="#"
          className="inline-block bg-[#700002] hover:bg-[#8a0003] transition-all duration-300 text-white px-8 py-3 rounded-lg text-base font-medium"
        >
          Reserve a Table
        </Link>
      </div>

    </div>
  )
}

export default Cta
