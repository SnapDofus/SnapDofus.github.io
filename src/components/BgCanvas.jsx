import { useEffect } from 'react'
import * as THREE from 'three'

export default function BgCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas')
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.position.z = 5

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1500
    const posArray = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    const torusGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100)
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ccff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    })
    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    scene.add(torus)

    let mouseXNorm = 0, mouseYNorm = 0
    const onMouseMove = (e) => {
      mouseXNorm = (e.clientX / window.innerWidth) * 2 - 1
      mouseYNorm = -(e.clientY / window.innerHeight) * 2 + 1
    }
    document.addEventListener('mousemove', onMouseMove)

    let animId
    const animateThree = () => {
      animId = requestAnimationFrame(animateThree)
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0008
      torus.rotation.x += 0.005 + mouseYNorm * 0.002
      torus.rotation.y += 0.003 + mouseXNorm * 0.002
      torus.rotation.z += 0.001
      camera.position.x = mouseXNorm * 0.3
      camera.position.y = mouseYNorm * 0.3
      renderer.render(scene, camera)
    }
    animateThree()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return <canvas id="bg-canvas"></canvas>
}
