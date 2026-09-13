import { motion, useReducedMotion } from 'framer-motion'
import {
  BadgeCheck,
  Boxes,
  Gauge,
  GitBranch,
  Laptop,
  MoveUpRight,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { cockpitItems } from './copy'
import { LevelOneLanding } from './pages/LevelOneLanding'

function App() {
  const reduceMotion = useReducedMotion()

  if (window.location.pathname.startsWith('/level-1')) {
    return <LevelOneLanding />
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] px-5 py-6 text-stone-100 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -bottom-44 -left-28 h-[30rem] w-[30rem] rounded-full bg-orange-700/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-amber-300/30 bg-amber-300/10 text-amber-300">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-wide">ARWA / MOTION LAB</p>
              <p className="text-xs text-stone-500">Weblove Animations · Level 0</p>
            </div>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            النظام يعمل
          </span>
        </header>

        <section className="grid items-end gap-10 py-16 lg:grid-cols-[1.35fr_0.65fr] lg:py-24">
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5 flex items-center gap-2 text-sm font-medium text-amber-300"
            >
              <BadgeCheck size={17} aria-hidden="true" />
              تم تجهيز غرفة التحكم
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-7xl"
            >
              أول بكسل يتحرّك من هنا.
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-7 max-w-2xl text-base leading-8 text-stone-400 sm:text-lg"
            >
              بيئة نظيفة وجاهزة لتجارب CSS وGSAP وFramer Motion و3D، مع قواعد أداء واضحة وحركة تحترم إعدادات المستخدم.
            </motion.p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto grid aspect-square w-full max-w-[300px] place-items-center rounded-full border border-white/10"
            aria-hidden="true"
          >
            <motion.div
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-5 rounded-full border border-dashed border-amber-300/30"
            >
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_24px_rgba(252,211,77,.8)]" />
            </motion.div>
            <div className="grid h-32 w-32 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-center backdrop-blur-sm">
              <div>
                <span className="block text-4xl font-semibold">01</span>
                <span className="mt-1 block text-xs text-stone-500">SETUP</span>
              </div>
            </div>
          </motion.div>
        </section>

        <section aria-labelledby="stack-title" className="border-t border-white/10 py-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-stone-500">Cockpit check</p>
              <h2 id="stack-title" className="text-2xl font-semibold">الأدوات جاهزة للتعلّم</h2>
            </div>
            <Boxes className="text-stone-600" aria-hidden="true" />
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {cockpitItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.08 }}
                className="bg-[#0d0d0d] p-5"
              >
                <p className="text-xs text-amber-300">0{index + 1}</p>
                <h3 className="mt-8 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5"><Laptop size={14} /> Desktop ready</span>
            <span className="flex items-center gap-1.5"><Smartphone size={14} /> Mobile first</span>
            <span className="flex items-center gap-1.5"><Gauge size={14} /> Performance 90+</span>
          </div>
          <span className="flex items-center gap-1.5"><GitBranch size={14} /> جاهز للرفع <MoveUpRight size={13} /></span>
        </footer>
      </div>
    </main>
  )
}

export default App
