'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import AnimateTextWord from '@/components/animations/AnimatedText'

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqData = [
    {
      question: 'What makes TimCuisine different from other restaurants?',
      answer:
        'At TimCuisine, we blend traditional recipes with modern culinary techniques, ensuring every dish tells a story of flavor and innovation.',
    },
    {
      question: 'Do you offer home delivery?',
      answer:
        'Yes! We provide fast and reliable delivery so you can enjoy your favorite TimCuisine meals from the comfort of your home.',
    },
    {
      question: 'Are your ingredients locally sourced?',
      answer:
        'We take pride in sourcing the freshest ingredients from trusted local farmers to ensure premium quality and taste in every meal.',
    },
    {
      question: 'Can I make a reservation online?',
      answer:
        'Absolutely. You can easily reserve a table through our website or mobile app with just a few clicks.',
    },
    {
      question: 'Do you offer catering for events?',
      answer:
        'Yes, TimCuisine offers catering services for weddings, corporate events, and private parties — customized to your preferences.',
    },
    {
      question: 'Are there vegetarian and vegan options available?',
      answer:
        'Of course! Our menu includes a variety of vegetarian and vegan dishes crafted with creativity and care.',
    },
  ]

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="bg-black w-full px-4 md:px-8 flex flex-col lg:flex-row items-center justify-center min-h-[500px] py-20 gap-10">
      {/* LEFT SECTION */}
      <div className="flex flex-col gap-6 w-full md:w-1/2">
        <h1 className="md:text-4xl text-[28px] text-white w-full text-center md:text-start">
          <AnimateTextWord type="largeText" align='center md:start'>
            Have Any Questions?
          </AnimateTextWord>
        </h1>

        <div className="relative w-full overflow-hidden ">
          {/* overlay animation */}
          <motion.div
            initial={{ width: '100%' }}
            whileInView={{ width: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="bg-black absolute top-0 left-0 h-full z-10"
          ></motion.div>

          {/* image with scale animation */}
          <motion.img
            src="/landing-page/Faq.png"
            alt="FAQ"
            className="w-full h-full object-cover "
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col w-full md:w-1/2 gap-4">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            onClick={() => toggleQuestion(index)}
            className={`cursor-pointer border border-white/20 p-2  md:p-4 transition-all duration-300 ${
              activeIndex === index ? 'bg-[#999999]' : 'bg-transparent'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white md:text-xl text-base font-medium w-[80%] md:w-[90%] ">
                      <AnimateTextWord type="largeText" align='center md:start'>
                {faq.question}
                </AnimateTextWord>
              </h3>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="text-white" />
              </motion.div>
            </div>

            {/* Answer animation */}
            {activeIndex === index && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="text-sm md:text-base text-white/80 mt-3"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Faq
