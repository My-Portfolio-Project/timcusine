
import ReuseableHero from '@/components/reuseabale/Hero'
import React from 'react'
import Form from './Form'
import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import TopNavbar from '@/components/common/TopNavbar'
import SocialCta from '@/components/common/Cta'

const ContactIndex = () => {
  return (
    <div className='flex flex-col gap-2 bg-black'>
      <TopNavbar  />
<Navbar  />

            
                <div className=" w-full ">
                  <ReuseableHero
                  title='Contact'
                  subtitle=' Contact us today to start a conversation —
             our team is ready to grow meaningful solutions with you.'
             imageUrl='/landing-page/Contact.png'
             
             />
                </div>


    <Form />
    <SocialCta  />

    <Footer />
      
    </div>
  )
}

export default ContactIndex
