'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import CreateDishes from './CreateDishes';
import { useDishStore } from '@/components/stores/dishStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const DishesHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { searchDish, fetchAll } = useDishStore();

  // 🔍 Handle search submit
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    params.set('searchTerm', searchTerm);

    const newUrl = `/dashboard/dishes?${params.toString()}`;
    router.push(newUrl);

    await searchDish(searchTerm);
  };

const handleClearSearch = async () => {
  setSearchTerm('');
  router.push('/dashboard/dishes');
  await fetchAll(); 
};



useEffect(() => {
  const searched = searchParams.get('searchTerm');

  // Double-check if the URL actually has the query param
  const hasSearchParam = window.location.search.includes('searchTerm=');

  if (hasSearchParam && searched && searched.trim() !== '') {
    // ✅ Search case
    setSearchTerm(searched);
    searchDish(searched);
  } else {
    // ✅ No searchTerm → fetch all
    setSearchTerm('');
    fetchAll();
  }
}, [searchParams]);


  return (
    <div className="flex flex-col items-center justify-between w-full relative h-full text-white">

      <Toaster  />
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between p-3 bg-[#202938] rounded-lg">
        {/* Left Side: Filter + Search */}
        <div className="flex items-center gap-4 relative">
          {/* Filter Dropdown */}
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
              className="dropdown-content menu bg-[#202938] rounded-box w-44 mt-2"
            >
              {['All', 'Pending', 'History'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setFilter(item)}
                    className={`text-sm ${
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
          <form
            onSubmit={handleSearch}
            className="relative flex items-center"
          >
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered bg-[#111828] text-white md:w-72 border-none
               focus:outline-none focus:ring-2 focus:ring-[#6159e7] rounded-lg pl-3 pr-10"
            />

          {searchTerm && (
  <button
    type="button"
    onClick={() => handleClearSearch()}
    className="absolute right-3 top-2.5 z-10 cursor-pointer"
  >
    <X className="h-5 w-5 text-[#6159e7]" />
  </button>
)}

          </form>

        </div>

        {/* Right Side: Add Dish Button */}
        <button
          onClick={() => setShowModal(true)}
          className="btn bg-[#6159e7] border-none text-white hover:bg-[#4e49c6]"
        >
          + Add Dish
        </button>
      </div>

      {/* Modal */}
      <dialog className={`modal ${showModal ? 'modal-open' : ''}`}>

        <div className="modal-box bg-[#202938] text-white max-w-[1200px] md:h-[500px] my-2 md:my-5">
          <div className="flex justify-between items-center my-2 md:my-5">
            <h3 className="text-lg font-semibold">Add New Dish</h3>
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-sm btn-circle bg-[#111828] text-white border-none hover:bg-[#2a344a]"
            >
              ✕
            </button>
          </div>

          {/* Form Component */}
          <CreateDishes />
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop" onClick={() => setShowModal(false)}>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DishesHeader;
