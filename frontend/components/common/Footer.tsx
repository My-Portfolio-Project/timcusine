"use client";
import { FacebookIcon, Headphones, InstagramIcon, Mail, MapPin, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const footerData = [
  {
    id: "1",
    heading: "Links",
    links: [
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    id: "2",
    heading: "Contact",
    info: [
      {
        title: "timsucisne@gmail.com",
        icon: <Mail size={16} />,
      },
      {
        title: "+234 90740894",
        icon: <Headphones size={16} />,
      },
      {
        title: "Lagos, Nigeria",
        icon: <MapPin size={16} />,
      },
    ],

    socials: [
      {
        icon: <FacebookIcon size={18} />,
        link: "https://facebook.com",
      },
      {
        icon: <TwitterIcon size={18} />,
        link: "https://twitter.com",
      },
      {
        icon: <InstagramIcon size={18} />,
        link: "https://instagram.com",
      },
    ],
  },
];

const gallery = [
"/landing-page/gallery (1).png",
"/landing-page/gallery (2).png",
"/landing-page/gallery (3).png",
"/landing-page/gallery (4).png",
"/landing-page/gallery (5).png",
];

const Footer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change gallery every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full flex flex-col bg-black pt-20 pb-10 px-5 
     md:px-12 gap-10          border-t border-[#BFBFBF]">
      {/* Logo */}
      <div className="w-full flex flex-col gap-3 items-center justify-center mb-6">
        <Link href="/">
          <img src="/landing-page/tims_logo.png" alt="logo" className="h-12" />
        </Link>
        <p 
        className="text-base text-white"> Serving delicious homemade-style 
    meals for your loved ones.</p>
      </div>

      {/* Footer content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">
        {/* Links */}
        <div className="flex flex-col ">

          <div className="flex  items-center gap-1 mb-3">

      <h3 className='text-white font-semibold text-sm uppercase'> {footerData[0].heading}</h3>
            </div>
          <ul className="space-y-2">
            {footerData[0].links?.map((item, index) => (
              <li key={index}>
                <Link href={item.path} className="hover:text-[#a16d57] transition">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>

      <div className="flex  items-center gap-1 mb-3">
      <h3 className='text-white font-semibold text-sm uppercase'>
            {footerData[1].heading}</h3> 
           </div>

          <ul className="space-y-3">
            {footerData[1].info?.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {item.icon}
                <span className="text-[#999999] text-base">{item.title}</span>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex items-center gap-4 mt-4">
            {footerData[1].socials?.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white shadow rounded-full hover:bg-[#a16d57] hover:text-white transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div>

          
      <div className="flex  items-center gap-1 mb-3">
      <h3 className='text-white font-semibold text-sm uppercase'> Gallery </h3>
</div>


          <div className="w-full h-40 overflow-hidden rounded-lg shadow-md">
            <img
              src={gallery[currentIndex]}
              alt="gallery"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t pt-4">
        © {new Date().getFullYear()} Tim’s Store. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
