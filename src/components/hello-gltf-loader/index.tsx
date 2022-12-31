import { useRef, useEffect } from "react"
import * as Three from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"


import './index.scss'

const HelloGLTFLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {

    if (canvasRef.current === null) { return }

    const renderer = new Three.WebGLRenderer({ canvas: canvasRef.current })
    const scene = new Three.Scene()
    scene.background = new Three.Color(0x0dd7f2)
    const camera = new Three.PerspectiveCamera(45, 2, 0.1, 100)
    camera.position.set(2, 2, 6)

    const light = new Three.HemisphereLight(0xFFFFFF, 0x333333, 1.5)
    scene.add(light)

    const loader = new GLTFLoader()
    loader.load('./model/duck/duck.gltf', (gltf) => {
      scene.add(gltf.scene)
    })

    const control = new OrbitControls(camera, canvasRef.current)
    control.update()

    const render = () => {
      renderer.render(scene, camera)
      window.requestAnimationFrame(render)
    }
    window.requestAnimationFrame(render)

    const handleResize = () => {
      if (canvasRef.current === null) { return }

      const width = canvasRef.current.clientWidth
      const height = canvasRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className='full-screen' />
  )
}

export default HelloGLTFLoader
