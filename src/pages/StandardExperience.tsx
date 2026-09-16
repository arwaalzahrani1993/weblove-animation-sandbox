import { SmoothScrollProvider } from '../components/SmoothScrollProvider'
import { LevelOneLanding } from './LevelOneLanding'
import { MotionCockpit } from './MotionCockpit'

export default function StandardExperience() {
  const page = window.location.pathname.startsWith('/level-1')
    ? <LevelOneLanding />
    : <MotionCockpit />

  return <SmoothScrollProvider>{page}</SmoothScrollProvider>
}
