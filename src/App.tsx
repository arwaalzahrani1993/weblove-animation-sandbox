import { lazy, Suspense } from 'react'
import { LevelFiveSignature } from './pages/LevelFiveSignature'

const StandardExperience = lazy(() => import('./pages/StandardExperience'))

function LoadingFallback() {
  return <main className="route-loading" aria-label="جاري تحميل التجربة" />
}

function App() {
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
