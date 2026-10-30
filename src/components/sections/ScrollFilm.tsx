import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Check, Film } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type Chapter = {
  id: string
  phase: string
  eyebrow: string
  title: string
  copy: string
  detail: string
  source: string
  poster: string
  credit: string
}

const chapters: Chapter[] = [
  {
    id: 'pickup',
    phase: '01 / PICKUP',
    eyebrow: 'It starts at your doorstep',
    title: 'Laundry day,\\nleaving your list.',
    copy: 'Book a pickup that fits your day. Our pickup partner collects your laundry from home and starts its journey to professional care.',
    detail: 'Doorstep collection · Scheduled time slots',
    source: 'https://videos.pexels.com/video-files/8756630/8756630-uhd_4096_2160_25fps.mp4',
    poster: 'https://images.pexels.com/videos/8756630/pictures/preview-0.jpg',
    credit: 'Tima Miroshnichenko · Pexels'
  },
  {
    id: 'sorting',
    phase: '02 / SORTING',
    eyebrow: 'A little attention goes a long way',
    title: 'Sorted by colour.\\nChecked by care.',
    copy: 'Garments are separated by colour and fabric. We check care labels and special instructions before choosing the right cleaning method.',
    detail: 'Fabric sorting · Garment inspection',
    source: 'https://videos.pexels.com/video-files/5592508/5592508-hd_1920_1080_24fps.mp4',
    poster: 'https://images.pexels.com/videos/5592508/pictures/preview-0.jpg',
    credit: 'RDNE Stock project · Pexels'
  },
  {
    id: 'washing',
    phase: '03 / WASHING',
    eyebrow: 'The clean you can feel',
    title: 'A proper clean.\\nFor every thread.',
    copy: 'Your clothes move through a cleaning process selected for the fabric and service. Thoughtful care, with hygiene at the centre.',
    detail: 'Wash · Dry · Specialist cleaning',
    source: 'https://videos.pexels.com/video-files/5901666/5901666-uhd_4096_2160_25fps.mp4',
    poster: 'https://images.pexels.com/videos/5901666/pictures/preview-0.jpg',
    credit: 'cottonbro studio · Pexels'
  },
  {
    id: 'finishing',
    phase: '04 / FINISHING',
    eyebrow: 'The finishing touch matters',
    title: 'Steam. Press.\\nFold to perfection.',
    copy: 'From steam ironing to a final quality check, each garment is finished neatly and prepared for its return journey.',
    detail: 'Steam ironing · Quality check · Folding',
    source: 'https://videos.pexels.com/video-files/5901669/5901669-uhd_4096_2160_25fps.mp4',
    poster: 'https://images.pexels.com/videos/5901669/pictures/preview-0.jpg',
    credit: 'cottonbro studio · Pexels'
  },
  {
    id: 'delivery',
    phase: '05 / DELIVERY',
    eyebrow: 'Fresh clothes, back where they belong',
    title: 'FreshFold.\\nBack at yours.',
    copy: 'Your clean, finished order is packed and sent back to your doorstep. Follow its progress, receive your clothes and get on with your day.',
    detail: 'Order updates · Doorstep delivery',
    source: 'https://videos.pexels.com/video-files/7287917/7287917-uhd_3840_2160_25fps.mp4',
    poster: 'https://images.pexels.com/videos/7287917/pictures/preview-0.jpg',
    credit: 'Kampus Production · Pexels'
  }
]

