import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Reveal } from '../motion/Reveal'

export function Manifesto() {
  const ref=useRef<HTMLElement>(null)
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']})
  const y=useTransform(scrollYProgress,[0,1],[100,-100])
  const rotate=useTransform(scrollYProgress,[0,1],[-5,5])
  return <section id="about" ref={ref} className="relative overflow-hidden bg-paper px-6 py-28 md:px-10 md:py-40">
    <motion.div style={{y,rotate}} className="pointer-events-none absolute -right-16 top-12 h-72 w-72 rounded-full border border-ink/10 md:right-20 md:h-[32rem] md:w-[32rem]"><div className="absolute inset-8 rounded-full border border-ink/10"/><div className="absolute inset-16 rounded-full border border-ink/10"/></motion.div>
    <div className="relative mx-auto max-w-7xl"><Reveal><p className="eyebrow"><span/> More time for what matters</p><h2 className="mt-8 max-w-5xl font-display text-5xl font-semibold leading-[1.04] tracking-[-.065em] md:text-8xl">Your weekend was not made for <span className="serif-italic text-moss">sorting socks.</span></h2><div className="mt-12 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end"><p className="max-w-md text-lg leading-8 text-ink/65">We believe good garment care should fit quietly into your life. No errands, no laundry piles, no guesswork. Just a little more room to do your thing.</p><div className="flex items-center gap-4 md:justify-end"><div className="h-px w-16 bg-moss"/><p className="max-w-[190px] text-xs font-bold uppercase leading-5 tracking-[.16em] text-moss">Considered care. Everyday ease.</p></div></div></Reveal></div>
  </section>
}