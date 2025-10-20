import { Coffee } from 'lucide-react'
import React, { useEffect } from 'react'




const Summary = () => {


        const summaryData = [
    {
        title: 'New books added in library.',
        icon: <Coffee  size={20}/>,
        number: 2
    },

     {
        title: 'Books not in library.',
        icon: <Coffee   size={20}/>,
        number: 3
    },

     {
        title: 'Borrowed books',
        icon:<Coffee  size={20} />,
        number: 4
    },

     {
        title: 'Avaliable books',
        icon: <Coffee  size={20}/>,
        number: 5
    },
]
        


  return (
    <div className='flex flex-col md:flex-row gap-4 md:p-3 w-full'>
        {
            summaryData.map((sum,index) => (
                <div key={index}
                className={`min-h-[120px] rounded-lg md:max-w-[350px] w-full bg-[#202938]
                     shadow-md flex flex-col justify-center  p-4 gap-2
       `}>
                    <div 
                    className='' >{sum.icon}  </div>
                    <h1 className='text-2xl text-white font-bold'>{sum.number}</h1>
                    <p className='text-white text-base'>{sum.title}</p>

                    </div>
            ))
        }

    </div>
  )
}

export default Summary