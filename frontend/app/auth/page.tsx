'use client'
import AnimateTextWord from '@/components/animations/AnimatedText'
import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import ProtectedRoute from '@/components/protection/Protected'
// import Footer from '@/components/common/Footer'
// import Navbar from '@/components/common/Navbar'
import React, { useState } from 'react'

const AuthPage = () => {
const [ selected, setSelected ] = useState<string | null>("login")   

  return (
    <ProtectedRoute>
      
    <div className='flex flex-col md:flex-row bg-black  gap-5 overflow-hidden'>
        {/* <Navbar  /> */}

{/* image */}
<div className="relative md:max-w-[70%] w-full md:h-screen h-[30vh] overflow-hidden">

  {/* Overlay gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60 z-10" />

  {/* Overlay text for LOGIN */}
  {selected === 'login' && (
    <div className="absolute inset-0 z-20 flex flex-col justify-end items-start p-8 text-white">
      <div className="max-w-md space-y-4 mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                           <AnimateTextWord type="largeText" align="start"> 
          Welcome Back 👋
            </AnimateTextWord>
        </h1>
        <h1 className="text-base md:text-lg text-gray-200">
                       <AnimateTextWord type="smallText" align="start">
          Sign in to continue your shopping experience — your favorite products are waiting.
                 </AnimateTextWord>
        </h1>
      </div>
    </div>
  )}

  {/* Overlay text for SIGNUP */}
  {selected === 'signup' && (
    <div className="absolute inset-0 z-20 flex flex-col justify-end items-start p-8 text-white">
      <div className="max-w-md space-y-4 mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                 <AnimateTextWord type="largeText" align="start"> 
      
          Create Your Account ✨
                      
                 </AnimateTextWord>
        </h1>
        <h1 className="text-base md:text-lg text-gray-200">
             <AnimateTextWord type="smallText" align="start">
          Join our community and start exploring the best deals crafted just for you.
          </AnimateTextWord>
        </h1>
      </div>
    </div>
  )}

  {/* Background image */}
  <img
    src={
      selected === "login"
        ? "/landing-page/auth (1).jpg"
        : "/landing-page/auth (2).jpg"
    }
    alt="auth background"
    className="w-full h-full object-cover transition-all duration-500 ease-in-out scale-105 hover:scale-110"
  />
</div>



{/* form */}
        <div className='md:h-screen flex items-center justify-center overflow-y-scroll scrollbar bg-black
        w-full  p-3 md:p-5 '>

            <div className=' rounded-lg max-w-[500px] gap-3 flex flex-col items-center justify-center  bg-black
              w-full md:min-h-screen pt-20'>

         
                <div className='flex w-full bg-tranparent p-[1px] rounded-lg   border-[#545454]'>
                    {
                        ['login', 'signup'].map((item, index) => (
                            <button 
                            onClick={() => setSelected(item)}
                            key={index}     
          className={`rounded-[1px] w-full  h-10 cursor-pointer border-[0.5px]  hover:text-black hover:bg-white
    ${selected === item ?  'border[1px] bg-white text-black  hover:text-white hover:bg-none' 
    : 'bg-transparent text-white'}`}
                    >
{item.charAt(0).toUpperCase() + item.slice(1)}

                    </button>
                        ))}

                </div>

                { selected === "login" ?  
                <div className="w-full bg-black h-full">
                    <Login  />
                </div>
                :
                <div className='w-full bg-black h-full md:mt-2 '>
                <Signup  />
                </div>
                }

            </div>

        </div>

        {/* <Footer  /> */}
      
    </div>
    </ProtectedRoute>
  )
}

export default AuthPage
