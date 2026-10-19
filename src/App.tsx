import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { DemoProvider } from './state'
import Landing from './screens/Landing'
import Hakbang from './screens/Hakbang'
import Lesson from './screens/Lesson'
import Sumali, { SumaliDone } from './screens/Sumali'
import Invest from './screens/Invest'
import { Ako, AppHome, Kwento, Maturity } from './screens/Dashboard'
import Nudges from './screens/Nudges'
import Compare from './screens/Compare'
import Gallery from './screens/Gallery'
import { DesktopShell } from './components/DesktopShell'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <DemoProvider>
        <ScrollTop />
        <DesktopShell>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/hakbang" element={<Hakbang />} />
          <Route path="/hakbang/lesson/:id" element={<Lesson />} />
          <Route path="/sumali" element={<Sumali />} />
          <Route path="/sumali/done" element={<SumaliDone />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/app" element={<AppHome />} />
          <Route path="/app/kwento" element={<Kwento />} />
          <Route path="/app/maturity" element={<Maturity />} />
          <Route path="/app/ako" element={<Ako />} />
          <Route path="/nudges" element={<Nudges />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </DesktopShell>
      </DemoProvider>
    </BrowserRouter>
  )
}
