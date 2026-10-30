import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; light?: boolean }
export function Button({ children, light = false, className = '', ...props }: Props) {
  return <button {...props} className={`group inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-1 hover:shadow-lift active:translate-y-0 ${light ? 'bg-paper text-ink hover:bg-lime' : 'bg-lime text-ink hover:bg-white'} ${className}`}>
    {children}<span className="grid h-7 w-7 place-items-center rounded-full bg-ink/10 transition group-hover:rotate-45"><ArrowUpRight size={16}/></span>
  </button>
}