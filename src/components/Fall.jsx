import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Fall({ children, delay = 0, color = '#0a0a0f' }) {
  const elementRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current, { type: 'words' })
      const words = split.words
      const colorBoxes = []

      words.forEach((word) => {
        gsap.set(word, { display: 'inline-block', position: 'relative' })

        const rect = word.getBoundingClientRect()
        const box = document.createElement('div')
        box.style.cssText = `
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: ${rect.width * 1.1}px;
          height: ${rect.height * 0.9}px;
          background: ${color};
          border-radius: .5vw;
          pointer-events: none;
        `
        word.appendChild(box)
        colorBoxes.push(box)
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'bottom 30%',
        },
        delay,
        onComplete: () => colorBoxes.forEach(b => b.style.display = 'none')
      })

      tl.to(colorBoxes, {
        y: () => gsap.utils.random(1200, 1600),
        x: () => gsap.utils.random(-150, 150),
        rotation: () => gsap.utils.random(-360, 360),
        duration: 1,
        ease: 'power2.in',
        stagger: 0.02,
      })
    }, elementRef)

    return () => ctx.revert()
  }, [delay, color])

  return (
    <div ref={elementRef}>
      <div ref={textRef}>{children}</div>
    </div>
  )
}
