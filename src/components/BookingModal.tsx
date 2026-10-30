import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import type { BookingState } from '../types'
type Props={open:boolean;initialService?:string;onClose:()=>void}
export function BookingModal({open,initialService='',onClose}:Props){
 const [form,setForm]=useState<BookingState>({service:initialService,name:'',phone:'',date:'',address:''})
 const [sent,setSent]=useState(false)
 useEffect(()=>{if(open){setForm(v=>({...v,service:initialService}));setSent(false)}},[open,initialService])
 useEffect(()=>{if(!open)return;const prev=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=prev}},[open])
 const update=(key:keyof BookingState,value:string)=>setForm(v=>({...v,[key]:value}))
 return <AnimatePresence>{open&&<motion.div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink/65 p-4 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <motion.div initial={{opacity:0,y:35,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.98}} transition={{type:'spring',damping:25,stiffness:260}} className="relative my-8 w-full max-w-xl rounded-[2rem] bg-paper p-7 shadow-lift md:p-10">
   <button aria-label="Close booking form" onClick={onClose} className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-mist"><X size={18}/></button>
   {sent?<div className="py-12 text-center"><CheckCircle2 className="mx-auto text-forest" size={52}/><h2 className="mt-6 font-display text-4xl font-semibold">You're on your way<br/><span className="serif-italic text-moss">to fresh.</span></h2><p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-ink/60">Thanks, {form.name}. This is a demo request confirmation; connect the form to your booking API to receive real orders.</p><button onClick={onClose} className="mt-8 rounded-full bg-forest px-7 py-4 text-sm font-bold text-paper">Done</button></div>:<>
    <p className="eyebrow"><span/> Let's make laundry lighter</p><h2 className="mt-5 font-display text-4xl font-semibold tracking-[-.06em]">Book a doorstep<br/><span className="serif-italic text-moss">pickup.</span></h2>
    <form onSubmit={e=>{e.preventDefault();setSent(true)}} className="mt-8 grid gap-4 sm:grid-cols-2">
     <label className="field-label">Your name<input required value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Name"/></label>
     <label className="field-label">Phone number<input required type="tel" pattern="[0-9+() -]{8,}" value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="+91 98765 43210"/></label>
     <label className="field-label sm:col-span-2">Service<select required value={form.service} onChange={e=>update('service',e.target.value)}><option value="">Choose a service</option>{['Wash & fold','Dry cleaning','Steam ironing','Express laundry'].map(s=><option key={s}>{s}</option>)}</select></label>
     <label className="field-label">Preferred pickup date<input required type="date" min={new Date().toISOString().slice(0,10)} value={form.date} onChange={e=>update('date',e.target.value)}/></label>
     <label className="field-label">Pickup address<input required value={form.address} onChange={e=>update('address',e.target.value)} placeholder="Area, street, city"/></label>
     <button className="mt-3 flex items-center justify-center gap-3 rounded-full bg-forest px-6 py-4 text-sm font-bold text-paper transition hover:bg-moss sm:col-span-2">Request pickup <span>↗</span></button>
    </form><p className="mt-4 text-center text-[10px] text-ink/45">No payment required to request a pickup.</p>
   </>}
  </motion.div>
 </motion.div>}</AnimatePresence>
}