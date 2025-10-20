"use client";
import React, { useState, useEffect } from "react";

const HeroSwiper = () => {
  const images = [
    "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60",
  ];

  const [index, setIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full ml-3 md:ml-1 flex items-center justify-center relative">
        
      <div className="relative md:w-[502px] w-[300px] h-[300px] md:h-[400px]">
        {images.map((src, i) => {
        
          const offset = (i - index + images.length) % images.length;

          return (
            <div
              key={i}
              className={`
                absolute w-full h-full rounded-xl overflow-hidden shadow-xl
                transition-all duration-900 ease-in-out
                ${offset === 0 ? "z-30 scale-100 translate-x-0" : ""}
                ${offset === 1 ? "z-20 scale-95 -translate-x-6 opacity-90" : ""}
                ${offset === 2 ? "z-10 scale-90 -translate-x-12 opacity-70" : ""}
              `}
            >
              <img
                src={src}
                alt={`slide-${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSwiper;
