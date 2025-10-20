import React from 'react'
// import Hero from './Hero'
import About from './About'
import Dishes from './Dishes'
import Service from './Service'
import Testimonial from './Testimonial'
import SecondHero from './SecondHero'
import Gallery from './Gallery'
import Cta from './Cta'

const Home = () => {
  return (
    <div className=' flex flex-col '>
      {/* <Hero  /> */}
      <SecondHero  />
      <About />
      <Dishes />
      <Gallery  />
      <Service />
      <Testimonial  />
      <Cta />
    </div>
  )
}

export default Home
