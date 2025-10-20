"use client";
import React from "react";
import { ShoppingCart, Star } from "lucide-react";

const FeaturedFood = () => {
  const foods = [
    {
      id: 1,
      title: "Delicious Burger",
      price: 8.99,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "Cheese Pizza",
      price: 10.5,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1601924579440-0f26c48e2c6b?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      title: "Fresh Salad",
      price: 6.75,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&auto=format&fit=crop&q=60",
    },
      {
      id: 4,
      title: "Fresh Meat",
      price: 6.75,
      rating: 4.3,
      image:
        "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 
     md:p-6 w-full overflow-x-hidden">
      {foods.map((food) => (
        <div
          key={food.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all flex p-1 md:p-3 gap-2
          duration-300  w-full max-w-[350px] h-[100px] md:h-[125px]"
        >
          {/* Image */}
          <div className=" w-full max-w-[50%] overflow-hidden rounde-2xl">
            <img
              src={food.image}
              alt={food.title}
              className="w-full h-full  hover:scale-105 transition-transform duration-500 rounded-2xl"
            />
          </div>

          {/* Content */}
          <div className=" flex flex-col gap-1 w-full">
            {/* Rating */}
            <div className="flex items-center text-yellow-500">
            
                <Star
                 
                  size={16}
                  className="fill-yellow-500"
                />
              <span className=" text-gray-600 text-sm">
                {food.rating.toFixed(1)}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm md:text-base font-semibold text-gray-800">
              {food.title}
            </h3>

            {/* Price & Cart */}
            <div className="flex items-center justify-between w-full">
              <span className=" text-sm md:text-lg font-bold text-green-600">
                ${food.price.toFixed(2)}
              </span>
              <button className="p-2 rounded-full bg-green-500 hover:bg-green-600
               text-white transition">
                <ShoppingCart size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedFood;
