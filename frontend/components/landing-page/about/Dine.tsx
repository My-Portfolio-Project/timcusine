'use client'
import React from 'react'
import { motion } from 'framer-motion'
import AnimateTextWord from '@/components/animations/AnimatedText'

const Dine = () => {

    const dineData =[
        {  title: 'Midday Feast Awaits',
            firstDay: 'Mon- Thu:  11:00 AM to 03:00 PM',
            secondDay: 'Fri- Sun:  12:00 AM to 04:00 PM'
        },

         {  title: 'A Perfect Night Feast',
            firstDay: 'Mon- Thu:  11:00 AM to 03:00 PM',
            secondDay: 'Fri- Sun:  12:00 AM to 04:00 PM'
        },

    ]

    
  return (
     <div
      className="flex flex-col items-center md:flex-row min-h-[500px]
      justify-center gap-10 py-20 px-4 md:px-8 bg-black overflow-hidden"
    >


                {/* RIGHT IMAGE SECTION */}
                <div className="w-full lg:max-w-[352px] relative overflow-hidden ">
                  {/* overlay animation */}
                  <motion.div
                    initial={{ width: '100%' }}
                    whileInView={{ width: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="bg-black absolute top-0 left-0 h-full z-10"
                  ></motion.div>
        
                  {/* image with scale animation */}
                  <motion.img
                  src="/landing-page/dine (1).png"
                    alt="Restaurant History"
                    className="w-full lg:h-[480px] md:h-[750px] h-[386px] object-cover"
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>



{/* text */}
                <div className='flex flex-col gap-6 md:gap-15 md:max-w-[350px] w-full'>

                         <h1 className="text-[22px] text-white w-full  ">
              <AnimateTextWord type="largeText" align="center">
             Get Your Dine Experience
              </AnimateTextWord>
            </h1>

            <div className='flex flex-col gap-4'>
                {
                    dineData.map((dine,index) => (
                       <div key={index}
                        className='flex flex-col items-center  gap-2'>

                             <h1 className="text-lg text-white w-full pb-2  md:pb-3">
                                  <AnimateTextWord type="largeText" align="center">
                                   {dine.title}
                                  </AnimateTextWord>
                                </h1>

                                <div className='flex flex-col gap-1 md:py-4 py-2'>

                <h1 className="text-base  text-[#999999] w-full ">
              <AnimateTextWord type="largeText" align="start">
                  {dine.firstDay}
              </AnimateTextWord>
            </h1>

                     <h1 className="text-base  text-[#999999] w-full ">
              <AnimateTextWord type="largeText" align="start">
                 {dine.secondDay}
              </AnimateTextWord>
            </h1>

                                </div>

                       </div>
                    ))
                }

            </div>

                </div>



                        {/* RIGHT IMAGE SECTION */}
                        <div className="w-full  max-w-[352px] relative overflow-hidden  hiden lg:block">
                          {/* overlay animation */}
                          <motion.div
                            initial={{ width: '100%' }}
                            whileInView={{ width: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                            className="bg-black absolute top-0 left-0 h-full z-10"
                          ></motion.div>
                
                          {/* image with scale animation */}
                          <motion.img
                            src="/landing-page/dine (2).png"
                            alt="Restaurant History"
                            className="w-full lg:h-[480px] md:h-[750px] h-[386px] object-cover"
                            initial={{ scale: 1.2 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
      
    </div>
  )
}

export default Dine
