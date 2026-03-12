import { useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import FloatingCard from './FloatingCard'

function WorkRow({ project, index, onMouseEnter, onMouseLeave, onMouseMove }) {
  const [hovered, setHovered] = useState(false)

  const handleEnter = useCallback((e) => {
    setHovered(true)
    onMouseEnter(project, e)
  }, [project, onMouseEnter])

  const handleLeave = useCallback((e) => {
    setHovered(false)
    onMouseLeave(e)
  }, [onMouseLeave])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={onMouseMove}
      style={{ cursor: 'default' }}
    >
      {/* Divider line — animates scaleX in */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
        style={{
          height: 1,
          background: 'rgba(255,255,255,0.08)',
          transformOrigin: 'left',
        }}
      />

      {/* Row content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1.6rem 0',
        gap: '2rem',
      }}>
        {/* Index */}
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: hovered ? 'rgba(56,182,255,0.8)' : 'rgba(255,255,255,0.5)',
          letterSpacing: '0.05em',
          minWidth: 32,
          transition: 'color 0.25s ease',
          userSelect: 'none',
        }}>
          {project.id}
        </span>

        {/* Title */}
        <motion.span
          animate={{ x: hovered ? 12 : 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: hovered ? '#ffffff' : 'rgba(255,255,255,0.7)',
            transition: 'color 0.25s ease',
            flex: 1,
            display: 'block',
            lineHeight: 1,
          }}>
          {project.title}
        </motion.span>

        {/* Category + year */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 4,
          opacity: hovered ? 1 : 0.35,
          transition: 'opacity 0.25s ease',
        }}>
          <span style={{
            fontSize: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#38b6ff',
          }}>
            {project.category}
          </span>
          <span style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.65)',
            fontFamily: 'monospace',
          }}>
            {project.year}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Works() {
  const [hoveredProject, setHoveredProject] = useState(null)

  const rawX = useMotionValue(-1000)
  const rawY = useMotionValue(-1000)

  const springX = useSpring(rawX, { stiffness: 150, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 150, damping: 20 })

  const handleMouseMove = useCallback((e) => {
    rawX.set(e.clientX + 20)
    rawY.set(e.clientY - 20)
  }, [rawX, rawY])

  const handleRowEnter = useCallback((project, e) => {
    rawX.set(e.clientX + 20)
    rawY.set(e.clientY - 20)
    setHoveredProject(project)
  }, [rawX, rawY])

  const handleRowLeave = useCallback(() => {
    setHoveredProject(null)
  }, [])

  return (
    <section
      id="works"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        padding: '6rem 1.5rem 8rem',
      }}
    >
      {/* Floating cursor card — position driven by spring values */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 50,
        }}
      >
        <AnimatePresence mode="wait">
          {hoveredProject && (
            <FloatingCard key={hoveredProject.id} project={hoveredProject} />
          )}
        </AnimatePresence>
      </motion.div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '3rem',
          }}
        >
          <span style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#00d4ff',
            fontWeight: 500,
          }}>
            Curated Works
          </span>
          <span style={{
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'monospace',
          }}>
            {String(projects.length).padStart(2, '0')} Projects
          </span>
        </motion.div>

        {/* Project rows */}
        <div>
          {projects.map((project, index) => (
            <WorkRow
              key={project.id}
              project={project}
              index={index}
              onMouseEnter={handleRowEnter}
              onMouseLeave={handleRowLeave}
              onMouseMove={handleMouseMove}
            />
          ))}
          {/* Bottom divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: projects.length * 0.08 }}
            style={{
              height: 1,
              background: 'rgba(255,255,255,0.08)',
              transformOrigin: 'left',
            }}
          />
        </div>

      </div>
    </section>
  )
}
