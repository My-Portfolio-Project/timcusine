'use client';
import React, { useState } from 'react';
import CreateClient from './CreateClient';

const ClientHeader = () => {
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
              placeholder="Search clients..."
              className="input input-bordered bg-[#111828] text-white md:w-72 border-none
               focus:outline-none focus:ring-2 focus:ring-[#6159e7] rounded-lg"
            />
          </div>
        </div>

        {/* Right Side: Add Client Button */}
        <div>
          <button
            onClick={handleOpen}
            className="btn bg-[#6159e7] border-none text-white hover:bg-[#4e49c6] hidden"
          >
            + Add Client
          </button>
        </div>
      </div>

      {/* DaisyUI Modal */}
      <dialog className={`modal ${showClient ? 'modal-open' : ''}`}>
        
        <div className="modal-box bg-[#202938] text-white max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Client</h3>
            <button
              onClick={handleClose}
              className="btn btn-sm btn-circle bg-[#111828] text-white border-none hover:bg-[#2a344a]"
            >
              ✕
            </button>
          </div>

          {/* Form Component */}
          <CreateClient />
        </div>

        {/* Backdrop click closes modal */}
        <form method="dialog" className="modal-backdrop" onClick={handleClose}>
          <button>close</button>
        </form>

      </dialog>
    </div>
  );
};

export default ClientHeader;
