
import { SpanStatus } from 'next/dist/trace'
import React from 'react'
import AnimatedText from '../animations/AnimatedText';


interface Props {
  title: string;
  desc: string;
}

const Heading = ({title, desc}: Props) => {
  return (
    <div className='flex flex-col gap-3'>
        <div className=' flex items-center gap-2'>

            <div  style={{
                background: "var(--yellow-color)"
            }}
            className='max-w-[50px] w-full h-1 rounded-sm' />

            <h1 className='text-[#BFBFBF] font-semibold text-4xl forum'>
                <AnimatedText>
                    {title}
                     </AnimatedText></h1>

        </div>

        <h1 className='text-white font-semibold text-4xl forum'>
                          <AnimatedText>
          {desc}
                          </AnimatedText>
                          </h1>
      
    </div>
  )
}

export default Heading
