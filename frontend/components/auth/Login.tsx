"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeClosed, EyeOff, Loader2, UserPlus } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { API_URL } from "../hooks/Api";
import { useRouter } from "next/navigation";
import { useUserStore } from "../stores/userStore";


const Login = () => {
  // Form state
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success,setSuccess] = useState<boolean>(false)




  const { login, message,  loading } = useAuthStore();
  const {userProfile} = useUserStore()

  // console.log('user details',user)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();


  const formErrors: { email?: string; password?: string } = {};
  if (!email) formErrors.email = "Email is required";
  if (!password) formErrors.password = "Password is required";
  setErrors(formErrors);
  if (Object.keys(formErrors).length > 0) return;

  const result = await login(email, password);
  await userProfile()


  // console.log("Success state:", result);

if (result.success && result.user) {
  const user = result.user;
  console.log('Login details:', user)

  if (!user.isVerified) {
    router.push("/auth/verification");
  } else if (user.role === "ADMIN") {
    router.push("/dashboard");
  } else {
    router.push("/");
  }
} else {
  console.log("Login failed:", result.message);
}


  setTimeout(() => {
    useAuthStore.getState().clearMessage();
  }, 3000);

};




  return (
    <div className="w-full flex items-center justify-center 
    min-h-[30vh] bg-transparent border   border-[#545454] shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-7">
        {/* Logo */}
        <Link href="/" className="w-full flex items-center justify-center">
          <img src="/landing-page/tims_logo.png" alt="logo" className="h-10" />
        </Link>

        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* ✅ Success / Error Message */}
       {message && (
  <div
    className={`mb-4 p-3 rounded text-sm ${
      // ✅ store.success may be stale; use the current attempt if needed
      success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }`}
  >
    {message}
  </div>
)}


        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" 
          className="block text-sm font-medium mb-1 text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2  focus:outline-none text-white
              border   border-[#545454] ${
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
          className="block text-sm font-medium 
          mb-1 text-white">
            Password
          </label>
          <div className="flex items-center border rounded-md
           px-3   border-[#545454]">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
       className={`w-full  py-2  focus:outline-none   text-white
               ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-[#a16d57]"
            }`}
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer text-gray-500 hover:text-gray-700 ml-2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-4">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-white font-bold hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center hover:text-black  hover:bg-white
          bg-transparent text-white py-2 px-4 rounded-md border  border-[#545454]  disabled:bg-[#d8b8aa] transition 
          disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" /> Logging in...
            </>
          ) : (
 <div
  className="flex items-center">
              <UserPlus  className='mr-2 h-5 w-5 ' aria-hidden="true" />
            <span>Login</span>
             </div>
          )}
        </button>
      </form>
    </div>
  );
};


export default Login;
