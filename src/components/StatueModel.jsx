import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, useGLTF } from '@react-three/drei'

export default function StatueModel({ scrollProgress }) {
  const { scene } = useGLTF('/assets/greek_underwater_broken_statue_1.glb')
  const groupRef = useRef(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2
    }
  })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive scale={0.11} object={scene} position={[0, -1.3, 0]} />
      </Center>
    </group>
  )
}

useGLTF.preload('/assets/greek_underwater_broken_statue_1.glb')
