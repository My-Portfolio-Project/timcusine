import { ChartArea } from 'lucide-react'
import React from 'react'
import TransactionChart from './components/Transactions'
// import Activity from './components/Activity'

const Chart = () => {
  return (
    <div className='min-h-[300px] flex flex-col md:flex-row gap-10 '>

        <div style={{
            //  background: "var(--background)"
        }}
         className=' w-full h-[350px] rounded-lg  bg-[#202938]'>
           <TransactionChart  />
        </div>

         <div style={{
            // background: "var(--background)"
        }}
         className='md:w-[30%] w-full h-[350px] rounded-lg bg-[#202938] hidden'>
          {/* <Activity /> */}
          
        </div>

      
    </div>
  )
}

export default Chart
