import Sidebar from '@/components/common/Sidebar'
import ClientIndex from '@/components/dashboard/clients'
import React from 'react'

const ClientPage = () => {
  return (
          <div className='bg-white '>
     
        <Sidebar >
      <ClientIndex  />
      </Sidebar>
    </div>
  )
}

export default ClientPage
