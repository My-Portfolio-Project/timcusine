'use client'
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import ReuseableHero from '@/components/reuseabale/Hero'
import React from 'react'
import About from '../home/About'
import TopNavbar from '@/components/common/TopNavbar'
import Faq from './Faq'
import History from './History'
import Dine from './Dine'
import Stats from './Stats'
import Journey from './Journey'

const AboutIndex = () => {
  return (
    <div className='flex flex-col gap-2 bg-black'>
      <TopNavbar />
<Navbar  />
            
                <div className=" w-full">
                  <ReuseableHero
                  title='About Us'
                  subtitle=' Driven by passion and tradition, we blend creativity and
                   flavor to create memorable dining experiences that bring people together'
             imageUrl='/landing-page/About Image.png'
             
             />
                </div>

                <History />
                <Stats />
                <Journey />
                <Dine  />
<Faq  />


    <Footer />
    </div>
  )
}

export default AboutIndex
