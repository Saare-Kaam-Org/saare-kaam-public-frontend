import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { steps } from '../../data/content'
import { Reveal } from '../motion/Reveal'
import { PackageCheck, Shirt, Truck } from 'lucide-react'
const icons=[Truck,Shirt,PackageCheck]

export function Process() {
  const root=useRef<HTMLElement>(null)
  useLayoutEffect(()=>{const ctx=gsap.context(()=>{gsap.from('.process-line',{scaleX:0,transformOrigin:'left center',ease:'none',scrollTrigger:{trigger:root.current,start:'top 65%',end:'bottom 65%',scrub:true}})},root);return()=>ctx.revert()},[])
  return <section id="process" ref={root} className="bg-forest px-6 py-24 text-paper md:px-10 md:py-32">
    <div className="mx-auto max-w-7xl"><Reveal><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow eyebrow-light"><span/> Simple from start to fresh</p><h2 className="mt-5 font-display text-5xl font-semibold tracking-[-.06em] md:text-7xl">Three steps.<br/><span className="serif-italic text-lime">Zero laundry stress.</span></h2></div><p className="max-w-xs text-sm leading-6 text-paper/60">The care you want, with the convenience your week needs. We handle the whole journey.</p></div></Reveal>
      <div className="relative mt-20 grid gap-12 md:grid-cols-3 md:gap-8"><div className="process-line absolute left-0 right-0 top-9 hidden h-px bg-lime/60 md:block"/>
        {steps.map((s,i)=>{const Icon=icons[i];return <Reveal key={s.number} delay={i*.13}><div className="relative"><div className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full border border-lime/50 bg-forest text-lime"><Icon size={25}/></div><p className="mt-8 text-xs font-bold tracking-[.2em] text-lime">{s.number} / THE PROCESS</p><h3 className="mt-4 font-display text-3xl font-semibold">{s.title}</h3><p className="mt-4 max-w-sm text-sm leading-7 text-paper/65">{s.text}</p><p className="mt-7 text-xs font-semibold text-lime">{s.detail}</p></div></Reveal>})}
      </div>
    </div>
  </section>
}