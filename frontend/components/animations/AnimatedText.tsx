'use client';
import React, { useRef } from "react";
import { motion, useInView, Variants, Easing } from "framer-motion";
import { LargeSlideUp, SlideUp } from "@/lib/motion/motion";

interface Props {
  children: string;
  type: "largeText" | "smallText";
  align?: "start" | "center" | "end" | string;
}

const AnimateTextWord: React.FC<Props> = ({ children, type, align = "start" }) => {
  const AnimateTextRef = useRef<HTMLSpanElement | HTMLDivElement>(null);
  const inView = useInView(AnimateTextRef, {
    margin: "0px 100px -120px 0px",
    once: true,
  });

  // Tailwind alignment map
  const alignmentClass =
    {
      start: "justify-start text-left",
      center: "justify-center text-center",
      end: "justify-end text-right",
    }[align] ?? "justify-start text-left";

  // ✅ Ensure your motion variants are properly typed
  const validLargeSlideUp: Variants = {
    initial: { opacity: 0, y: "100%" },
    animate: (i: number) => ({
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.6,
        delay: i * 0.05,
        ease: "easeOut" as Easing,
      },
    }),
    exit: { opacity: 0, y: "100%" },
  };

  const validSlideUp: Variants = {
    initial: { opacity: 0, y: "20px" },
    animate: (i: number) => ({
      opacity: 1,
      y: "0px",
      transition: {
        duration: 0.5,
        delay: i * 0.05,
        ease: "easeOut" as Easing,
      },
    }),
    exit: { opacity: 0, y: "20px" },
  };

  const variant = type === "largeText" ? validLargeSlideUp : validSlideUp;

  if (type === "largeText") {
    return (
      <span
        ref={AnimateTextRef as React.RefObject<HTMLSpanElement>}
        className={`flex gap-x-[8px] flex-wrap w-full items-center relative ${alignmentClass}`}
      >
        {children.split(" ").map((data: string, index: number) => (
          <div key={index} className="inline-flex hide relative">
            <motion.span
              variants={variant}
              custom={index}
              initial="initial"
              animate={inView ? "animate" : "exit"}
            >
              {data === " " ? "\u00A0" : data}
            </motion.span>
          </div>
        ))}
      </span>
    );
  }

  return (
    <div className={`w-full flex ${alignmentClass}`}>
      <div
        ref={AnimateTextRef as React.RefObject<HTMLDivElement>}
        className={`flex flex-wrap gap-y-[4px] gap-x-[5px] w-full
           items-center relative ${alignmentClass}`}
      >
        {children.split(" ").map((data: string, index: number) => (
          <span key={index} className="inline-flex hide relative">
            <motion.span
              variants={variant}
              custom={index}
              initial="initial"
              animate={inView ? "animate" : "exit"}
            >
              {data === " " ? "\u00A0" : data}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimateTextWord;
