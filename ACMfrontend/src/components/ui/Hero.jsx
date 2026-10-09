import { motion } from "framer-motion";
import { LampContainer } from "./lamp";

export default function Hero({ children, description, actions, note, variant = "default" }) {
  if (variant === "landing") {
    return (
      <section className="relative isolate flex min-h-[min(760px,92svh)] w-full items-center justify-center overflow-hidden bg-white px-5 pb-16 pt-32 text-brand-navy dark:bg-[#080d14] dark:text-white sm:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_18%,rgba(108,180,238,0.3),transparent_58%)] dark:bg-[radial-gradient(ellipse_at_50%_18%,rgba(38,112,169,0.36),transparent_58%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-32 w-[min(38rem,85vw)] -translate-x-1/2 rounded-full bg-brand-blue/25 blur-3xl dark:bg-brand-blue/30" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[31%] -z-10 h-px w-[min(36rem,78vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-blue/70 to-transparent shadow-[0_0_24px_rgba(108,180,238,0.7)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-brand-blue sm:text-sm">
            NITK Surathkal | Student Chapter
          </p>
          <h1 className="flex flex-col items-center text-5xl font-black leading-[0.98] tracking-tight text-brand-navy dark:text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {children}
          </h1>
          {description && (
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg md:text-xl">
              {description}
            </p>
          )}
          {actions && (
            <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              {actions}
            </div>
          )}
          {note && (
            <div className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {note}
            </div>
          )}
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-visible bg-transparent z-10">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col items-center px-5 py-4 text-center"
        >
          <h1 className="flex flex-col items-center justify-center gap-2 tracking-tight leading-tight md:leading-snug">
            {children}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
          {actions && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              {actions}
            </div>
          )}
          {note && (
            <div className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {note}
            </div>
          )}
        </motion.div>
      </LampContainer>
    </section>
  );
}
