import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const cards = [
  {
    icon: '⬡',
    title: 'Frontend',
    description: 'Crafting fast, responsive interfaces with React, Tailwind, and fluid animations that feel native.',
  },
  {
    icon: '◈',
    title: 'Backend',
    description: 'Building reliable APIs and services with Node.js, Python, and modern database solutions.',
  },
  {
    icon: '◎',
    title: 'Full Stack',
    description: 'Shipping complete products end-to-end — from database schema to deployment and everything between.',
  },
]

function TiltCard({ card, index }) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.14 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
        flex: '1 1 280px',
        background: 'rgba(6, 11, 26, 0.65)',
        border: '1px solid rgba(56,182,255,0.12)',
        borderRadius: 20,
        padding: '2rem',
        cursor: 'default',
        backdropFilter: 'blur(12px)',
      }}
      whileHover={{
        boxShadow: '0 16px 48px rgba(0,212,255,0.1), 0 0 0 1px rgba(56,182,255,0.22)',
        borderColor: 'rgba(56,182,255,0.25)',
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(14,77,146,0.4), rgba(0,212,255,0.2))',
        border: '1px solid rgba(56,182,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        marginBottom: '1.25rem',
        color: '#38b6ff',
      }}>
        {card.icon}
      </div>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.2rem',
        fontWeight: 600,
        marginBottom: '0.6rem',
        color: '#ffffff',
      }}>
        {card.title}
      </h3>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#c8d3e0' }}>
        {card.description}
      </p>
    </motion.div>
  )
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '8rem 1.5rem',
        overflow: 'hidden',
      }}
    >


      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#00d4ff',
            marginBottom: '1rem',
            fontWeight: 500,
          }}
        >
          What I Do
        </motion.p>

        {/* Heading */}
        <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            Building digital experiences
            <br />
            <span style={{ color: '#38b6ff' }}>that matter</span>
          </motion.h2>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          style={{
            fontSize: '1rem',
            color: '#c8d3e0',
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: '3.5rem',
          }}
        >
          I'm a full stack developer who cares about the craft —
          clean code, thoughtful UX, and products that are actually a pleasure to use.
        </motion.p>

        {/* Cards */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          {cards.map((card, i) => (
            <TiltCard key={card.title} card={card} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
