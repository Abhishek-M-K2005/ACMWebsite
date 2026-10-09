import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Lightbulb, Rocket, ChevronRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

export default function About() {
  return (
    <section className="relative w-full pt-20 pb-32 px-6 md:px-12 lg:px-24 bg-white text-brand-navy dark:bg-black dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* Subtle background glow */}
      <div className="absolute top-40 left-[-10%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between items-start mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-brand-blue"></div>
              <h2 className="text-xs font-bold tracking-[0.2em] text-brand-blue uppercase">
                Who We Are
              </h2>
            </div>
            {/* Fixed: text-white -> text-brand-navy dark:text-white */}
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-navy dark:text-white leading-[1.1] transition-colors duration-300">
              Uniting the <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-400">computing fraternity</span> at NITK.
            </h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:w-1/2 lg:pt-12"
          >
            {/* Fixed: text-gray-400 -> text-gray-600 dark:text-gray-400 */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light transition-colors duration-300">
              We are a collective of enthusiastic students aiming to unite the computing fraternity under one tag. We provide a platform to learn, share knowledge, and cater to the technical interests of both individuals and the institute as a whole.
            </p>
          </motion.div>
        </div>

        {/* Modern Interconnected Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-colors duration-300"
        >
          
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="group p-10 md:p-12 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
              <Lightbulb className="w-5 h-5 text-gray-400 dark:text-gray-300 group-hover:text-brand-blue transition-colors" />
            </div>
            {/* Fixed heading and paragraph text colors */}
            <h4 className="text-xl font-medium text-brand-navy dark:text-white mb-4 transition-colors duration-300">Learn & Innovate</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6 transition-colors duration-300 flex-grow">
              We organize a plethora of events covering most fields of engineering like KEP's, guest lectures, and workshops to give students exposure to the worldwide computing sphere.
            </p>
            <Link to="/events" className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-blue uppercase transition-colors duration-300 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
              Explore Events <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="group p-10 md:p-12 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
              <Rocket className="w-5 h-5 text-gray-400 dark:text-gray-300 group-hover:text-brand-blue transition-colors" />
            </div>
            <h4 className="text-xl font-medium text-brand-navy dark:text-white mb-4 transition-colors duration-300">Competitive Edge</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6 transition-colors duration-300 flex-grow">
              Through rigorous coding contests and hackathons, we challenge students to push their boundaries, understand modern tech stacks, and develop real-world problem-solving skills.
            </p>
            <Link to="/project-expo" className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-blue uppercase transition-colors duration-300 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
              See Projects <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="group p-10 md:p-12 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-5 h-5 text-brand-blue" />
              </div>
              <h4 className="text-xl font-medium text-brand-navy dark:text-white mb-4 transition-colors duration-300">Global Network</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6 transition-colors duration-300 flex-grow">
                As a chapter of the world's largest educational and scientific computing society, we provide resources, networking opportunities, and a platform to connect with industry leaders.
              </p>
              <Link to="/project-proposal" className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-blue uppercase transition-colors duration-300 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
                Explore Proposals <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
