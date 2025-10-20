import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import HeroSwipper from './HeroSwipper'
import FeaturedFood from './FeaturedFood'

const Hero = () => {
  return (
    <div className='min-h-[80vh]  2xl:min-h-[40vh] w-full  flex flex-col items-center '>

        <div className='flex flex-col-reverse md:flex-row justify-center w-full  p-2
        md:p-5 md:gap-10'>

{/* text */}
            <div className='relative flex flex-col items-center md:items-start gap-6'>

                <span className=' animate-spin'>
                    🌸
                </span>

                <h1 className='md:text-6xl text-5xl font-semibold text-white text-center md:text-start
                 md:heading-[55px] w-[80%] md:w-full'>
                    Where  <span  style={{
                        color: 'var(--yellow-color)'
                    }}>Every</span> <br className='hidden md:block' />
                    Meal Feels Like <br  className='hidden md:block' />
                    <span
                    style={{
                        color: 'var(--yellow-color)'
                    }}>Meal</span>

                </h1>

                <p className='text-white opacity-80 w-[80%] text-center md:text-start'>
    Serving delicious homemade-style 
    meals for your loved ones.</p>

                <div className='flex flex-row items-center gap-2'>
                    <Link  style={{
                        background: "var(--secondary-color)"
                    }}
                    href="#"
                    className='px-4 py-2 flex items-center gap-1 rounded-lg'
                    >
 <h1 className='text-white text-base'>View Menu</h1>
 <MoveUpRight  size={14} color='white' />
                    </Link>

                         <Link  
                    href="#"
                    className='px-4 py-2 flex items-center gap-1 rounded-lg border border-white'
                    >
 <h1 className='text-white text-base'>Reserve a Table</h1>

                    </Link>
                </div>

            </div>

            {/* Hero Swipper */}
            <div className='w-full md:max-w-[600px]'>
                <HeroSwipper />
            </div>

        </div>

        <div >
            <FeaturedFood  />
        </div>
      
    </div>
  )
}

export default Hero
