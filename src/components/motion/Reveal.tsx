import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const rise: Variants = {
  hidden: { opacity: 0, y: 42, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .8, ease: [0.22, 1, 0.36, 1] } }
}
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .18 }} transition={{ delay }}>{children}</motion.div>
}