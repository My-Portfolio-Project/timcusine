'use client'
import React, { useEffect, useState } from "react";

import ClientHeader from "./Header";
import { useUserStore } from "@/components/stores/userStore";
import { UserProps } from "@/components/interface/user.interface";
import { Users, UtensilsCrossed } from "lucide-react";
import Pagination from "@/components/reuseabale/Pagination";
import {motion} from 'framer-motion'
import LoadingSpinner from "@/components/reuseabale/Loading";
import { useAuthStore } from "@/components/stores/authStore";
import ClientDetails from "./ClientDetails";


const ClientTable = () => {
 


  const { users, user, fetchAllUsers, totalPage} = useUserStore()

  const [loading, setLoading] = useState(false)

    const [page,setPage] = useState<number>(1)
  const totalPages = totalPage ?? 1


   useEffect(() => {
 setLoading(false)
    if(!user?.id) {
    console.log('user not provided')
    setLoading(false)
      return
    }
     fetchAllUsers(user?.id as string, page, 5)
     setLoading(false)

   },[])

       const [showDetails, setShowDetails] = useState(false)
   
       const [selectedClient, setSelectedClient] = useState<UserProps | null>(null)

     const handleShowClient = (item: UserProps) => {   
       setShowDetails(true)
       setSelectedClient(item)
     }

  //  console.log('All Users', users)

  return (
    <div className=" w-full border border-gray-700 rounded-lg p-5 bg-[#202938]">
<div>
  <ClientHeader  />
</div>


{/* desktop  table */}

{
  loading ? (
    <div className="flex flex-col items-center justify-center py-10 text-white">
      <LoadingSpinner />
    </div>
  ) : (
    // ✅ Table Section
    <div className="overflow-x-auto scrollbar hidden md:block">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-300 text-sm border-b border-gray-700">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Contact</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Total Orders</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(users) &&
            users.map((client: UserProps) => (
              <tr
                key={client.id}
                className="border-b border-gray-800 hover:bg-[#2a3548] transition-colors"
              >
                {/* Name + ID */}
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {client.fullName ?? ''}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {client.id && 'ID-' + client.id.slice(-5)}
                    </span>
                  </div>
                </td>

                {/* Contact */}
                <td className="py-3 px-4 text-gray-300">{client.email}</td>

                {/* Role */}
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      client.role === 'User'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : client.role === 'Admin'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {client.role}
                  </span>
                </td>

                {/* Total */}
                <td className="py-3 px-4 text-gray-300 font-semibold">
                  {client?.orders?.length ?? ''}
                </td>

                {/* Action */}
                <td className="py-3 px-4 text-center cursor-pointer">
                  <button  onClick={() => handleShowClient(client)}
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
  )
}



      {/* mobile table */}

      <div className="flex  md:hidden flex-col gap-4">
        {
          Array.isArray(users)  && users.map((client: UserProps) => (
            <div key={client.id}
           className="w-full border border-gray-700 px-2 flex  rounded-lg py-5
            items-center justify-between">

              <div className="flex flex-col gap-1">

                   <h1 className="text-gray-400 text-sm">
                      {client.id && 'ID-' + client.id.slice(-5)}
                    </h1>

                    <h1>{client.fullName ?? ''}</h1>
                    <p>{client.email ?? ''}</p>

              </div>


{/* second div */}
              <div className="flex flex-col gap-3 ">

                   <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      client.role === "User"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : client.role === "Admin"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {client.role}
                  </span>

                             <button  onClick={() => handleShowClient(client)}
          className="btn bg-[#6159e7] border-none text-white hover:bg-[#4e49c6] text-xs
           px-2  rounded-md transition cursor-pointer">
            View
          </button>

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


              { showDetails &&   
               <div className="modal modal-open" role="dialog">
      
                <div className="modal-box shadow-lg  absolute right-0 top-0 h-full md:max-w-[45%] w-full bg-[#111828]">
                  <ClientDetails   clients={selectedClient} setShowDetails={setShowDetails}/>
      
                </div>
      
                <div className="modal-backdrop cursor-pointer"  onClick={() => setShowDetails(false)}/>
      
                  </div>
      
                  }

    </div>
  );
};

export default ClientTable;




 function EmptyState() {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[60vh] text-center p-6">
      <div
        className="bg-muted/20 rounded-full p-6 mb-4 shadow-md"
      >
        <Users className="w-16 h-16 text-gray-500 dark:text-gray-400" />
      </div>

      <h1
        className="text-2xl font-semibold text-gray-800 dark:text-gray-100"
      >
        No Customer  Available
      </h1>

      <p
        className="text-gray-500 dark:text-gray-400 mt-2 max-w-md"
      >
  
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-2 rounded-xl bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow hover:shadow-lg transition"
        onClick={() => window.location.reload()}
      >
        Refresh Menu
      </motion.button>
    </div>
  )
}
