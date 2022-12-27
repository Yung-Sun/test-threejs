import React, {useRef, useEffect} from 'react'
import {WebGLRenderer, PerspectiveCamera, Scene, BoxGeometry, Mesh, DirectionalLight, MeshPhongMaterial} from 'three'
import './index.scss'

const HelloThreejs: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef.current) {
            const renderer = new WebGLRenderer({canvas: canvasRef.current})

            const camera = new PerspectiveCamera(75, 2, 1, 20)

            const scene = new Scene()

            const geometry = new BoxGeometry(1, 1, 1)

            const material1 = new MeshPhongMaterial({color: 0x44aa88})
            const material2 = new MeshPhongMaterial({color: 0xc50d0d})
            const material3 = new MeshPhongMaterial({color: 0x39b20a})

            //创建 3 个网格
            const cube1 = new Mesh(geometry, material1)
            cube1.position.x = -2
            scene.add(cube1)//将网格添加到场景中

            const cube2 = new Mesh(geometry, material2)
            cube2.position.x = 0
            scene.add(cube2)//将网格添加到场景中

            const cube3 = new Mesh(geometry, material3)
            cube3.position.x = 2
            scene.add(cube3)//将网格添加到场景中

            const cubes = [cube1, cube2, cube3]


            const light = new DirectionalLight(0xFFFFFF, 1.5)
            light.position.set(-1, 2, 4)
            scene.add(light)

            camera.position.z = 5

            const render = (time: number) => {
                time = time * 0.001 //原本 time 为毫秒，我们这里对 time 进行转化，修改成 秒，以便于我们动画旋转角度的递增
                cubes.map(cube => {
                    cube.rotation.x = time * 0.5
                    cube.rotation.y = time * 0.5
                    cube.rotation.z = time * 0.5
                })
                renderer.render(scene, camera)
                window.requestAnimationFrame(render)
            }
            window.requestAnimationFrame(render)

            const handleResize = () => {
                const canvas = renderer.domElement //获取 canvas
                camera.aspect = canvas.clientWidth / canvas.clientHeight //设置镜头宽高比
                camera.updateProjectionMatrix() //通知镜头更新视椎(视野)

                renderer.setSize(canvas.clientWidth, canvas.clientHeight, false) //第3个参数为可选参数，默认值为 true，false 意思是阻止因渲染内容尺寸发生变化而去修改 canvas 尺寸
            }
            handleResize() //默认打开时，即重新触发一次

            const resizeObserver = new ResizeObserver(() => {
                handleResize()
            })
            resizeObserver.observe(canvasRef.current)

            return () => {
                resizeObserver.disconnect()
            }
        }
    }, [canvasRef])


    return (
        <canvas ref={canvasRef} className='full-screen'/>
    )
}

export default HelloThreejs