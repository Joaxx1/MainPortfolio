import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

const links = [
  { label: 'Home',     href: '/'         },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact',  href: '/contact'  },
]

// Home page anchor links (shown only on '/')
const homeAnchors = [
  { label: 'What I Do', href: '#about'  },
  { label: 'Works',     href: '#works'  },
  { label: 'Skills',    href: '#skills' },
]

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [visible,  setVisible]    = useState(false)
  const [activeAnchor, setActiveAnchor] = useState('')
  const observersRef = useRef([])
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Delayed entry
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  // Scroll blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Anchor IntersectionObserver — only on home page
  useEffect(() => {
    observersRef.current.forEach(o => o.disconnect())
    observersRef.current = []
    setActiveAnchor('')

    if (!isHome) return

    observersRef.current = ['about', 'works', 'skills'].map(id => {
      const el = document.getElementById(id)
      if (!el) return { disconnect: () => {} }
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveAnchor(`#${id}`) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })
    return () => observersRef.current.forEach(o => o.disconnect())
  }, [isHome, location.pathname])

  const activePage = location.pathname

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}
        >
          <motion.div
            animate={{
              backgroundColor: scrolled ? 'rgba(2,11,24,0.85)' : 'rgba(10,22,40,0.6)',
              backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
              boxShadow: scrolled
                ? '0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,182,255,0.12)'
                : '0 2px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 8px', borderRadius: 50 }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: '#ffffff',
                padding: '6px 14px',
                letterSpacing: '-0.01em',
                textDecoration: 'none',
              }}
            >
              JJ
            </Link>

            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

            {/* Page links */}
            <LayoutGroup id="nav">
              {links.map(({ label, href }) => {
                const isActive = activePage === href
                return (
                  <Link
                    key={href}
                    to={href}
                    style={{ position: 'relative', textDecoration: 'none' }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 50,
                          background: 'rgba(56,182,255,0.15)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span style={{
                      position: 'relative',
                      display: 'block',
                      padding: '6px 14px',
                      fontSize: 13,
                      fontWeight: 500,
                      color: isActive ? '#38b6ff' : 'rgba(255,255,255,0.88)',
                      transition: 'color 0.2s',
                      whiteSpace: 'nowrap',
                    }}>
                      {label}
                    </span>
                  </Link>
                )
              })}

              {/* Anchor sub-links — only visible on home */}
              <AnimatePresence>
                {isHome && (
                  <>
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 1, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      style={{ height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 4px', flexShrink: 0 }}
                    />
                    {homeAnchors.map(({ label, href }) => {
                      const isActive = activeAnchor === href
                      return (
                        <motion.a
                          key={href}
                          href={href}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setActiveAnchor(href)}
                          style={{ position: 'relative', textDecoration: 'none' }}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="nav-anchor-pill"
                              style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: 50,
                                background: 'rgba(56,182,255,0.1)',
                              }}
                              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                            />
                          )}
                          <span style={{
                            position: 'relative',
                            display: 'block',
                            padding: '6px 12px',
                            fontSize: 12,
                            fontWeight: 500,
                            color: isActive ? '#38b6ff' : 'rgba(255,255,255,0.72)',
                            transition: 'color 0.2s',
                            whiteSpace: 'nowrap',
                          }}>
                            {label}
                          </span>
                        </motion.a>
                      )
                    })}
                  </>
                )}
              </AnimatePresence>
            </LayoutGroup>

          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
