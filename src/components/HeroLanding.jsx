import { motion } from 'framer-motion'
import { projects } from '../data/projects'

export default function HeroLanding() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
    }}>

      {/* Left content */}
      <div style={{
        position: 'absolute',
        left: 'clamp(32px, 6vw, 96px)',
        top: '50%',
        transform: 'translateY(-40%)',
        maxWidth: 420,
        zIndex: 10,
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 12px 5px 6px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(8px)',
            marginBottom: 24,
          }}
        >
          <span style={{
            padding: '2px 8px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.9)',
            color: '#060b1a',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.04em',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            Open
          </span>
          <span style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.75)',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.01em',
          }}>
            Available for new projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            fontFamily: "'Courier New', 'Courier', monospace",
            fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            color: '#ffffff',
            marginBottom: 20,
            letterSpacing: '-0.01em',
          }}
        >
          Built Where<br />
          <span style={{ color: 'rgba(180,220,255,0.95)' }}>Code Meets</span><br />
          Imagination.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.65,
            marginBottom: 36,
            fontFamily: 'Inter, system-ui, sans-serif',
            maxWidth: 360,
          }}
        >
          Full-stack developer turning complex ideas into seamless digital
          experiences — fast, precise, and built to last.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
        >
          <motion.a
            href="#about"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              borderRadius: 999,
              background: '#ffffff',
              color: '#060b1a',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Inter, system-ui, sans-serif',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="/CV.txt"
            download="Joaquin_Juanico_CV.txt"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              borderRadius: 999,
              background: 'transparent',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Inter, system-ui, sans-serif',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            Download CV
          </motion.a>
        </motion.div>
      </div>

      {/* Right stats */}
      <div style={{
        position: 'absolute',
        right: 'clamp(32px, 6vw, 96px)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        zIndex: 10,
      }}>
        {[
          { value: '1+',    label: 'Years Full-Stack\nDevelopment' },
          { value: String(projects.length), label: 'Projects\nShipped' },
        ].map(({ value, label }, i) => (
          <motion.div
            key={value}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.55 }}
          >
            <div style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: 6,
            }}>
              {value}
            </div>
            <div style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.72)',
              fontFamily: 'Inter, system-ui, sans-serif',
              lineHeight: 1.5,
              whiteSpace: 'pre-line',
            }}>
              {label}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}
