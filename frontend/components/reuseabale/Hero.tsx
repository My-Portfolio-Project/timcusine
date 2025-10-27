'use client';
import Link from 'next/link';
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface ReuseableHeroProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  overlayColor?: string;
  textPosition?: 'start' | 'center' | 'end';
}

export default function ReuseableHero({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageUrl,
  overlayColor = 'bg-black/40',
  textPosition = 'center',
}: ReuseableHeroProps) {
  const alignment =
    textPosition === 'start'
      ? 'items-start text-left'
      : textPosition === 'end'
      ? 'items-end text-right'
      : 'items-center text-center';

  // ✅ Type-safe animation variant for Framer Motion v11+
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, // cubic-bezier for "easeOut"
    },
  };

  return (
    <div className="relative w-full h-[70vh] flex justify-center overflow-hidden rounded-2xl">

      

      {/* Background Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover hidden "
        />
      )}

  

      {/* Animated Content */}
      <motion.div
        className={`relative z-[2] flex flex-col justify-center
           items-start ${alignment} text-white gap-5 px-4 md:px-8`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h1
          variants={fadeUp}
           className='text-[#1b1c1b] md:text-[240px] text-[140px] h-[160px] text-center  md:text-start md:h-[260px]'
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.h1
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-lg md:text-xl font-light opacity-90 text-center md:text-start"
          >
            {subtitle}
          </motion.h1>
        )}

        {buttonText && buttonLink && (
          <motion.div variants={fadeUp} transition={{ delay: 0.4 }}>
            <Link
              href={buttonLink}
              className="mt-4 bg-[#035925] hover:bg-[#02491E] transition-all text-white font-medium px-5 py-3 rounded-full inline-flex items-center justify-center"
            >
              {buttonText}
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
