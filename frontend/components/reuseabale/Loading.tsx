'use client'
import { Loader2 } from "lucide-react"

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-[#6159e7] p-4 rounded-full">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    </div>
  )
}

export default LoadingSpinner
