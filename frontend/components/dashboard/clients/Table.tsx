import React from "react";

import ClientHeader from "./Header";


const ClientTable = () => {
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

  return (
    <div className=" w-full border border-gray-700 rounded-lg p-5 bg-[#202938]">
<div>
  <ClientHeader  />
</div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-300 text-sm border-b border-gray-700">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Total</th>
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
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {order.name}
                    </span>
                    <span className="text-gray-400 text-sm">{order.id}</span>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3 px-4 text-gray-300">{order.date}</td>

                {/* Status */}
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : order.status === "Shipped"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Total */}
                <td className="py-3 px-4 text-gray-300 font-semibold">
                  {order.total}
                </td>

                {/* Action */}
                <td className="py-3 px-4 text-center cursor-pointer">
                  <button className="bg-[#374151] hover:bg-[#4b5563] text-white text-sm px-4 py-2 rounded-md transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ClientTable;
