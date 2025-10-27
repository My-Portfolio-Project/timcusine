"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/components/stores/authStore";
import AnimateTextWord from "@/components/animations/AnimatedText";


const ForgotPassword = () => {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { forgotPassword } = useAuthStore(); 

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      // 🔹 If you have a forgotPassword function in your store, use it:
      // const response = await forgotPassword(email);

      // Otherwise, use your API directly:
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent to your email address.");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-start md:items-center 
    md:justify-center justify-end
      ">

      
  
        <div className='md:h-screen flex items-center justify-center overflow-y-scroll scrollbar
        w-full  p-3 md:p-5 '>

            <div className=' rounded-lg max-w-[500px] gap-3 flex flex-col items-center justify-center
              w-full md:min-h-screen pt-20'>


      <form onSubmit={handleSubmit} className="w-full max-w-md p-3 md:p-7 bg-transparent border
         border-[#545454] shadow-md">
        {/* Logo */}
        <Link href="/" className="w-full flex items-center justify-center">
          <img src="/landing-page/tims_logo.png" alt="logo" className="h-10" />
        </Link>

        <h2 className="text-2xl text-white font-semibold text-center mb-6">
          Forgot Password
        </h2>

        {/* Success / Error Message */}
        {message && (
          <div className="mb-4 p-3 rounded text-sm bg-green-100 text-green-700">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded text-sm bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-[#545454] text-white focus:outline-none focus:ring-1 focus:ring-[#a16d57] rounded-md"
            placeholder="Enter your email"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center bg-transparent text-white hover:bg-white hover:text-black border border-[#545454] py-2 px-4 rounded-md transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" /> Sending...
            </>
          ) : (
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              <span>Send Reset Link</span>
            </div>
          )}
        </button>

        {/* Back to Login */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-sm text-white hover:underline"
          >
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </form>
      </div>
      </div>


        {/* image */}
            <div className="relative md:max-w-[70%] w-full md:h-screen h-[30vh] overflow-hidden">
            
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60 z-10" />
            
              {/* Overlay text for LOGIN */}
         
    <div className="absolute inset-0 z-20 flex flex-col justify-end items-start p-8 text-white">
  <div className="max-w-md space-y-4 mb-10 animate-fade-in">
    <h1 className="text-3xl md:text-[44px] font-bold leading-tight">
      <AnimateTextWord type="largeText" align="start">
        Forgot Password? 🔑
      </AnimateTextWord>
    </h1>
    <h1 className="text-base md:text-lg text-gray-200">
      <AnimateTextWord type="smallText" align="start">
        Don’t worry — it happens to the best of us. Enter your email to reset your password.
      </AnimateTextWord>
    </h1>
  </div>
</div>

      
            
            
              {/* Background image */}
              <img
               src="/landing-page/forgot.jpg"
                alt="auth background"
                className="w-full h-full object-cover transition-all duration-500 ease-in-out scale-105 hover:scale-110"
              />
            </div>
    </div>
  );
};

export default ForgotPassword;
