'use client'

import AnimatedText from '@/components/animations/AnimatedText'
import Heading from '@/components/reuseabale/Heading'
import { Amphora, BeanOff, Cookie, Soup } from 'lucide-react'
import { title } from 'process'
import React from 'react'

const serviceData = [
  {
    id: '1',
    title: 'Breakfast',
    icon: <BeanOff  size={26} color='#452a1b' />,
    desc: 'Start your day with our delicious breakfast options, from classic favorites to healthy choices.',
  },
  { id: '2',    
    title: 'Lunch',
    icon: <Amphora  size={26}  color='#452a1b'/>,
    desc: 'Enjoy a variety of lunch specials that are perfect for a midday pick-me-up.',  
  },
  {
    id: '3',  
    title: 'Dinner',
    icon: <Cookie  size={26} color='#452a1b' />,
    desc: 'Indulge in our exquisite dinner menu, featuring gourmet dishes made with fresh ingredients.',  
  },  
{
  id: '4',
  title: 'Custom',
    icon: <Soup  size={26}  color='#452a1b'/>,
    desc: ''
}
]

const Service = () => {
  return (
    <div className='w-full bg-black min-h-[500px]  flex flex-col
     gap-10 items-center justify-center py-20 md:px-12 px-3'>

      <div className='flex flex-col gap-3'>

            <div className='flex flex-col gap-3 w-full items-center justify-center'>
        <div className=' flex items-center gap-2'>

            <div  style={{
                background: "var(--yellow-color)"
            }}
            className=' w-[50px] h-1 rounded-sm' />

         <h1 className='text-[#BFBFBF] font-semibold text-4xl forum'> 
                <AnimatedText>
                    Our Service
                     </AnimatedText></h1>

        </div>

   
    </div>

        <p  className='text-white  text-xl forum'>
          Our service is not just about taking orders - it's about createing a  <br className='hidden md:block' />
          warm and welcoming atmosphere where every customer feels valued and cared for.
        </p>
      </div>

     <div className="grid grid-cols-1 md:grid-cols-2 ">
      {serviceData.map((service) => (
        <div
          key={service.id}
          className="flex flex-col items-center justify-center p-6  w-full md:w-[320px] h-[243px]
     transition border border-[#BFBFBF]"
        >
          <div className="mb-3 text-primary">{service.icon}</div>
          <h3  className="text-xl font-semibold text-white uppercase">{service.title}</h3>
          <p   className="text-base text-[#bfbfbf] font-medium text-center">
            {service.desc || "Coming soon..."}</p>
        </div>
      ))}
    </div>
      
    </div>
  )
}

export default Service
