import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import MatrixCanvas from './components/MatrixCanvas'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function MatrixCanvasRoute() {
  const location = useLocation()
  if (location.pathname !== '/') return null
  return <MatrixCanvas />
}

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Fixed blurred photo background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 10%',
        filter: 'blur(36px)',
        transform: 'scale(1.08)',
        opacity: 0.45,
        zIndex: -1,
      }} />
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#060b1a',
        opacity: 0.78,
        zIndex: -1,
      }} />

      <MatrixCanvasRoute />

      <Nav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <AppRoutes />
      </main>
    </BrowserRouter>
  )
}
