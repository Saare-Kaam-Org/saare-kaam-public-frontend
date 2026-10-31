import { Sparkles } from 'lucide-react'

type Props = {
  light?: boolean
  size?: 'sm' | 'md' | 'lg'
  showSubtitle?: boolean
  subtitleText?: string
  className?: string
}

export function Logo({
  light = false,
  size = 'md',
  showSubtitle = true,
  subtitleText = 'Aapke Saare Kaam Aasaan',
  className = '',
}: Props) {
  // Sizing tokens for the floating transparent logo icon
  const iconSizeClass =
    size === 'sm'
      ? 'h-8 w-8'
      : size === 'lg'
      ? 'h-12 w-12 sm:h-14 sm:w-14'
      : 'h-9 w-9 sm:h-10 sm:w-10'

  const titleSizeClass =
    size === 'sm'
      ? 'text-lg'
      : size === 'lg'
      ? 'text-2xl sm:text-3xl'
      : 'text-xl sm:text-2xl'

  const subtitleSizeClass =
    size === 'sm'
      ? 'text-[8px]'
      : size === 'lg'
      ? 'text-[10.5px]'
      : 'text-[9px]'

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* 3D SK Logo Icon with 100% transparent PNG background */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-110">
        <img
          src="/saare-kaam-mark-clean.png"
          alt="Saare Kaam"
          className={`${iconSizeClass} object-contain`}
          loading="eager"
        />
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col leading-none">
        <div className={`font-display font-extrabold tracking-tight flex items-center gap-1 ${titleSizeClass}`}>
          <span className={light ? 'text-white' : 'text-[#0b172c]'}>Saare</span>
          <span className={light ? 'text-[#38bdf8]' : 'text-[#2563eb]'}>Kaam</span>
          <Sparkles
            size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14}
            className={light ? 'text-cyan-300' : 'text-[#2563eb]'}
          />
        </div>

        {showSubtitle && (
          <span
            className={`font-sans font-bold uppercase tracking-[0.14em] mt-1 ${subtitleSizeClass} ${
              light ? 'text-cyan-200/90' : 'text-slate-500'
            }`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  )
}
