import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-300 w-full z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-[0.68] sm:scale-85 md:scale-100 scale-y-125 items-center justify-center isolate z-0 pointer-events-none mt-16 sm:mt-24">
        
        {/* LEFT CONIC */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-brand-blue via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-white dark:bg-black transition-colors duration-300 h-40 bottom-0 z-20 [-webkit-mask-image:linear-gradient(to_top,white,transparent)] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-white dark:bg-black transition-colors duration-300 bottom-0 z-20 [-webkit-mask-image:linear-gradient(to_right,white,transparent)] [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        
        {/* RIGHT CONIC */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-brand-blue text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-white dark:bg-black transition-colors duration-300 bottom-0 z-20 [-webkit-mask-image:linear-gradient(to_left,white,transparent)] [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-white dark:bg-black transition-colors duration-300 h-40 bottom-0 z-20 [-webkit-mask-image:linear-gradient(to_top,white,transparent)] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        {/* BASE BLURS */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white dark:bg-black transition-colors duration-300 blur-2xl"></div>
        
        {/* GLOWS */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-brand-blue opacity-40 blur-3xl transform-gpu"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 -translate-y-[5.5rem] rounded-full bg-brand-blue blur-2xl transform-gpu"
        ></motion.div>
        
        {/* SOFT CENTER GLOWING EMITTER LINE */}
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "26rem" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-[2px] -translate-y-[6.5rem] bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_15px_#6cb4ee]"
        ></motion.div>

        {/* BOTTOM CUTOFF MASK */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-white dark:bg-black transition-colors duration-300"></div>
      </div>

      <div className="relative z-50 flex flex-col items-center px-4 sm:px-6 w-full max-w-5xl mx-auto -translate-y-60 sm:-translate-y-12 md:-translate-y-36">
        {children}
      </div>
    </div>
  );
};