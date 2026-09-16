import { lazy, Suspense } from 'react'
import { LevelFiveSignature } from './pages/LevelFiveSignature'

const StandardExperience = lazy(() => import('./pages/StandardExperience'))
const BonusPhysics = lazy(() => import('./pages/BonusPhysics'))

function LoadingFallback() {
  return <main className="route-loading" aria-label="جاري تحميل التجربة" />
}

function App() {
  if (window.location.pathname.startsWith('/bonus/physics')) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <BonusPhysics />
      </Suspense>
    )
  }

  if (window.location.pathname.startsWith('/level5/signature')) {
    return <LevelFiveSignature />
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <StandardExperience />
    </Suspense>
  )
}

export default App
