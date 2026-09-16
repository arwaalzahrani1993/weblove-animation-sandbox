import { useCallback, useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { ArrowDownLeft, RotateCcw } from 'lucide-react'
import '../styles/bonus-physics.css'

const LETTERS = ['أ', 'ر', 'و', 'ى']

type StageSize = {
  width: number
  height: number
}

function PhysicsStage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const resetRef = useRef<() => void>(() => undefined)
  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width)
      const height = Math.round(entry.contentRect.height)
      setStageSize((current) => (
        current.width === width && current.height === height ? current : { width, height }
      ))
    })

    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    const { width, height } = stageSize
    if (!stage || width < 280 || height < 420) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const engine = Matter.Engine.create({ enableSleeping: true })
    engine.gravity.y = reduceMotion ? 0 : 1.08

    const render = Matter.Render.create({
      element: stage,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    })

    render.canvas.setAttribute('aria-label', 'حروف اسم أروى تتحرك بفيزياء حقيقية ويمكن سحبها')
    render.canvas.setAttribute('role', 'img')

    const compact = width < 640
    const blockWidth = Math.min(compact ? width * 0.22 : width * 0.15, 176)
    const blockHeight = blockWidth * 1.08
    const floorDepth = 44
    const wallDepth = 80
    const spawnY = reduceMotion ? height * 0.52 : -blockHeight * 0.7
    const spread = Math.min(width * 0.72, blockWidth * 5.5)
    const startX = (width - spread) / 2 + blockWidth * 0.55
    const gap = (spread - blockWidth) / (LETTERS.length - 1)
    const letterMap = new Map<Matter.Body, string>()

    const boundaries = [
      Matter.Bodies.rectangle(width / 2, height + floorDepth / 2 - 8, width + wallDepth * 2, floorDepth, {
        isStatic: true,
        render: { visible: false },
      }),
      Matter.Bodies.rectangle(-wallDepth / 2, height / 2, wallDepth, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
      Matter.Bodies.rectangle(width + wallDepth / 2, height / 2, wallDepth, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
    ]

    const letterBodies = LETTERS.map((letter, index) => {
      const body = Matter.Bodies.rectangle(
        startX + gap * index,
        spawnY - (reduceMotion ? 0 : index * blockHeight * 0.76),
        blockWidth,
        blockHeight,
        {
          chamfer: { radius: blockWidth * 0.08 },
          restitution: 0.58,
          friction: 0.22,
          frictionAir: 0.012,
          density: 0.0022,
          angle: reduceMotion ? (index - 1.5) * 0.04 : (index - 1.5) * 0.12,
          render: {
            fillStyle: index === 0 ? '#d7ff3f' : '#f0eee7',
            strokeStyle: '#0b0c09',
            lineWidth: 2,
          },
        },
      )
      letterMap.set(body, letter)
      return body
    })

    Matter.Composite.add(engine.world, [...boundaries, ...letterBodies])

    const mouse = Matter.Mouse.create(render.canvas)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.18,
        damping: 0.12,
        render: { visible: false },
      },
    })
    Matter.Composite.add(engine.world, mouseConstraint)
    render.mouse = mouse

    const drawLetters = () => {
      const context = render.context
      context.save()
      context.strokeStyle = 'rgba(240, 238, 231, 0.2)'
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(0, height - 31)
      context.lineTo(width, height - 31)
      context.stroke()

      letterBodies.forEach((body) => {
        const letter = letterMap.get(body)
        if (!letter) return
        context.save()
        context.translate(body.position.x, body.position.y)
        context.rotate(body.angle)
        context.fillStyle = '#0b0c09'
        context.font = `800 ${Math.round(blockWidth * 0.68)}px "SF Arabic", "Geeza Pro", Tahoma, sans-serif`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(letter, 0, blockWidth * 0.03)
        context.restore()
      })
      context.restore()
    }

    Matter.Events.on(render, 'afterRender', drawLetters)

    const resetBodies = () => {
      letterBodies.forEach((body, index) => {
        Matter.Body.setPosition(body, {
          x: startX + gap * index,
          y: reduceMotion ? height * 0.52 : -blockHeight * 0.7 - index * blockHeight * 0.76,
        })
        Matter.Body.setVelocity(body, { x: 0, y: 0 })
        Matter.Body.setAngularVelocity(body, 0)
        Matter.Body.setAngle(body, reduceMotion ? (index - 1.5) * 0.04 : (index - 1.5) * 0.12)
        Matter.Sleeping.set(body, false)
      })
    }
    resetRef.current = resetBodies

    const runner = Matter.Runner.create()
    Matter.Render.run(render)
    Matter.Runner.run(runner, engine)

    return () => {
      resetRef.current = () => undefined
      Matter.Events.off(render, 'afterRender', drawLetters)
      Matter.Mouse.clearSourceEvents(mouse)
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
      Matter.Composite.clear(engine.world, false, true)
      Matter.Engine.clear(engine)
      render.canvas.remove()
    }
  }, [stageSize])

  const reset = useCallback(() => resetRef.current(), [])

  return (
    <div className="physics-stage" ref={stageRef}>
      <div className="physics-copy">
        <p>MATTER.JS / TACTILE HERO</p>
        <h1>حرّكي اسمي.<br />والجاذبية تُكمل.</h1>
      </div>

      <div className="physics-instructions" aria-hidden="true">
        <ArrowDownLeft size={18} />
        <span>اسحبي الحروف بالماوس أو اللمس</span>
      </div>

      <button className="physics-reset" type="button" onClick={reset}>
        <RotateCcw size={18} aria-hidden="true" />
        أعيدي السقوط
      </button>

      <p className="physics-accessible-copy">
        تجربة تفاعلية لاسم أروى. استخدمي زر إعادة السقوط لإعادة تشغيل المشهد.
      </p>
    </div>
  )
}

export default function BonusPhysics() {
  return (
    <main className="physics-page" dir="rtl">
      <header className="physics-nav">
        <a href="/level5/signature" aria-label="العودة إلى مختبر الحركة">ARWA</a>
        <span>FRONTIER LAB</span>
        <p>فيزياء ثنائية الأبعاد</p>
      </header>
      <PhysicsStage />
    </main>
  )
}
