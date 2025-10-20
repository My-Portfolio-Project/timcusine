'use client'
import dynamic
 from "next/dynamic";
import React, { useEffect, useState } from "react";

import { useDishStore } from "@/components/stores/dishStore";
import { DishesProps } from "@/lib/types/dishes.types";
import { DishProps } from "@/components/interface/dish.interface";
import { Loader2, Pen, PenBox, Star, Stars, Trash2, Trash2Icon, X } from "lucide-react";
import Pagination from "@/components/reuseabale/Pagination";


const DishesHeader = dynamic(
  () => import('@/components/dashboard/dishes/Header'),
  {ssr: false}
)


const DishesTable = () => {
  const orders = [
    {
      id: "#001",
      name: "Wireless Headphones",
      image: "/images/headphones.jpg",
      date: "2025-10-05",
      status: "Pending",
      total: "$120.00",
    },
    {
      id: "#002",
      name: "Smartwatch Pro",
      image: "/images/watch.jpg",
      date: "2025-10-06",
      status: "Shipped",
      total: "$250.00",
    },
    {
      id: "#003",
      name: "Gaming Keyboard",
      image: "/images/keyboard.jpg",
      date: "2025-10-07",
      status: "Delivered",
      total: "$95.00",
    },
  ];

    const {dishes, fetchAll, totalPage, deleteDish, loading} = useDishStore()
const [page, setPage] = useState<number>(1)
const totalPages =  totalPage ?? 1


  const [showDelete, setShowDelete] = useState(false)


  useEffect(() => {
  fetchAll(page, 5)
  }, [fetchAll, page])

  console.log('All Dishes', dishes)

  return (
    <div className=" w-full border border-gray-700 rounded-lg p-5 bg-[#202938]">
 <div>
  <DishesHeader />
</div>


{/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            
            <tr className="text-gray-300 text-sm border-b border-gray-700">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Date</th>
               <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th> 
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {dishes.map((dish: DishProps) => (
              <tr
                key={dish.id}
                className="border-b border-gray-800 hover:bg-[#2a3548] transition-colors"
              >
                {/* Product */}
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={dish.image ?? ''}
                    alt={dish?.name ?? ''}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {dish.name  ?? ''}
                    </span>
                    <div className=" items-center flex gap-1">
      

                           <Stars size={14}  color="yellow"/>
        <h1 className="font-bold">
                      {dish?.rating}
                           </h1>
                      </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3 px-4 text-gray-300">{ dish.createdAt ? new Date().toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : ''}</td>


                   {/* Total */}
                <td className="py-3 px-4 text-gray-300 font-semibold">
                  {dish.price}
                </td>


                {/* Status */}
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      dish?.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : dish?.status === "Inactive"
                        ? "bg-red-300/ text-red-800"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {dish?.status  ?? 'Active'}
                  </span>
                </td>

             
                {/* Action */}
                <td className="py-3  text-center cursor-pointer">
                  <div className=" flex items-center gap-2 text-white text-sm px-4 py-2 rounded-md transition">
                    

                    <button>
                      <Pen   color="green" size={16}/>
                    </button>

                    
                    <button onClick={() => setShowDelete(true)}
                    >
                      <Trash2 color="red" size={16} />
                    </button>
                    

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


{/* pagination */}
      <div className="">
<Pagination 
currentPage={page}
totalPages={totalPages}
onPageChange={ (newPage) => setPage(newPage)}
 />
      </div>


{/* show delete Modal */}

      {showDelete &&
        <div className="modal modal-open" role="dialog">
    <div className="modal-box shadow-lg shadow-[#0A0D121A] bg-white">

      <div className="flex  flex-col rounded-lg gap-2">

        <div className="flex items-center justify-between w-full">
          <div className="border-[8px] border-[#FEF3F2] bg-[#FEE4E2] w-12 h-12 rounded-full
          flex items-center justify-center">
          <Trash2Icon  size={28}   color="#F04438"/>
          </div>

          <div onClick={() => setShowDelete(false)}
           className="cursor-pointer">
       <X   size={24}/>
          </div>
   
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[#1A1A1A] text-[18px] font-semibold">Delete brand kit</h1>
          <p className="text-xs text-[#555555]"> { ''}</p>
        </div>


{/* button */}
            <div className="flex items-center justify-center space-x-4 
       py-3 w-full max-w-[550px]">
        <button  onClick={() => setShowDelete(false)}
          type="button"
          className="max-[180px]:w-full w-full px-3 py-2 border border-pri  cursor-pointer
          rounded-xl text-gray-700 text-center"
        >
          Cancel
        </button>

        <button 
          type="submit"
          className="max-[180px]:w-full w-full px-3 py-2 bg-[#F04438] cursor-pointer
           bg-acc text-white rounded-xl "
        >
   {loading ? (
                              <div className="w-full flex items-center justify-center">
                                <Loader2 className="h-5 w-5 animate-spin" />
                              </div>
                            ) : (
                              <span> Delete </span>
                            )}
        </button>

      </div>

    </div>
    
    </div>

    <div className="modal-backdrop cursor-pointer"  />
  </div>
  }

    </div>
  );
};

export default DishesTable;
