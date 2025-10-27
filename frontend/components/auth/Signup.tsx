"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Loader2, UserPlus } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";


const Signup = () => {
const router = useRouter()

  // Zustand store values
  const { user, message, register,loading } = useAuthStore();

  // Form state
    const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{fullName?: string; email?: string; password?: string ;
        confirmPassword?: string; message?: string }>({});
   const [success,setSuccess] = useState<boolean>(false)
   const [messages, setShowMesages] = useState(message)

    const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formErrors: { fullName?: string; email?: string; password?: string ;
        confirmPassword?: string
   } = {};

   
 
         if (!fullName) formErrors.fullName = "Full name is required";
    if (!email) formErrors.email = "Email is required";
    if (!password) formErrors.password = "Password is required";
        if (!confirmPassword) formErrors.password = "Password is required";

    setErrors(formErrors);
    

    if (Object.keys(formErrors).length > 0) return;

     if(confirmPassword !== password){
    setShowMesages('Password doesnt match')

     setTimeout('')
    return
   }

    const payload = {fullName, email,password}

    const result = await register(payload)

   

    if(result.success) {
      setSuccess(result.success)

      setFullName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    
    setTimeout(() => {

      if(user?.isVerified === true){
    router.push("/dashboard") } else {
          router.push("/auth/verification")
    };
  }, 1500);

    }

        setConfirmPassword('')


    setTimeout(() => {
      useAuthStore.getState().clearMessage()
    },3000)

  
  };

  return (
    <div className="w-full flex items-center justify-center  min-h-[40vh] bg-transparent
    shadow-md rounded-lg   border-[#545454] border">

      <form
        onSubmit={handleSubmit}
        className="  w-full max-w-md p-7"
      >
  {/* Logo */}
      <Link href="/"
      className="w-full flex items-center justify-center">
        <img src="/landing-page/tims_logo.png" alt="logo" className="h-10" />
      </Link>

        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>

        {/* Success / Message */}
        {messages && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {messages}
          </div>
        )}

          {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none text-white ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#a16d57]"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none text-white ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#a16d57]"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

            {/* Password */}
      <div className="mb-4">
        <label htmlFor="password"
         className="block text-sm font-medium mb-1 text-white">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none pr-10 text-white ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#a16d57]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

           {/* Confirm Password */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-white">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none pr-10 text-white ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#a16d57]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center 
            text-gray-500 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-4">
          <Link href="/forgot-password"
           className="text-sm text-white font-bold hover:underline">
            Forgot Password?
          </Link>
        </div>

{/* Submit Button */}
      <button
  type="submit"
  disabled={loading}
  className="w-full flex items-center justify-center  border   border-[#545454]
   hover:text-black hover:bg-white
    bg-transparent text-white py-2 px-4   cursor-pointer
     disabled:bg-[#d8b8aa] 
    transition disabled:cursor-not-allowed"
>
  {loading ? (
    <>
      <Loader2 className="animate-spin mr-2 h-5 w-5" /> 
    </>
  ) : (
  <div className="flex items-center">


              <UserPlus  className='mr-2 h-5 w-5 ' aria-hidden="true" />
            <span>Signup</span>
             </div>
  )}
</button>



      </form>

    </div>
  );
};

export default Signup;
