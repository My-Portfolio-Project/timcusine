import { animate, delay, easeIn } from "framer-motion";


export const SlideUp = {
    initial: {
        opacity: 0,
        y:"50%"
    },
    animate: (i : any) => ({
        opacity: "1",
        y: "0",
        transition: {
            duration: 0.5,
            delay: i * 0.03,
            easeIn:"easeIn"
        },

    }),
    exit: {
             opacity: 0,
        y:"50%"
    }
    
}

export const LargeSlideUp = {
  initial: {
    opacity: 0,
    y: "100%",
  },
  animate: (i: any) => ({
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.7,
      delay: i * 0.09,
      ease: [0.62, 0.05, 0.01, 0.99],
    },
  }),
  exit: {
    opacity: 0,
    y: "100%",
  },
};