import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!cursor || !dot || !outline) return

    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0
    let outlineX = 0, outlineY = 0
    let animId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    document.addEventListener('mousemove', onMouseMove)

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.8
      cursorY += (mouseY - cursorY) * 0.8
      outlineX += (mouseX - outlineX) * 0.15
      outlineY += (mouseY - outlineY) * 0.15

      dot.style.left = cursorX + 'px'
      dot.style.top = cursorY + 'px'
      outline.style.left = outlineX + 'px'
      outline.style.top = outlineY + 'px'

      animId = requestAnimationFrame(animateCursor)
    }
    animateCursor()

    const onEnter = () => cursor.classList.add('active')
    const onLeave = () => cursor.classList.remove('active')

    const updateInteractive = () => {
      document.querySelectorAll('a, button, .portfolio-item, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    updateInteractive()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
      document.querySelectorAll('a, button, .portfolio-item, input, textarea').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-outline" ref={outlineRef}></div>
    </div>
  )
}
