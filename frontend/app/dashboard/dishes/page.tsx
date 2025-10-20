import Sidebar from '@/components/common/Sidebar'
import DishesIndex from '@/components/dashboard/dishes'
import React from 'react'

const DishesPage = () => {
  return (
          <div className='bg-white '>
     
        <Sidebar >
      <DishesIndex  />
      </Sidebar>
    </div>
  )
}

export default DishesPage
