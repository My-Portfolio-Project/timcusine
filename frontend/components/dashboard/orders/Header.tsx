'use client';
import React, { useState } from 'react';


const OrderHeader = () => {
  const [showClient, setShowClient] = useState(false);
  const [filter, setFilter] = useState('All');

  const handleOpen = () => setShowClient(true);
  const handleClose = () => setShowClient(false);

  return (
    <div className="flex flex-col items-center justify-between w-full relative h-full text-white">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between p-3 bg-[#202938] rounded-lg">
        {/* Left Side: Filter + Search */}
        <div className="flex items-center gap-4">
          {/* Dropdown Filter */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-[#111828] text-white border-none hover:bg-[#2a344a]"
            >
              {filter}
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-[#202938] rounded-box w-44  mt-2"
            >
              {['All', 'Pending', 'History'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setFilter(item)}
                    className={`text-sm shadow ${
                      filter === item ? 'text-[#6159e7]' : 'text-white'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Search Bar */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Search orders..."
              className="input input-bordered bg-[#111828] text-white md:w-72 border-none
               focus:outline-none focus:ring-2 focus:ring-[#6159e7] rounded-lg"
            />
          </div>
        </div>

 
      </div>



    </div>
  );
};

export default OrderHeader;
