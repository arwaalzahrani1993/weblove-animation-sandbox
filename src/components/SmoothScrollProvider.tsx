import { useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { Waves } from 'lucide-react'

const STORAGE_KEY = 'arwa-smooth-scroll'

type SmoothScrollProviderProps = {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reduceMotion = useReducedMotion()
  const hideControl = window.location.pathname.startsWith('/level5/signature')
  const [userEnabled, setUserEnabled] = useState(() => {
    return window.localStorage.getItem(STORAGE_KEY) !== 'off'
  })
  const enabled = userEnabled && !reduceMotion

  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      anchors: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
    })
    let frameId = 0

    const update = (time: number) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(update)
    }

    frameId = window.requestAnimationFrame(update)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [enabled])

  const toggleSmoothScroll = () => {
    const nextValue = !userEnabled
    setUserEnabled(nextValue)
    window.localStorage.setItem(STORAGE_KEY, nextValue ? 'on' : 'off')
  }

  const status = reduceMotion
    ? 'تقليل الحركة مفعّل'
    : enabled
      ? 'التمرير الناعم يعمل'
      : 'التمرير الناعم متوقف'

  return (
    <>
      {children}
      {!hideControl && (
        <button
          type="button"
          className="smooth-scroll-toggle"
          aria-label={status}
          aria-pressed={enabled}
          disabled={Boolean(reduceMotion)}
          onClick={toggleSmoothScroll}
          title={reduceMotion ? 'أوقف تقليل الحركة من إعدادات جهازك لتجربة التمرير الناعم' : status}
        >
          <Waves size={17} strokeWidth={1.8} aria-hidden="true" />
          <span>{status}</span>
        </button>
      )}
    </>
  )
}
