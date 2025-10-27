
'use client'
import React, { useEffect, useState } from "react";
import OrderHeader from "./Header";
import { useOrderStore } from "@/components/stores/orderStore";
import Pagination from "@/components/reuseabale/Pagination";
import OrderDetails from "./OrderDetails";
import { OrderProps } from "@/components/interface/order.interface";

const OrdersTable = () => {


  
      const {orders, fetchAll, totalPage,  loading} = useOrderStore()
  const [page, setPage] = useState<number>(1)
  const totalPages =  totalPage ?? 1
  
  
    const [showDelete, setShowDelete] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const [selectedOrder, setSelectedOrder] = useState<OrderProps | null>(null)
  
  
    useEffect(() => {
    fetchAll(page, 5)
    }, [fetchAll, page])
  
    // console.log('All Orders', orders)
  const handleShowOrder = (item: OrderProps) => {   
    setShowDetails(true)
    setSelectedOrder(item)
  }

  

  return (
    <div className=" w-full border border-gray-700 rounded-lg p-2 md:p-5 gap-5 bg-[#202938]">
<div>
  <OrderHeader  />
</div>


{/* desktop table */}
      <div className="overflow-x-auto hidden md:block">

     <table className="w-full text-left border-collapse">
  <thead>
    <tr className="text-gray-300 text-sm border-b border-gray-700">
      <th className="py-3 px-4">Product</th>
      <th className="py-3 px-4 hidden lg:block">Date</th>
      <th className="py-3 px-4">Status</th>
      <th className="py-3 px-4">Customer</th>
      <th className="py-3 px-4">Total</th>
         <th className="py-3 px-4 hidden lg:block">Payment</th>
      <th className="py-3 px-4 text-center">Action</th>
    </tr>
  </thead>

  <tbody>
    {orders.map((order) => (
      <tr
        key={order.id}
        className="border-b border-gray-800 hover:bg-[#2a3548] transition-colors"
      >
        {/* Product */}
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            {/* Product image */}
            <img
              src={order.items?.[0]?.dish?.image ?? '/placeholder.png'}
              alt={order.items?.[0]?.dish?.name ?? 'Product'}
              className="w-12 h-12 rounded-lg object-cover"
            />

            {/* Product info */}
            <div className="flex flex-col">
              <span className="text-white font-medium">
                {order.items?.[0]?.dish?.name ?? 'Unknown Product'}
              </span>
              <span className="text-gray-400 text-sm">
                { "ID-" + order.items?.[0]?.dish?.id?.slice(-5) }
              </span>
            </div>

            {/* If multiple items */}
            {order.items?.length > 1 && (
              <div className="ml-2 text-gray-400 text-sm">
                +{order.items.length - 1}
              </div>
            )}
          </div>
        </td>

        {/* Date */}
        <td className="py-3 px-4 text-gray-300 hidden lg:block">
          {new Date(order.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </td>

        {/* Status */}
        <td className="py-3 px-4">
     <span
  className={`px-2 py-1 rounded-full text-sm font-medium ${
    order.status === "PENDING"
      ? "bg-yellow-500/20 text-yellow-400"
      : order.status === "DELIVERED"
      ? "bg-green-500/20 text-green-400"
      : order.status === "CANCELLED"
      ? "bg-red-500/20 text-red-400"
      : "bg-gray-500/20 text-gray-400"
  }`}
>
  {order.status}
</span>


        </td>

        {/* Customer */}
        <td className="py-3 px-4 text-gray-300 font-semibold">
          {order.user?.fullName ?? 'Unknown User'}
        </td>

        {/* Total */}
        <td className="py-3 px-4 text-gray-300 font-semibold hidden lg:block">
          <div>
            {order.payment === 'STRIPE' ?
            <h1>
       ${order.totalAmount?.toFixed(2) ?? '0.00'}
            </h1>

            :
            <h1>
     #{order.totalAmount?.toFixed(2) ?? '0.00'}
            </h1>
              
          }

          </div>
        
        </td>

                <td className="py-3 px-4 text-gray-300 font-semibold">
      {order.payment
  ? order.payment.charAt(0).toUpperCase() + order.payment.slice(1).toLowerCase()
  : ''}

        </td>

        {/* Action */}
        <td className="py-3 px-4 text-center cursor-pointer">
          <button  onClick={() => handleShowOrder(order)}
          className="btn bg-[#6159e7] border-none text-white hover:bg-[#4e49c6]
           text-sm px-4 py-2 rounded-md transition cursor-pointer">
            View
          </button>
        </td>

      </tr>
    ))}
  </tbody>
</table>


      </div>


      {/* mobile table */}

      <div className="flex flex-col w-full md:hidden gap-3">

        {
          orders.map((order) => (
             <div className="w-full border border-gray-700 px-2 py-3 flex  rounded-lg 
            items-center justify-between">
              
              {/* first div */}
              <div className="flex items-center gap-2">

                       <div className="flex items-center gap-3">
            {/* Product image */}
            <img
              src={order.items?.[0]?.dish?.image ?? '/placeholder.png'}
              alt={order.items?.[0]?.dish?.name ?? 'Product'}
              className="w-14 h-12 rounded-lg object-cover"
            />

            {/* Product info */}
            <div className="flex flex-col">

              <span className="text-white font-medium">
                {order.items?.[0]?.dish?.name ?? 'Unknown Product'}
              </span>

             <span className="text-gray-400 text-[10px]">
                { "ID-" + order.items?.[0]?.dish?.id?.slice(-5) }
              </span>

  
     <h1 className="text-[10px] text-white">   ${order.totalAmount?.toFixed(2) ?? '0.00'}</h1>

            </div>

          
            {order.items?.length > 1 && (
              <div className="ml-2 text-gray-400 text-sm rounded-full border border-gray-700
               w-7 h-7 flex items-center justify-center">
                +{order.items.length - 1}
              </div>
            )}
          </div>


                </div>


{/* second div */}
                <div className="flex flex-col justify-between items-end gap-3">


                        <button  onClick={() => handleShowOrder(order)}
          className="btn bg-[#6159e7] border-none text-white hover:bg-[#4e49c6]
           text-[10px] px-2 h-5 rounded-md transition cursor-pointer">
            View
          </button>

                       <div
  className={`px-2 py-1 rounded-full text-[8px] font-medium ${
    order.status === "PENDING"
      ? "bg-yellow-500/20 text-yellow-400"
      : order.status === "DELIVERED"
      ? "bg-green-500/20 text-green-400"
      : order.status === "CANCELLED"
      ? "bg-red-500/20 text-red-400"
      : "bg-gray-500/20 text-gray-400"
  }`}
>
  {order.status}
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



{/* Show Details */}
        { showDetails &&   
         <div className="modal modal-open" role="dialog">

          <div className="modal-box shadow-lg  absolute right-0 top-0 h-full md:max-w-[45%] w-full bg-[#111828]">
            <OrderDetails   orders={selectedOrder} setShowDetails={setShowDetails}/>

          </div>

          <div className="modal-backdrop cursor-pointer"  onClick={() => setShowDetails(false)}/>

            </div>

            }


    </div>
  );
};

export default OrdersTable;
