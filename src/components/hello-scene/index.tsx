import {useEffect, useRef} from "react";
import * as Three from "three"
import {
    solarSystem,
    earthOrbit,
    moonOrbit,
    pointLight,
    saturnOrbit,
    directionalLight
} from '@/components/hello-scene/create-something'
import './index.scss'

const nodeArr = [solarSystem, earthOrbit, moonOrbit, saturnOrbit] //太阳、地球、月亮对应的网格
const HelloScene = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rendererRef = useRef<Three.WebGLRenderer | null>(null)
    const cameraRef = useRef<Three.PerspectiveCamera | null>(null)
    const sceneRef = useRef<Three.Scene | null>(null)

    useEffect(() => {
        //创建渲染器
        const renderer = new Three.WebGLRenderer({canvas: canvasRef.current as HTMLCanvasElement})
        rendererRef.current = renderer

        //创建镜头
        const camera = new Three.PerspectiveCamera(40, 2, 0.1, 1000)
        camera.position.set(30, 30, 30)
        camera.lookAt(0, 0, 0)
        cameraRef.current = camera

        //创建场景
        const scene = new Three.Scene()
        scene.background = new Three.Color(0x000000)
        sceneRef.current = scene

        //将太阳系、灯光添加到场景中
        scene.add(solarSystem)
        scene.add(directionalLight)
        scene.add(pointLight)

        //创建循环渲染的动画
        const render = (time: number) => {
            time = time * 0.001
            nodeArr.forEach((item) => {
                item.rotation.y = time
            })
            renderer.render(scene, camera)
            window.requestAnimationFrame(render)
        }
        window.requestAnimationFrame(render)

        //添加窗口尺寸变化的监听
        const resizeHandle = () => {
            const canvas = renderer.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
        }
        resizeHandle()
        window.addEventListener('resize', resizeHandle)

        return () => {
            window.removeEventListener('resize', resizeHandle)
        }

    }, [canvasRef])

    return (
        <canvas ref={canvasRef} className='full-screen'/>
    )
}

export default HelloScene