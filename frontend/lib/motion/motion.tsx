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