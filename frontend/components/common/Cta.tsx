
'use client'
import React from 'react'
import AnimateTextWord from '../animations/AnimatedText'
import { Instagram } from 'lucide-react'
import Link from 'next/link'

const SocialCta = () => {
const imgData = [
    {img: '/landing-page/social_image (1).png'},
      {img: '/landing-page/social_image (2).png'},
        {img: '/landing-page/social_image (3).png'},
          {img: '/landing-page/social_image (4).png'},
            {img: '/landing-page/social_image (5).png'},
             {img: '/landing-page/social_image (6).png'}

]


  return (
    <div className='bg-black flex flex-col gap-6 py-20 px-4 md:px-8 w-full'>

    
            <div className='flex items-center gap-1'>

                <div className='rounded-full w-11 h-11 flex items-center justify-center bg-white'>
<Instagram   size={18} color='black'/>
                </div>

                <h1 className='text-white'>
              <AnimateTextWord type="smallText" align="center">
       timcusine
                </AnimateTextWord>
                </h1>
            </div>

     

        <div className='w-full grid grid-cols-2 lg:grid-cols-6 gap-1 justify-items-center'>
{
    imgData.map((img,index) => (
    <div key={index}>
        <img src={img.img}  alt=''

        className='md:w-[206px] md:h-[206px] w-[169px] h-[169px]' />
    </div>


))
}
        </div>

        <div className='flex items-center justify-center w-full'>

                <Link
              href="#"
              className="bg-transparent px-4 md:px-8 h-12 flex uppercase border border-white/60
               items-center justify-center gap-2 text-white text-base transition-all duration-30
               0 hover:bg-white hover:text-black"
            >
                <Instagram   size={18} color='white'/>
            Follow on instagram
            </Link>

        </div>
      
    </div>
  )
}

export default SocialCta
