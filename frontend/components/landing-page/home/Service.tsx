'use client'

import AnimateTextWord from '@/components/animations/AnimatedText'
import AnimatedText from '@/components/animations/AnimatedText'
import Heading from '@/components/reuseabale/Heading'
import { Amphora, ArrowBigRight, ArrowUpRight, BeanOff, Cookie, Soup } from 'lucide-react'
import { title } from 'process'
import React from 'react'

const serviceData = [
  {
    id: '1',
    title: 'Breakfast',
    icon: <BeanOff  size={26} color='white' />,
    desc: 'Start your day with our delicious breakfast options, from classic favorites to healthy choices.',
  },
  { id: '2',    
    title: 'Lunch',
    icon: <Amphora  size={26}  color='white' />,
    desc: 'Enjoy a variety of lunch specials that are perfect for a midday pick-me-up.',  
  },
  {
    id: '3',  
    title: 'Dinner',
    icon: <Cookie  size={26} color='white' />,
    desc: 'Indulge in our exquisite dinner menu, featuring gourmet dishes made with fresh ingredients.',  
  },  

]

const Service = () => {
  return (
    <div className='w-full bg-black min-h-[500px]  flex flex-col
     gap-10 items-center justify-center py-20 md:px-12 px-3'>


<div className='w-full bg-[#212121]  md:h-[289px] flex flex-col
 lg:flex-row gap-5 items-center justify-center p-4'>

<div className='lg:max-w-[30%] w-full gap-2 md:gap-4 flex 
flex-col items-center lg:items-start'>

  <h1 className='text-white md:text-[28px] md:leading-[33px] hidden lg:block'>
        <AnimateTextWord type="largeText" align="start">
    Crafting Memorable
Experiences
        </AnimateTextWord>
</h1>


  <h1 className='text-white text-[24px] md:leading-[33px] lg:hidden'>
        <AnimateTextWord type="largeText" align="center">
    Crafting Memorable
Experiences
        </AnimateTextWord>
</h1>


<div className='flex items-center gap-1'>
  <p className='text-white text-[12px]'>
    Explore Our Menu
  </p>

  <ArrowUpRight  color='white' size={12}/>

</div>

</div>
   

     <div className="flex flex-col md:flex-row items-center gap-2  md:max-w-[70%] w-full">
      {serviceData.map((service) => (
        <div
          key={service.id}
          className="flex flex-col md:items-start items-center justify-center gap-2 md:p-6  w-full md:w-[320px] h-[243px]
     transition "
        >
          <div className="mb-3 text-primary">{service.icon}</div>
          <h3  className="text-base font-semibold text-white uppercase">{service.title}</h3>
          <p   className="text-sm text-[#999999] font-medium md:text-start text-center">
            {service.desc || "Coming soon..."}</p>
        </div>
      ))}
    </div>

    </div>
      
    </div>
  )
}

export default Service
