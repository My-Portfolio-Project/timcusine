'use client'
import Link from "next/link";
import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { Loader2, Lock, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import AnimateTextWord from "../animations/AnimatedText";

const Verification = () => {
const router = useRouter()

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loadings, setLoadings] = useState(false);

  const {loading, verifyOtp, requestOtp } = useAuthStore()
  const {user} = useAuthStore()



  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto-focus next input
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleRequestOtp = async(e: React.FormEvent) => {
    e.preventDefault()
    setLoadings(true)

    await requestOtp(user?.email  ?? '')

    setLoadings(false)

  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

     

    if (code.length < 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
     await verifyOtp(user?.email ?? '', code)
    setLoadings(true);
    setError(null);

    setOtp([''])
    router.push('/dashboard')


  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center md:justify-center
     justify-end ">

      
  
        <div className='md:h-screen flex items-center justify-center overflow-y-scroll scrollbar
        w-full  p-3 md:p-5 '>

            <div className=' rounded-lg max-w-[500px] gap-3 flex flex-col items-center justify-center
              w-full md:min-h-screen pt-20'>


      <div className="  p-8 w-full  bg-transparent border
         border-[#545454] shadow-md rounded-lg">
  {/* Logo */}
        <Link href="/"
         className="w-full flex items-center justify-center mb-4">
          <img src="/landing-page/tims_logo.png" alt="logo" className="h-10" />
        </Link>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
                <AnimateTextWord type="largeText" align="start">
          Verify Your Account
                </AnimateTextWord>
        </h2>
        <h1
         className="text-gray-500 text-center mb-6">
                <AnimateTextWord type="smallText" align="start">
          Enter the 6-digit OTP sent to your email
      </AnimateTextWord>
        </h1>

        {/* OTP Input */}
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 border border-gray-300  text-center 
                text-lg font-semibold text-gray-700 focus:outline-none focus:ring-2
                    focus:ring-[#a16d57]"
              />
            ))}
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
          className="w-full flex items-center justify-center hover:text-black  hover:bg-white
          bg-transparent text-white py-2 px-4 rounded-md border  border-[#545454]  disabled:bg-[#d8b8aa] transition 
          disabled:cursor-not-allowed"
        >
            {loading ? 
              <Loader2 className="animate-spin mr-2 h-5 w-5" />  
              : 
            
 <div
  className="flex items-center">
              <Lock  className='mr-2 h-5 w-5 ' aria-hidden="true" />
            <span> Verify </span>
             </div>
          
              
              }
          </button>
        </form>

        {/* Resend OTP */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Didn’t get the code?{" "}
          <button onClick={(e) => handleRequestOtp(e)}
          disabled={loadings}
           className={`text-white  disabled:opacity-50 font-semibold
             hover:underline disabled:cursor-not-allowed cursor-pointer 
             `}>


           Resend OTP 
    
     

      
          </button>
        </p>
      </div>

      </div>
      </div>



    {/* image */}
      <div className="relative md:max-w-[70%] w-full md:h-screen h-[30vh] overflow-hidden">
      
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60 z-10" />
      
        {/* Overlay text for LOGIN */}
   
     <div className="absolute inset-0 z-20 flex flex-col justify-end items-start p-4 md:p-8 text-white">
  <div className="max-w-md space-y-4 mb-10 animate-fade-in">
    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
      <AnimateTextWord type="largeText" align="start">
        Verify OTP 🔐
      </AnimateTextWord>
    </h1>
    <h1 className="text-base md:text-lg text-gray-200">
      <AnimateTextWord type="smallText" align="start">
              We’re verifying your account to keep your information secure.
      </AnimateTextWord>
    </h1>
  </div>
</div>

      
      
        {/* Background image */}
        <img
         src="/landing-page/verify.jpg"
          alt="auth background"
          className="w-full h-full object-cover transition-all duration-500 ease-in-out scale-105 hover:scale-110"
        />
      </div>



    </div>
  );
};

export default Verification;
