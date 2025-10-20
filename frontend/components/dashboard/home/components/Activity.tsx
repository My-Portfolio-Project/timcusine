'use client';
import React from 'react';

const Activity = () => {
  return (
    <div className="flex flex-col gap-2 rounded-lg py-5 relative px-3">

      <h1 className="text-start text-white text-2xl font-semibold ">
        Activity
      </h1>

      {/* Venn Diagram Wrapper */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Circle 1 */}
        <div className="absolute w-34 h-34 bg-[#6950e9] opacity-80 rounded-full flex 
        items-center justify-center text-white font-semibold text-lg z-30 left-5 top-8 shadow-lg">
          <span>Design</span>
        </div>

        {/* Circle 2 */}
        <div className="absolute w-34 h-34 bg-[#6b7330] opacity-80 rounded-full flex
         items-center justify-center text-white font-semibold text-lg z-20 right top-8 shadow-lg">
          <span>Development</span>
        </div>

        {/* Circle 3 */}
        <div className="absolute w-34 h-34 bg-[#384152] opacity-80 rounded-full flex items-center
         justify-center text-white font-semibold text-lg z-10 top-28 left-1/2 -translate-x-1/2 shadow-lg">
          <span>Strategy</span>
        </div>
      </div>
    </div>
  );
};

export default Activity;

