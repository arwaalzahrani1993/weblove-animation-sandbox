import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Pause, Play, RotateCcw } from 'lucide-react'

const SCENE_COUNT = 6
const SCENE_DURATION = 3200

const sceneTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
}

function Scene({ index }: { index: number }) {
  if (index === 0) {
    return (
      <motion.div className="cinema-scene cinema-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={sceneTransition}>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...sceneTransition, delay: 0.15 }}>
          الحركة النظيفة ما تحتاج زحمة.
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ ...sceneTransition, delay: 0.28 }}>
          لحظة واحدة.<br /><span>وتثبت.</span>
        </motion.h1>
      </motion.div>
    )
  }

  if (index === 1) {
    return (
      <motion.div className="cinema-scene cinema-rhythm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={sceneTransition}>
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ ...sceneTransition, delay: 0.1 }} />
        <motion.h2 initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ ...sceneTransition, delay: 0.2 }}>
          نبني الإيقاع<br />قبل المؤثر.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          كل دخول له وقت. وكل فراغ له دور.
        </motion.p>
      </motion.div>
    )
  }

  if (index === 2) {
    return (
      <motion.div className="cinema-scene cinema-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={sceneTransition}>
        <div>
          <motion.p initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ ...sceneTransition, delay: 0.12 }}>SVG</motion.p>
          <motion.h2 initial={{ opacity: 0, x: 38 }} animate={{ opacity: 1, x: 0 }} transition={{ ...sceneTransition, delay: 0.24 }}>
            خط واحد.<br />يرسم الفكرة.
          </motion.h2>
        </div>
        <svg viewBox="0 0 520 240" aria-hidden="true">
          <motion.path
            d="M22 166 C94 20 142 228 218 102 C286 -10 324 238 498 66"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          />
        </svg>
      </motion.div>
    )
  }

  if (index === 3) {
    return (
      <motion.div className="cinema-scene cinema-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={sceneTransition}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          الاسم في مكانه الصحيح
        </motion.p>
        <div className="name-reveal">
          <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
            أروى
          </motion.h2>
        </div>
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}>
          تظهر بهدوء. ولا تزاحم المشهد.
        </motion.span>
      </motion.div>
    )
  }

  if (index === 4) {
    const items = ['نص', 'مسار', 'إيقاع', 'مساحة']
    return (
      <motion.div className="cinema-scene cinema-system" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={sceneTransition}>
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={sceneTransition}>أربع قطع. مشهد واحد.</motion.h2>
        <div className="system-grid">
          {items.map((item, itemIndex) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...sceneTransition, delay: 0.18 + itemIndex * 0.12 }}
            >
              <span>{String(itemIndex + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className="cinema-scene cinema-rule" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={sceneTransition}>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...sceneTransition, delay: 0.1 }}>القاعدة التي تضبط كل شيء</motion.p>
      <motion.h2 initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
        مؤثر واحد.<br /><span>هذا هو الذوق.</span>
      </motion.h2>
    </motion.div>
  )
}

export function MotionShowcase() {
  const reduceMotion = useReducedMotion()
  const [scene, setScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying || reduceMotion) return

    const timer = window.setInterval(() => {
      setScene((current) => (current + 1) % SCENE_COUNT)
    }, SCENE_DURATION)

    return () => window.clearInterval(timer)
  }, [isPlaying, reduceMotion])

  const replay = () => {
    setScene(0)
    setIsPlaying(true)
  }

  return (
    <section className="motion-cinema" aria-label="عرض حركي تلقائي من ستة مشاهد">
      <div className="cinema-frame">
        <AnimatePresence mode="sync">
          <Scene key={scene} index={scene} />
        </AnimatePresence>

        <div className="cinema-progress" aria-label={`المشهد ${scene + 1} من ${SCENE_COUNT}`}>
          {Array.from({ length: SCENE_COUNT }).map((_, index) => (
            <span key={index} className={index === scene ? 'is-active' : index < scene ? 'is-complete' : ''} />
          ))}
        </div>

        <div className="cinema-controls">
          <button type="button" onClick={() => setIsPlaying((value) => !value)} aria-label={isPlaying ? 'إيقاف العرض مؤقتًا' : 'تشغيل العرض'}>
            {isPlaying ? <Pause size={18} strokeWidth={1.8} /> : <Play size={18} strokeWidth={1.8} />}
          </button>
          <button type="button" onClick={replay} aria-label="إعادة العرض من البداية">
            <RotateCcw size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  )
}
