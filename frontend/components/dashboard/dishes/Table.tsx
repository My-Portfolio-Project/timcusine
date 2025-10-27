'use client'
import dynamic
 from "next/dynamic";
import React, { useEffect, useState } from "react";

import { useDishStore } from "@/components/stores/dishStore";
import { DishesProps } from "@/lib/types/dishes.types";
import { DishProps } from "@/components/interface/dish.interface";
import { Loader2, Pen, PenBox, Star, Stars, Trash2, Trash2Icon, X } from "lucide-react";
import Pagination from "@/components/reuseabale/Pagination";
import UpdateDishes from "./UpdateDishes";
import toast, { Toaster } from "react-hot-toast";


const DishesHeader = dynamic(
  () => import('@/components/dashboard/dishes/Header'),
  {ssr: false}
)


const DishesTable = () => {


    const {dishes, fetchAll, totalPage, deleteDish, loading} = useDishStore()
const [page, setPage] = useState<number>(1)
const totalPages =  totalPage ?? 1


  const [showDelete, setShowDelete] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)

  const [selectedDish, setSelectedDish] = useState<DishProps | null>(null)


  useEffect(() => {
  fetchAll(page, 5)
  }, [fetchAll, page])

  // console.log('All Dishes', dishes)

  const handleShowUpdate = (item: DishProps) => {   
    setShowUpdate(true)
    setSelectedDish(item)
  }

    const handleShowDelete = async(item: DishProps) => {   
    setShowDelete(true)
    setSelectedDish(item)

    const {success, messages} = await deleteDish(item.id) 

    if(success) {
      setShowDelete(false)
      toast.success('Dish  deleted successfully')
    }
  }

  return (
    <div className=" w-full border border-gray-700 rounded-lg p- md:p-5 gap-6 bg-[#202938]">
      <Toaster />

 <div>
  <DishesHeader />
</div>


{/* desktop table */}
      <div className="overflow-x-auto hidden md:block">
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
                    

                    <button  onClick={() => handleShowUpdate(dish)}
                      className="cursor-pointer"
                    >
                      <Pen   color="green" size={16}/>
                    </button>

                    
                    <button onClick={() => handleShowDelete(dish)}
                    className="cursor-pointer"
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

      

      {/* mobile table */}

      <div className="flex flex-col w-full p-3 md:hidden gap-3">

        {
          dishes.map((dish: DishProps) => (
            <div className="w-full border border-gray-700 px-2 flex  rounded-lg py-5
            items-center justify-between">
              
              {/* first div */}
              <div className="flex items-center gap-2">

                       <div className="flex items-center gap-3">
            {/* Product image */}
            <img
       src={dish.image ?? ''}
          alt={dish?.name ?? ''}
              className="w-14 h-16 rounded-lg object-cover"
            />

            {/* Product info */}
            <div className="flex flex-col gap-1">
              <span className="text-white font-medium">
           {dish.name  ?? ''}
              </span>
              <span className="text-gray-400 text-sm">
                { "ID-" + dish?.id?.slice(-5) }
              </span>
            </div>

          </div>


                </div>


{/* second div */}
                <div className="flex flex-col justify-between items-end gap-3">

                       <div
       className={`px-3 py-1 rounded-full text-sm font-medium ${
                      dish?.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : dish?.status === "Inactive"
                        ? "bg-red-300/ text-red-800"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
  {dish.status ?? 'Active'}
</div>


  <div className="flex gap-2">

                    <button>
                      <Pen   color="green" size={16}/>
                    </button>

                    
                    <button onClick={() => setShowDelete(true)}
                    >
                      <Trash2 color="red" size={16} />
                    </button>
  </div>

                </div>

            </div>
          ))
        }

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
    <div className="modal-box shadow-lg shadow-gray-700  bg-[#111828]">

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
          <h1 className="text-white text-[18px] font-semibold">
            {selectedDish?.name ?? 'Dish Name' }</h1>
          <p className="text-xs text-white"> { ''}</p>
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

  {/* show update Modal */}

      {showUpdate &&
        <div className="modal modal-open" role="dialog">
    <div className="modal-box shadow-lg   bg-[#111828] max-w-[1200px] md:h-[500px]">

<UpdateDishes  dish={selectedDish} setShowUpdate={setShowUpdate} />
    </div>

    <div  onClick={() => setShowUpdate(false)}
     className="modal-backdrop cursor-pointer"  />
  </div>
  }

    </div>
  );
};

export default DishesTable;
