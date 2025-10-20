import React from 'react'
import Home from './Home'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'


const HomeIndex = () => {
  return (
    <div className='max-w-[1400px] w-full overflow-x-hidden'>
      <Navbar  />
      <Home />
      <Footer  />
    </div>
  )
}

export default HomeIndex
