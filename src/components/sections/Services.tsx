import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/content'
import { Reveal } from '../motion/Reveal'

export function Services({ onBook }: { onBook: (service: string) => void }) {
  return <section id="services" className="bg-[#e9ebe2] px-6 py-24 md:px-10 md:py-32">
    <div className="mx-auto max-w-7xl">
      <Reveal><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow"><span/> Thoughtful garment care</p><h2 className="mt-5 max-w-2xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.06em] md:text-7xl">The right care for<br/><span className="serif-italic text-moss">every kind of wear.</span></h2></div><p className="max-w-xs text-sm leading-6 text-ink/65">From everyday essentials to your most-loved pieces, we make caring for clothes feel effortless.</p></div></Reveal>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map((s,i)=><motion.article key={s.id} initial={{opacity:0,y:55}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{delay:i*.1,duration:.7}} whileHover={{y:-10}} className="group overflow-hidden rounded-[1.6rem] bg-paper">
        <div className="relative h-64 overflow-hidden"><motion.img whileHover={{scale:1.08}} transition={{duration:.7}} src={s.image} alt={s.name} className="h-full w-full object-cover"/><span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-2 text-[10px] font-bold uppercase tracking-widest backdrop-blur">{s.tag}</span></div>
        <div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-2xl font-semibold tracking-tight">{s.name}</h3><button aria-label={`Book ${s.name}`} onClick={()=>onBook(s.name)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime transition group-hover:rotate-45"><ArrowUpRight size={17}/></button></div><p className="mt-3 min-h-[48px] text-sm leading-6 text-ink/60">{s.description}</p><p className="mt-5 border-t border-ink/10 pt-4 text-sm font-bold">{s.price}</p></div>
      </motion.article>)}</div>
    </div>
  </section>
}