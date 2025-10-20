'use client'
import Heading from '@/components/reuseabale/Heading'
import React from 'react'

const About = () => {
  return (
    <div className="flex flex-col items-center md:flex-row min-h-[500px]
      justify-center gap-10 py-20  bg-black">

        <div className="h-full max-w-[500px] w-full">
            <img src= "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60"
            alt=''
            className="w-full h-full rounded-lg"
            />
        </div>


<div className='flex flex-col gap-4 max-w-[500px]'>


        <div className='md:max-w-[65%]'>
            <Heading  title="About Us"  desc="We invite you to  visit our resturant" />
        </div>

     <p className='text-white opacity-70'>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

</p>

<p className='text-white opacity-70'>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
  Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. 

</p>


        </div>
      
    </div>
  )
}

export default About
