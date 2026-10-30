import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

export function Hero({ onBook }: { onBook: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] })
  const imageY = useTransform(scrollYProgress,[0,1],[0,180])
  const imageScale = useTransform(scrollYProgress,[0,1],[1,1.18])
  const textY = useTransform(scrollYProgress,[0,1],[0,110])
  const opacity = useTransform(scrollYProgress,[0,.8],[1,0])
  return <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-forest text-paper">
    <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(#d9ed9c 1px, transparent 1px)',backgroundSize:'28px 28px'}}/>
    <motion.div style={{y:imageY,scale:imageScale}} className="absolute inset-y-0 right-0 w-full md:left-[43%] md:w-[57%]">
      <img className="h-full w-full object-cover opacity-75" src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1800&q=90" alt="Freshly washed folded laundry"/>
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/45 to-transparent md:from-forest md:via-forest/15"/>
      <div className="absolute inset-0 bg-gradient-to-t from-forest/65 via-transparent to-forest/20"/>
    </motion.div>
    <motion.div style={{y:textY,opacity}} className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-24 pt-36 md:px-10">
      <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-lime"><span className="h-px w-10 bg-lime"/> Laundry, elevated <Sparkles size={14}/></motion.div>
      <div className="max-w-3xl">
        <motion.h1 initial="hidden" animate="visible" variants={{hidden:{},visible:{transition:{staggerChildren:.13}}}} className="font-display text-[clamp(3.5rem,9vw,8.8rem)] font-semibold leading-[.91] tracking-[-.075em]">
          {['Laundry day,','beautifully'].map((line,i)=><motion.span key={line} className="block" variants={{hidden:{opacity:0,y:70,rotate:2,filter:'blur(10px)'},visible:{opacity:1,y:0,rotate:0,filter:'blur(0px)',transition:{duration:1,ease:[.22,1,.36,1]}}}}>{line}</motion.span>)}
          <motion.span className="serif-italic block text-lime" initial={{opacity:0,y:70}} animate={{opacity:1,y:0}} transition={{delay:.55,duration:1,ease:[.22,1,.36,1]}}>handled.</motion.span>
        </motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.9,duration:.8}} className="mt-8 max-w-md text-base leading-7 text-paper/75 md:text-lg">Professional garment care, without the extra work. We pick up, clean with care and bring everything back fresh.</motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.05,duration:.8}} className="mt-9 flex flex-wrap items-center gap-5"><Button onClick={onBook}>Schedule a pickup</Button><a href="#services" className="inline-flex items-center gap-2 text-sm font-semibold text-paper/80 transition hover:text-lime">Explore services <ArrowDown size={16}/></a></motion.div>
      </div>
      <div className="absolute bottom-9 left-6 right-6 flex items-center justify-between border-t border-paper/20 pt-5 text-[10px] font-semibold uppercase tracking-[.2em] text-paper/55 md:left-10 md:right-10"><span>Good clothes deserve good care</span><span className="hidden sm:block">Scroll to feel the fresh</span><span>01 / 04</span></div>
    </motion.div>
    <motion.div animate={{y:[0,-13,0],rotate:[0,3,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}} className="absolute bottom-[19%] right-[8%] z-10 hidden rounded-full border border-paper/30 bg-paper/10 p-5 text-center backdrop-blur-md md:block"><span className="block font-serif text-3xl italic text-lime">100%</span><span className="text-[9px] uppercase tracking-widest text-paper">care in every fold</span></motion.div>
  </section>
}