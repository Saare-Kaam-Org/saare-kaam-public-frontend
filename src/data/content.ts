import type { Service } from '../types'

export const services: Service[] = [
  { id:'wash-fold', name:'Wash & fold', description:'Everyday essentials, washed gently and folded just right.', price:'From ₹79/kg', tag:'Everyday care', image:'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1000&q=85' },
  { id:'dry-clean', name:'Dry cleaning', description:'Thoughtful care for the pieces that need a little extra.', price:'From ₹149/item', tag:'Premium care', image:'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85' },
  { id:'steam-iron', name:'Steam ironing', description:'Crisp collars, smooth seams and a ready-to-wear finish.', price:'From ₹12/item', tag:'A polished finish', image:'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1000&q=85' },
  { id:'express', name:'Express laundry', description:'A faster turnaround for the days that cannot wait.', price:'From ₹129/kg', tag:'When time matters', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=85' }
]

export const steps = [
  { number:'01', title:'We pick it up', text:'Choose a time that works. We collect your laundry right from your doorstep.', detail:'Doorstep collection, on your schedule.' },
  { number:'02', title:'We care for it', text:'Your garments are sorted, cleaned and finished with care suited to each fabric.', detail:'Fabric-aware professional care.' },
  { number:'03', title:'Fresh, back to you', text:'Everything comes back clean, neatly folded and ready for your wardrobe.', detail:'Fresh clothes, delivered home.' }
]

export const faqs = [
  { q:'How does doorstep laundry work?', a:'Choose your service, share your pickup address and preferred time, and our team collects your garments. We clean and finish them, then return them to your doorstep.' },
  { q:'How long does a regular order take?', a:'Turnaround depends on the service and your location. Regular wash-and-fold orders typically take 48 hours; express options are available in supported areas.' },
  { q:'Do you handle delicate garments?', a:'Yes. Select dry cleaning or add a care note when booking. Our team checks garment labels and separates items according to their care requirements.' },
  { q:'Can I schedule a recurring pickup?', a:'Absolutely. You can arrange recurring weekly or monthly pickups. Subscription plans can be configured for your household needs.' }
]