import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

function lerp(a, b, t) { return a + (b - a) * t }

// ── Bones pour l'animation typing (depuis boneData.ts de la référence) ──
const TYPING_BONES = [
  'thighL','thighR','shinL','shinR','forearmL','forearmR','handL','handR',
  'f_pinky03R','f_pinky02L','f_pinky02R','f_pinky01L','f_pinky01R',
  'palm04L','palm04R','f_ring01L','thumb01L','thumb01R','thumb03L','thumb03R',
  'palm02L','palm02R','palm01L','palm01R','f_index01L','f_index01R',
  'palm03L','palm03R','f_ring02L','f_ring02R','f_ring01R','f_ring03L','f_ring03R',
  'f_middle01L','f_middle02L','f_middle03L','f_middle01R','f_middle02R','f_middle03R',
  'f_index02L','f_index03L','f_index02R','f_index03R','thumb02L','f_pinky03L',
  'upper_armL','upper_armR','thumb02R','toeL','heel02L','toeR','heel02R',
]

function filterClip(clip, boneNames) {
  const tracks = clip.tracks.filter(t => boneNames.some(b => t.name.includes(b)))
  return new THREE.AnimationClip(clip.name + '_filtered', clip.duration, tracks)
}

function setupAnimations(gltf, mixer) {
  const anims = gltf.animations
  if (!anims?.length) return

  // introAnimation — joue une fois et clamp à la fin (pose assise)
  const introClip = anims.find(c => c.name === 'introAnimation')
  if (introClip) {
    const action = mixer.clipAction(introClip)
    action.setLoop(THREE.LoopOnce, 1)
    action.clampWhenFinished = true
    action.play()
  }

  // Animations de touches clavier en boucle
  ;['key1', 'key2', 'key5', 'key6'].forEach(name => {
    const clip = THREE.AnimationClip.findByName(anims, name)
    if (clip) {
      const action = mixer.clipAction(clip)
      action.play()
      action.timeScale = 1.2
    }
  })

  // Typing — seulement les bones concernés
  const typingClip = THREE.AnimationClip.findByName(anims, 'typing')
  if (typingClip) {
    const action = mixer.clipAction(filterClip(typingClip, TYPING_BONES))
    action.enabled = true
    action.play()
    action.timeScale = 1.2
  }

  // Blink après 2.5s
  setTimeout(() => {
    const blinkClip = anims.find(c => c.name === 'Blink')
    if (blinkClip) mixer.clipAction(blinkClip).play().fadeIn(0.5)
  }, 2500)
}

export default function CharacterModel() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const aspect = rect.width / rect.height

    // ── Renderer ─────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(rect.width, rect.height, false)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    container.appendChild(renderer.domElement)

    // ── Scene ─────────────────────────────────────────────────────────
    const scene = new THREE.Scene()

    // ── Camera — vue 3/4 corps entier ────────────────────────────────
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 1000)
    camera.position.set(11, 9, 18)
    camera.lookAt(-2, 8, 0)
    camera.updateProjectionMatrix()

    // ── Éclairage ─────────────────────────────────────────────────────
    const dirLight = new THREE.DirectionalLight(0x00ff88, 0.8)
    dirLight.position.set(-0.47, -0.32, -1)
    scene.add(dirLight)

    const pointLight = new THREE.PointLight(0x00cc66, 0, 100, 3)
    pointLight.position.set(3, 12, 4)
    scene.add(pointLight)

    const fillLight = new THREE.DirectionalLight(0x00ffaa, 0.4)
    fillLight.position.set(2, 5, 3)
    scene.add(fillLight)

    new RGBELoader().load('/assets/char_enviorment.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture
      scene.environmentIntensity = 0.64
      scene.environmentRotation.set(5.76, 85.85, 1)
    })

    // ── Mouse ─────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const maxRot = Math.PI / 6
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Chargement ────────────────────────────────────────────────────
    let headBone = null
    let screenLight = null
    let mixer = null
    let rafId = null
    const clock = new THREE.Clock()

    const loader = new GLTFLoader()
    loader.load('/assets/character.glb', (gltf) => {
      const char = gltf.scene

      char.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      headBone   = char.getObjectByName('spine006') || null
      screenLight = char.getObjectByName('screenlight') || null

      const footR = char.getObjectByName('footR')
      const footL = char.getObjectByName('footL')
      if (footR) footR.position.y = 3.36
      if (footL) footL.position.y = 3.36

      mixer = new THREE.AnimationMixer(char)
      setupAnimations(gltf, mixer)

      scene.add(char)
    })

    // ── Boucle ────────────────────────────────────────────────────────
    const animate = () => {
      rafId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      if (mixer) mixer.update(delta)

      if (headBone) {
        headBone.rotation.y = lerp(headBone.rotation.y, mouse.x * maxRot, 0.1)
        headBone.rotation.x = lerp(headBone.rotation.x, -mouse.y * maxRot * 0.5, 0.2)
        if (screenLight?.material?.opacity > 0.9) {
          pointLight.intensity = screenLight.material.emissiveIntensity * 20
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      const r = container.getBoundingClientRect()
      camera.aspect = r.width / r.height
      camera.lookAt(-2, 8, 0)
      camera.updateProjectionMatrix()
      renderer.setSize(r.width, r.height, false)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mixer) mixer.stopAllAction()
      renderer.dispose()
      scene.clear()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
