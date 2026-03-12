import { useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import FloatingCard from '../components/FloatingCard'

function ProjectRow({ project, index, onMouseEnter, onMouseLeave, onMouseMove, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false)

  const handleEnter = useCallback((e) => {
    setHovered(true)
    onMouseEnter(project, e)
  }, [project, onMouseEnter])

  const handleLeave = useCallback((e) => {
    setHovered(false)
    onMouseLeave(e)
  }, [onMouseLeave])

  const active = hovered || isSelected

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={onMouseMove}
      onClick={() => onClick(project)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{
        height: 1,
        background: 'rgba(255,255,255,0.08)',
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1.75rem 0',
        gap: '2rem',
      }}>
        {/* Index */}
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: active ? 'rgba(56,182,255,0.8)' : 'rgba(255,255,255,0.5)',
          letterSpacing: '0.05em',
          minWidth: 32,
          transition: 'color 0.25s ease',
          userSelect: 'none',
        }}>
          {project.id}
        </span>

        {/* Title */}
        <motion.span
          animate={{ x: active ? 12 : 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: active ? '#ffffff' : 'rgba(255,255,255,0.88)',
            transition: 'color 0.25s ease',
            flex: 1,
            display: 'block',
            lineHeight: 1,
          }}>
          {project.title}
        </motion.span>

        {/* Right meta */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 4,
          opacity: active ? 1 : 0.35,
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

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6,11,26,0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 600,
          background: 'rgba(10,18,38,0.95)',
          border: `1px solid ${project.accent}44`,
          borderRadius: 20,
          padding: '2.5rem',
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${project.accent}22`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent top bar */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }} />

        {/* Full preview image */}
        {project.preview && (
          <div style={{
            margin: '-2.5rem -2.5rem 2rem',
            height: 260,
            overflow: 'hidden',
            borderRadius: '20px 20px 0 0',
            position: 'relative',
          }}>
            <img
              src={project.preview}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(10,18,38,0.95) 100%)',
            }} />
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.75)',
            width: 32,
            height: 32,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{
            fontSize: 11,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: project.accent,
            display: 'block',
            marginBottom: 10,
          }}>
            {project.category} · {project.year}
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: 0,
          }}>
            {project.title}
          </h2>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.95rem',
          color: '#c8d3e0',
          lineHeight: 1.7,
          marginBottom: '1.75rem',
        }}>
          {project.description}
        </p>

        {/* Stack */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{
            fontSize: 11,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.58)',
            display: 'block',
            marginBottom: 10,
          }}>
            Stack
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.stack.map(tech => (
              <span
                key={tech}
                style={{
                  padding: '5px 12px',
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.88)',
                  fontFamily: 'monospace',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Status badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 12px',
          borderRadius: 999,
          background: `${project.accent}18`,
          border: `1px solid ${project.accent}40`,
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: project.accent,
            boxShadow: `0 0 6px ${project.accent}`,
          }} />
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: project.accent,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {project.status}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

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
    <main
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', zIndex: 1, minHeight: '100vh', padding: '10rem 1.5rem 8rem' }}
    >
      {/* Floating cursor card */}
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
          {hoveredProject && !selectedProject && (
            <FloatingCard key={hoveredProject.id} project={hoveredProject} />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#00d4ff',
            fontWeight: 500,
            marginBottom: '1rem',
          }}>
            Selected Work
          </p>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#ffffff',
            marginBottom: '1rem',
          }}>
            Projects
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#c8d3e0',
            maxWidth: 480,
            lineHeight: 1.7,
          }}>
            A curated selection of things I've built — hover to preview, click for details.
          </p>
        </motion.div>

        {/* Project list */}
        <div>
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onMouseEnter={handleRowEnter}
              onMouseLeave={handleRowLeave}
              onMouseMove={handleMouseMove}
              isSelected={selectedProject?.id === project.id}
              onClick={setSelectedProject}
            />
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

      </div>
    </main>
  )
}
