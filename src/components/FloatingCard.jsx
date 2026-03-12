import { motion } from 'framer-motion'

export default function FloatingCard({ project }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 320,
        height: 200,
        borderRadius: 12,
        pointerEvents: 'none',
        background: project.preview
          ? '#000'
          : `linear-gradient(135deg, ${project.accent}cc 0%, ${project.accent}44 50%, #060b1a 100%)`,
        border: `1px solid ${project.accent}66`,
        overflow: 'hidden',
        boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}44`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {project.preview ? (
        <>
          <img
            src={project.preview}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)',
          }} />
          <span style={{
            position: 'absolute',
            bottom: 14,
            left: 16,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}>
            {project.title}
          </span>
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }} />
        </>
      ) : (
        <>
          <div style={{
            position: 'absolute',
            top: 16, left: 16,
            fontSize: 10,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)',
          }}>
            {project.category} · {project.year}
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            padding: '0 24px',
            lineHeight: 1.2,
            position: 'relative',
          }}>
            {project.title}
          </span>
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }} />
        </>
      )}
    </motion.div>
  )
}
