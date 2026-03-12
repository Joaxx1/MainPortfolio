import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMAIL = 'joaxjuanico026@gmail.com'

const socials = [
  {
    label: 'GitHub',
    handle: '@Joaxx1',
    href: 'https://github.com/Joaxx1',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    handle: 'joaquin.juanico',
    href: 'https://www.facebook.com/joaquin.juanico.2025',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.93-1.956 1.886v2.286h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select text
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Construct mailto with form data
    const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name}`)
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '0.9rem 1.1rem',
    fontSize: '0.9rem',
    color: '#ffffff',
    fontFamily: 'Inter, system-ui, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  }

  return (
    <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh', padding: '10rem 1.5rem 8rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '5rem' }}
        >
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#00d4ff',
            fontWeight: 500,
            marginBottom: '1rem',
          }}>
            Get In Touch
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
            Let's build something
            <br />
            <span style={{ color: '#38b6ff' }}>together.</span>
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#c8d3e0',
            maxWidth: 460,
            lineHeight: 1.7,
          }}>
            Open to freelance projects, full-time roles, and interesting collaborations.
            Drop me a line and I'll get back within 24 hours.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    padding: '2.5rem',
                    borderRadius: 16,
                    background: 'rgba(56,182,255,0.06)',
                    border: '1px solid rgba(56,182,255,0.2)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                  <p style={{ color: '#38b6ff', fontWeight: 600, marginBottom: 6 }}>Email client opened!</p>
                  <p style={{ color: '#c8d3e0', fontSize: '0.9rem' }}>Your message is pre-filled and ready to send.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', display: 'block', marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        placeholder="Your name"
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'rgba(56,182,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(56,182,255,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', display: 'block', marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        placeholder="your@email.com"
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'rgba(56,182,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(56,182,255,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', display: 'block', marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>Message</label>
                    <textarea
                      required
                      rows={6}
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      placeholder="Tell me about your project..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(56,182,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(56,182,255,0.08)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '0.9rem 2rem',
                      borderRadius: 999,
                      background: 'linear-gradient(135deg, #0e4d92, #00d4ff)',
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: "'Space Grotesk', sans-serif",
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                      alignSelf: 'flex-start',
                    }}
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — email + socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            {/* Email copy */}
            <div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
                Or reach out directly
              </p>
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '0.85rem 1.25rem',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      style={{ color: '#38b6ff', fontSize: 16 }}
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}
                    >
                      ⎘
                    </motion.span>
                  )}
                </AnimatePresence>
                <span style={{ flex: 1 }}>{EMAIL}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.58)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.08em' }}>
                  {copied ? 'Copied!' : 'Click to copy'}
                </span>
              </motion.button>
            </div>

            {/* Socials */}
            <div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
                Find me on
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {socials.map(({ label, handle, href, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '0.85rem 1.1rem',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      textDecoration: 'none',
                      color: 'rgba(255,255,255,0.9)',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(56,182,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(56,182,255,0.18)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.65)', flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#ffffff', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.3 }}>
                        {label}
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontFamily: 'monospace' }}>
                        {handle}
                      </div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>→</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability note */}
            <div style={{
              padding: '1rem 1.25rem',
              borderRadius: 12,
              background: 'rgba(56,182,255,0.05)',
              border: '1px solid rgba(56,182,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#38b6ff',
                boxShadow: '0 0 8px #38b6ff',
                flexShrink: 0,
                animation: 'pulse-glow 2.4s infinite',
              }} />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.82)', margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: '#38b6ff' }}>Available</strong> for new projects starting early 2025.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </main>
  )
}
