import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import ReuseableHero from '@/components/reuseabale/Hero'
import React from 'react'
import Dishes from '../home/Dishes'
import TopNavbar from '@/components/common/TopNavbar'

const ShopIndex = () => {
  return (
    <div className='flex flex-col gap-2 bg-black'>
      <TopNavbar />
<Navbar  />
            
                <div className=" w-full">
                  <ReuseableHero
                  title='Shop'
                  subtitle=' Discover our carefully curated selection of dishes — 
                  crafted to satisfy every craving and deliver authentic flavors right to your table.'
             imageUrl='/landing-page/shop.png'
             
             />
                </div>
                <Dishes  />



    <Footer />
    </div>
  )
}

export default ShopIndex
