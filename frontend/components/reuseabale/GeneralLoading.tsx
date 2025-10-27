'use client'

import React from 'react'
import { motion } from 'framer-motion'

const GeneralLoading = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <motion.img
        src="/landing-page/tims_logo.png"
        alt="Tims Logo"
        className="w-32 h-24 md:w-52 md:h-40 object-contain"
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: [
            '0 0 20px rgba(255, 255, 255, 0.2)',
            '0 0 40px rgba(255, 255, 255, 0.6)',
            '0 0 20px rgba(255, 255, 255, 0.2)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export default GeneralLoading
