'use client'
import React from 'react'
// import Hero from './Hero'
import About from './About'

import Service from './Service'
import Testimonial from './Testimonial'
import SecondHero from './SecondHero'
import Gallery from './Gallery'
import Cta from './Cta'
import Explore from './Explore'
import SocialCta from '@/components/common/Cta'

const Home = () => {
  return (
    <div className=' flex flex-col '>
      {/* <Hero  /> */}
      <SecondHero  />
       <About />
      <Explore  />
      <Service />
      
      <Gallery  />
            <Cta />
      <Testimonial  />

      <SocialCta  />
    </div>
  )
}

export default Home
