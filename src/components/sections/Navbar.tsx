import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Button } from '../ui/Button'

const links = [{ label:'Services', href:'#services' }, { label:'Our process', href:'#process' }, { label:'Plans', href:'#plans' }, { label:'About', href:'#about' }]
export function Navbar({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
    <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-paper/85 px-5 py-3 shadow-sm backdrop-blur-xl md:px-7">
      <a href="#top" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight"><span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-lime">f.</span>freshfold<span className="text-moss">®</span></a>
      <div className="hidden items-center gap-8 md:flex">{links.map(l=><a key={l.href} href={l.href} className="text-sm font-medium text-ink/70 transition hover:text-ink">{l.label}</a>)}</div>
      <div className="hidden md:block"><Button onClick={onBook} className="!px-5 !py-3">Book a pickup</Button></div>
      <button aria-label="Toggle menu" onClick={()=>setOpen(v=>!v)} className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper md:hidden">{open?<X/>:<Menu/>}</button>
    </nav>
    <AnimatePresence>{open&&<motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} className="mx-2 mt-2 rounded-3xl bg-paper p-5 shadow-lift md:hidden">
      {links.map(l=><a key={l.href} onClick={()=>setOpen(false)} href={l.href} className="block border-b border-ink/10 py-4 font-semibold">{l.label}</a>)}
      <button onClick={()=>{setOpen(false);onBook()}} className="mt-4 flex w-full items-center justify-between rounded-full bg-lime px-5 py-4 font-semibold">Book a pickup <ArrowUpRight/></button>
    </motion.div>}</AnimatePresence>
  </header>
}