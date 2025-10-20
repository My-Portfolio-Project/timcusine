'use client'
import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null; // hide if only 1 page

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      {/* Previous button */}
      <button
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded transition cursor-pointer ${
            p === currentPage ? 'bg-[#6159e7] text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {/* Next button */}
      <button
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
