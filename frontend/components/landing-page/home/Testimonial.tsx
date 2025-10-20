"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import Heading from "@/components/reuseabale/Heading";

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
    <div className="flex flex-col items-center min-h-[500px]
     justify-center gap-10 py-10 overflow-hidden bg-black">
      {/* Heading */}
      <div className="md:max-w-[65%] text-center">
        <Heading title="Testimonials" desc="What Our Visitors Say" />
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
              className="min-w-[300px] max-w-[300px] h-40  border border-[#BFBFBF]
               shadow-md  p-6 flex flex-col justify-between"
            >
              {/* Rating */}
              <StarRating rating={item.rating} />

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
  );
};

export default Testimonial;