export function ScrollFilm() {
  const section = useRef<HTMLElement>(null)
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const copyRefs = useRef<HTMLDivElement[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const chapterRef = useRef<HTMLSpanElement>(null)
  const [videoErrors, setVideoErrors] = useState<string[]>([])

  useLayoutEffect(() => {
    const root = section.current
    if (!root) return

    let cancelled = false
    let context: gsap.Context | undefined

    const waitForMetadata = () => Promise.all(videoRefs.current.map(video => {
      if (!video) return Promise.resolve()
      if (video.readyState >= 1) return Promise.resolve()
      return new Promise<void>(resolve => {
        const done = () => resolve()
        video.addEventListener('loadedmetadata', done, { once: true })
        video.addEventListener('error', done, { once: true })
        window.setTimeout(done, 9000)
      })
    }))

    void waitForMetadata().then(() => {
      if (cancelled) return

      context = gsap.context(() => {
        const videos = videoRefs.current
        const copies = copyRefs.current
        if (videos.length !== chapters.length || copies.length !== chapters.length) return

        // Every clip is scrubbed by its own timeline segment. No autoplay and no slideshow.
        videos.forEach((video, index) => {
          video.pause()
          try { video.currentTime = 0 } catch { /* metadata may have failed */ }
          gsap.set(video, { autoAlpha: index === 0 ? 1 : 0, scale: 1.08, xPercent: index === 0 ? 0 : 1 })
        })
        gsap.set(copies, { autoAlpha: 0, y: 32, filter: 'blur(7px)' })
        gsap.set(copies[0], { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
        gsap.set(progressRef.current, { scaleX: 0 })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${window.innerHeight * 7.5}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        })

        chapters.forEach((chapter, index) => {
          const video = videos[index]
          const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 8
          const chapterStart = index * 0.78

          // The footage itself is the animation: scroll scrubs its actual video frames.
          timeline.fromTo(video,
            { currentTime: 0 },
            { currentTime: duration, duration: 1, ease: 'none' },
            chapterStart
          )

          // A slow, restrained camera move is layered over the real moving footage.
          timeline.fromTo(video,
            { scale: 1.12, xPercent: index % 2 === 0 ? 1.5 : -1.5 },
            { scale: 1.04, xPercent: 0, duration: 1, ease: 'none' },
            chapterStart
          )

          if (index > 0) {
            const transitionDuration = 0.22
            timeline.to(videos[index - 1], {
              autoAlpha: 0,
              duration: transitionDuration,
              ease: 'power1.inOut'
            }, chapterStart)
            timeline.to(video, {
              autoAlpha: 1,
              duration: transitionDuration,
              ease: 'power1.inOut'
            }, chapterStart)
            timeline.to(copies[index - 1], {
              autoAlpha: 0,
              y: -22,
              filter: 'blur(6px)',
              duration: transitionDuration,
              ease: 'power1.in'
            }, chapterStart)
            timeline.fromTo(copies[index],
              { autoAlpha: 0, y: 28, filter: 'blur(6px)' },
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.32,
                ease: 'power2.out'
              },
              chapterStart + 0.04
            )
          }

          timeline.to(progressRef.current, {
            scaleX: (index + 1) / chapters.length,
            duration: 0.75,
            ease: 'none'
          }, chapterStart + 0.2)

          timeline.call(() => {
            if (chapterRef.current) chapterRef.current.textContent = String(index + 1).padStart(2, '0')
          }, [], chapterStart + 0.04)
        })
      }, root)

      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      context?.revert()
    }
  }, [])

  const markVideoError = (id: string) => setVideoErrors(current => current.includes(id) ? current : [...current, id])

  return (
    <section ref={section} aria-label="The FreshFold laundry film" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#102b24] text-paper">
      <div className="absolute inset-0 bg-[#102b24]">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="absolute inset-0 overflow-hidden">
            <video
              ref={element => { if (element) videoRefs.current[index] = element }}
              className="absolute inset-0 h-full w-full object-cover"
              src={chapter.source}
              poster={chapter.poster}
              muted
              playsInline
              preload={index === 0 ? 'auto' : 'metadata'}
              disablePictureInPicture
              onError={() => markVideoError(chapter.id)}
            />
            {videoErrors.includes(chapter.id) && (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#31594a] via-[#17382e] to-[#0b1e18] px-8 text-center">
                <div><Film className="mx-auto mb-4 text-lime" size={36}/><p className="text-sm text-white/75">Video unavailable — download the clip from Pexels and add it to public/videos.</p></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b211b]/90 via-[#0b211b]/55 to-[#0b211b]/10"/>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b211b]/80 via-transparent to-[#0b211b]/35"/>
      <div className="pointer-events-none absolute inset-0 opacity-[.08]" style={{ backgroundImage: 'radial-gradient(#e9f0dc 1px, transparent 1px)', backgroundSize: '26px 26px' }}/>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pb-7 pt-28 md:px-12 md:pb-10 md:pt-32 xl:px-20">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-lime"><span className="h-px w-8 bg-lime"/> The FreshFold experience</p>
            <p className="mt-3 font-display text-sm font-semibold tracking-wide text-white/75">A five-part film. Directed by your scroll.</p>
          </div>
          <div className="hidden items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[.2em] backdrop-blur-md sm:flex">
            <Film size={13} className="text-lime"/> Scroll to play <ArrowDown size={13}/>
          </div>
        </div>

        <div className="relative flex flex-1 items-center">
          <div className="relative h-full w-full max-w-4xl">
            {chapters.map((chapter, index) => (
              <div key={chapter.id} ref={element => { if (element) copyRefs.current[index] = element }} className="absolute inset-0 flex flex-col justify-center">
                <div className="mb-7 flex items-center gap-4">
                  <span className="font-display text-5xl font-light tracking-[-.08em] text-lime/80 md:text-7xl">{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px w-10 bg-lime/70"/>
                  <span className="text-[10px] font-bold uppercase tracking-[.22em] text-white/80 md:text-xs">{chapter.eyebrow}</span>
                </div>
                <h2 className="max-w-4xl whitespace-pre-line font-display text-[clamp(3.2rem,8.4vw,8.2rem)] font-semibold leading-[.91] tracking-[-.075em]">{chapter.title}</h2>
                <p className="mt-7 max-w-xl text-base leading-7 text-white/80 md:mt-9 md:text-xl md:leading-8">{chapter.copy}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-3 text-xs font-bold text-[#142e27]"><Check size={14}/>{chapter.detail}</span>
                  <span className="rounded-full border border-white/30 bg-white/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/85 backdrop-blur">{chapter.phase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/30 pt-5">
          <div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[.2em] text-white/70">
            <span>YOUR LAUNDRY, FRAME BY FRAME</span>
            <span><span ref={chapterRef}>01</span><span className="px-1">/</span>{String(chapters.length).padStart(2, '0')}</span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-white/25"><div ref={progressRef} className="h-full origin-left scale-x-0 rounded-full bg-lime"/></div>
          <div className="mt-3 hidden justify-between text-[9px] font-semibold uppercase tracking-[.16em] text-white/55 md:flex">
            {chapters.map(chapter => <span key={chapter.id}>{chapter.phase}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
