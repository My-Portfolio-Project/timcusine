import React, { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { SlideUp } from "@/lib/motion/motion";

interface AnimatedTextProps {
  children: string;
}

const AnimatedText = ({ children }: AnimatedTextProps) => {
  const textRef = useRef(null);

  const whileInView = useInView(textRef, {
    margin: "0px 100px -120px 0px",
    // once: true,
  });

  return (
    <div>
      <span ref={textRef}>
        {children.split(" ").map((word, index) => (
          <div
            className="inline-flex overflow-hidden relative"
            key={index}
          >
            <motion.span
              custom={index}
              variants={SlideUp}
              initial="initial"
              animate={whileInView ? "animate" : "exit"}
            >
              {word}
            </motion.span>
            {/* add space between words */}
            <span>&nbsp;</span>
          </div>
        ))}
      </span>
    </div>
  );
};

export default AnimatedText;
