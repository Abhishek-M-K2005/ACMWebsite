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
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 mt-24">
        
        {/* LEFT CONIC */}
        <motion.div
          initial={{ opacity: 0.5, width: "20rem" }}
          whileInView={{ opacity: 1, width: "40rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[40rem] bg-gradient-conic from-brand-blue via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-white dark:bg-black transition-colors duration-300 h-40 bottom-0 z-20 [-webkit-mask-image:linear-gradient(to_top,white,transparent)] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-white dark:bg-black transition-colors duration-300 bottom-0 z-20 [-webkit-mask-image:linear-gradient(to_right,white,transparent)] [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        
        {/* RIGHT CONIC */}
        <motion.div
          initial={{ opacity: 0.5, width: "20rem" }}
          whileInView={{ opacity: 1, width: "40rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[40rem] bg-gradient-conic from-transparent via-transparent to-brand-blue text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-white dark:bg-black transition-colors duration-300 bottom-0 z-20 [-webkit-mask-image:linear-gradient(to_left,white,transparent)] [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-white dark:bg-black transition-colors duration-300 h-40 bottom-0 z-20 [-webkit-mask-image:linear-gradient(to_top,white,transparent)] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        {/* BASE BLURS - Removed the problematic backdrop-blur-md div! */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white dark:bg-black transition-colors duration-300 blur-2xl"></div>
        
        {/* GLOWS */}
        <div className="absolute inset-auto z-50 h-36 w-[40rem] -translate-y-1/2 rounded-full bg-brand-blue opacity-50 blur-3xl transform-gpu"></div>
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "20rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-brand-blue blur-2xl transform-gpu"
        ></motion.div>
        
        {/* SOLID CENTER LINE */}
        <motion.div
          initial={{ width: "20rem" }}
          whileInView={{ width: "40rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-brand-blue"
        ></motion.div>

        {/* BOTTOM CUTOFF MASK */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-white dark:bg-black transition-colors duration-300"></div>
      </div>

      <div className="relative z-50 flex -translate-y-64 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
