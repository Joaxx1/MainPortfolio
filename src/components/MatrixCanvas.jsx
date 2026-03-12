import { useEffect, useRef } from 'react'

const CHARS = '012*=+-/<>12211*2=12*2='

export default function MatrixCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize = 13
    let drops = []
    const initDrops = () => {
      const cols = Math.floor(canvas.width / fontSize)
      drops = Array.from({ length: cols }, () => Math.random() * -canvas.height / fontSize)
    }
    initDrops()
    window.addEventListener('resize', initDrops)

    const updateOpacity = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1)
      canvas.style.opacity = 1 - progress * 0.88
    }
    updateOpacity()
    window.addEventListener('scroll', updateOpacity, { passive: true })

    let raf
    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 18, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px 'Courier New', monospace`

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.65) {
          drops[i] += 0.3 + Math.random() * 0.4
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) drops[i] = Math.random() * -60
          continue
        }

        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        const a = 0.18 + Math.random() * 0.55
        const r = Math.round(40  + Math.random() * 80)
        const g = Math.round(140 + Math.random() * 90)
        const b = 255

        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(56, 182, 255, ${a * 0.8})`
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
        ctx.fillText(char, x, y)
        ctx.shadowBlur = 0

        drops[i] += 0.4 + Math.random() * 0.5
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -50
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', initDrops)
      window.removeEventListener('scroll', updateOpacity)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        mixBlendMode: 'screen',
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.5s ease',
      }}
    />
  )
}
