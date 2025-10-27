"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import Heading from "@/components/reuseabale/Heading";
import AnimateTextWord from "@/components/animations/AnimatedText";

// Dummy testimonial data
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    message:
      "This was an amazing experience! The food and service exceeded my expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    message:
      "Absolutely loved it here. The staff were friendly and the ambiance was perfect.",
    rating: 4,
  },
  {
    id: 3,
    name: "Michael Smith",
    message:
      "Great value for the price. I’ll definitely recommend this place to friends.",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily Davis",
    message:
      "A wonderful evening — everything from start to finish was perfect.",
    rating: 4,
  },
];

// ⭐ Reusable star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className={
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className='w-full bg-black min-h-[500px]  flex flex-col
     gap-10 items-center justify-center py-20 md:px-12 px-3'>
   

<div className='w-full bg-[#212121]  md:h-[359px] flex flex-col
  gap-5 items-center md:items-start justify-center p-4'>

  <div>
    <h1 className="text-white text-[28px] md:text-4xl">

           <AnimateTextWord type="largeText" align="start">
Reviews from Our Guests
           </AnimateTextWord>
    </h1>
  </div>

 
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Motion Track */}
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {/* Duplicate testimonials for smooth infinite loop */}
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div
              key={idx}
              className="min-w-[300px] max-w-[300px] h-60  border border-[#BFBFBF]
               shadow-md  p-6 flex flex-col justify-between"
            >
          
          <Quote size={34} color="white" />

              {/* Message */}
              <p className="text-[#bfbfbf]  text-sm mb-4 overflow-hidden
               line-clamp-4">
                "{item.message}"
              </p>

              {/* Name */}
                   <h1 className='text-[#BFBFBF] font-semibold text-xl forum text-end'>
                – {item.name}
              </h1>
            </div>
          ))}
        </motion.div>
      </div>

        </div>

    </div>
  );
};

export default Testimonial;
