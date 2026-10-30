import { useState } from 'react'
import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { ScrollFilm } from './components/sections/ScrollFilm'
import { Services } from './components/sections/Services'
import { Process } from './components/sections/Process'
import { Manifesto } from './components/sections/Manifesto'
import { Pricing } from './components/sections/Pricing'
import { Testimonials } from './components/sections/Testimonials'
import { FAQ } from './components/sections/FAQ'
import { PartnerSection } from './components/sections/PartnerSection'
import { Footer } from './components/sections/Footer'
import { BookingModal } from './components/BookingModal'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis()
  const [bookingOpen,setBookingOpen]=useState(false)
  const [service,setService]=useState('')
  const book=(selected='')=>{setService(selected);setBookingOpen(true)}
  return <>
    <Navbar onBook={()=>book()}/>
    <main>
      <Hero onBook={()=>book()}/>
      <ScrollFilm/>
      <Services onBook={book}/>
      <Process/>
      <Manifesto/>
      <Pricing onBook={()=>book()}/>
      <Testimonials/>
      <FAQ/>
      <PartnerSection/>
    </main>
    <Footer onBook={()=>book()}/>
    <BookingModal open={bookingOpen} initialService={service} onClose={()=>setBookingOpen(false)}/>
  </>
}