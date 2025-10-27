'use client';
import React, { useRef, useState, FormEvent } from 'react';
import { Diamond, LocateIcon, MailCheckIcon, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

import ReuseableHero from '@/components/reuseabale/Hero';
import AnimateTextWord from '@/components/animations/AnimatedText';

interface Status {
  success: boolean;
  message: string;
}

const contactInfo = [
  {
    icon: <PhoneCall stroke="#035925" fill="white" size={16} />,
    display: '+234 903 435 6113',
  },
  {
    icon: <LocateIcon stroke="#035925" fill="white" size={16} />,
    display: 'Akure & Ore, Ondo State, Nigeria',
  },
  {
    icon: <MailCheckIcon stroke="#035925" fill="white" size={16} />,
    display: `info@forthwithglobal.com, 
              akinolotujuwon@gmail.com`,
  },
];

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

 const sendEmail = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setStatus(null);

  const formElement = formRef.current; // ✅ capture once

  if (!formElement) return;

  emailjs
    .sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formElement, // ✅ safe reference
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    .then(
      () => {
        setLoading(false);
        setStatus({ success: true, message: 'Message sent successfully!' });
        formElement.reset(); // ✅ no TS warning now
      },
      (error: unknown) => {
        console.error('EmailJS Error:', error);
        setLoading(false);
        setStatus({ success: false, message: 'Something went wrong. Please try again.' });
      }
    );
};


  return (
    <div className="min-h-[75vh] py-20 px-5 md:px-12 w-full overflow-x-hidden gap-10
 flex flex-col lg:flex-row z-100 bg-black">
      {/* Left Section */}
      <div className="flex flex-col gap-5 justify-between lg:max-w-[60%] w-full">
    

        <h1 className="text-4xl md:text-[40px] leading-[48px]
         font-semibold lg:w-[450px] text-white">
          <AnimateTextWord type="largeText" align="start">
            We look forward to hearing from you.
          </AnimateTextWord>
        </h1>

        <h1 className="text-white opacity-80 w-full md:w-[60%]">
          <AnimateTextWord type="largeText" align="start">
            We’re committed to clear communication, fast responses, 
            and personalized support every step of the way.
          </AnimateTextWord>
        </h1>

        <div className="w-[60%] bg-[#EBEBEB] h-[1px]" />

        <div className="flex flex-col gap-3 mt-5">
          {contactInfo.map((contact, index) => (
            <div key={index} className="flex items-center gap-3 cursor-pointer group">
              <div className="flex items-center justify-center
               w-8 h-8 rounded-full bg-[#E8F5E9]">
                {contact.icon}
              </div>
              <span className="text-[#585858] hover:text-[#002C11]
               text-base transition-colors">
                {contact.display}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white mt-10 md:mt-0 lg:max-w-[40%] w-full rounded-lg shadow-lg"
      >
        <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-5 p-2 md:p-5">
          {/* First Name & Last Name */}
          <div className="flex items-center gap-5">
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              required
              className="bg-[#FAFAFA] w-full py-3 px-2 h-12 flex items-center rounded-lg text-[#585858]"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              required
              className="bg-[#FAFAFA] w-full py-3 px-2 h-12 flex items-center rounded-lg text-[#585858]"
            />
          </div>

          {/* Phone number and email */}
          <div className="flex items-center gap-5">
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              required
              className="bg-[#FAFAFA] w-full py-3 px-2 h-12 flex items-center rounded-lg text-[#585858]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="bg-[#FAFAFA] w-full py-3 px-2 h-12 flex items-center rounded-lg text-[#585858]"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your message"
            required
            className="bg-[#FAFAFA] w-full py-3 px-2 min-h-[200px] flex items-center rounded-lg text-[#585858]"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="gap-2 backdrop-blur-md bg-[#035925]/90 hover:bg-[#035925] transition-all text-white p-4 rounded-3xl flex items-center justify-center w-full font-medium"
          >
            <span className="transform rotate-12">
              <Diamond color="white" size={20} />
            </span>
            {loading ? 'Sending...' : 'Submit'}
          </button>

          {/* Status Message */}
          {status && (
            <p
              className={`text-center text-sm mt-2 ${
                status.success ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Form;
