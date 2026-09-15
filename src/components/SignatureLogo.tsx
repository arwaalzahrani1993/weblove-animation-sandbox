import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type SignatureLogoProps = {
  replayKey?: number
}

export function SignatureLogo({ replayKey = 0 }: SignatureLogoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    if (reduceMotion) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.45 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion, replayKey])

  return (
    <div ref={wrapperRef} className="signature-mark">
      <svg
        viewBox="0 0 840 150"
        role="img"
        aria-labelledby="signature-title signature-description"
      >
        <title id="signature-title">اللمسة الخطية لاسم أروى</title>
        <desc id="signature-description">مسار زخرفي واحد يرسم نفسه أسفل اسم أروى</desc>
        <path
          className={isVisible ? 'signature-path is-visible' : 'signature-path'}
          pathLength="1"
          d="M814 48 C735 40 706 102 629 96 C558 90 530 27 449 44 C381 58 352 116 278 104 C206 93 161 42 91 68 C64 78 45 94 26 116"
        />
      </svg>
    </div>
  )
}
