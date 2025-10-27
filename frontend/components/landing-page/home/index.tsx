import React from 'react'
import Home from './Home'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import TopNavbar from '@/components/common/TopNavbar'


const HomeIndex = () => {
  return (
    <div className='max-w-[1400px] w-full overflow-x-hidden bg-black'>
      <TopNavbar />
      <Navbar  />
      <Home />
      <Footer  />
    </div>
  )
}

export default HomeIndex
