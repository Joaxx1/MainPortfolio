import { motion } from 'framer-motion'

const skills = [
  { name: 'React',       color: '#61DAFB', category: 'Frontend'  },
  { name: 'Node.js',     color: '#68A063', category: 'Backend'   },
  { name: 'JavaScript',  color: '#F7DF1E', category: 'Language'  },
  { name: 'TypeScript',  color: '#3178C6', category: 'Language'  },
  { name: 'CSS',         color: '#38B6FF', category: 'Styling'   },
  { name: 'Python',      color: '#3776AB', category: 'Language'  },
  { name: 'Supabase',    color: '#3ECF8E', category: 'Database'  },
  { name: 'MongoDB',     color: '#47A248', category: 'Database'  },
  { name: 'PostgreSQL',  color: '#336791', category: 'Database'  },
  { name: 'Tailwind',    color: '#38B2AC', category: 'Styling'   },
  { name: 'Next.js',     color: '#ffffff', category: 'Frontend'  },
  { name: 'Git',         color: '#F05032', category: 'Tooling'   },
]

const categoryColors = {
  Frontend: 'rgba(56,182,255,0.12)',
  Backend:  'rgba(104,160,99,0.15)',
  Language: 'rgba(247,223,30,0.10)',
  Styling:  'rgba(56,178,172,0.12)',
  Database: 'rgba(62,207,142,0.12)',
  Tooling:  'rgba(240,80,50,0.12)',
}

function SkillChip({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 6) * 0.06 + Math.floor(index / 6) * 0.1,
      }}
      whileHover={{
        y: -5,
        scale: 1.06,
        boxShadow: `0 8px 30px ${skill.color}30, 0 0 0 1px ${skill.color}40`,
      }}

      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.65rem 1.1rem',
        borderRadius: 50,
        background: 'rgba(6, 11, 26, 0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <span style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: skill.color,
        flexShrink: 0,
        boxShadow: `0 0 6px ${skill.color}80`,
      }} />
      <span style={{
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#e2e8f0',
        whiteSpace: 'nowrap',
      }}>
        {skill.name}
      </span>
      <span style={{
        fontSize: '0.65rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '2px 7px',
        borderRadius: 50,
        background: categoryColors[skill.category] ?? 'rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.45)',
      }}>
        {skill.category}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        padding: '8rem 1.5rem',
        overflow: 'hidden',
      }}
    >

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: 30 }}
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
          Technologies
        </motion.p>

        {/* Heading */}
        <div style={{ overflow: 'hidden', marginBottom: '0.75rem' }}>
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
            Languages & Tools
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
            color: '#94a3b8',
            maxWidth: 480,
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}
        >
          The stack I reach for to build fast, scalable, and maintainable products.
        </motion.p>

        {/* Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {skills.map((skill, i) => (
            <SkillChip key={skill.name} skill={skill} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
