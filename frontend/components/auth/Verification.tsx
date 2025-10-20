'use client'
import Link from "next/link";
import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
  {/* Logo */}
        <Link href="/"
         className="w-full flex items-center justify-center mb-4">
          <img src="/landing-page/tims_logo.png" alt="logo" className="h-10" />
        </Link>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#a16d57] mb-2 text-center">
          Verify Your Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

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
                className="w-12 h-12 border border-gray-300 rounded-lg text-center 
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
            className="w-full bg-[#a16d57]  text-white font-semibold flex items-center justify-center
             py-3 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed
                       hover:bg-[#b67a63] disabled:bg-[#d8b8aa] "
          >
            {loading ?   <Loader2 className="animate-spin mr-2 h-5 w-5" />  : "Verify"}
          </button>
        </form>

        {/* Resend OTP */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Didn’t get the code?{" "}
          <button onClick={(e) => handleRequestOtp(e)}
          disabled={loadings}
           className={`text-[#a16d57] hover:text-[#b67a63] disabled:text-[#d8b8aa] disabled:opacity-50 font-semibold
             hover:underline disabled:cursor-not-allowed cursor-pointer 
             `}>
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default Verification;
