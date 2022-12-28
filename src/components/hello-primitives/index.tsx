import {useCallback, useEffect, useRef} from "react";
import './index.scss'
import * as Three from "three";

import {myWireframe} from "./primitives/my-wireframe";
import {myEdges} from "./primitives/my-edges";

import {myBox} from "./primitives/my-box"
import {myCircle} from "./primitives/my-circle";
import {myCone} from "./primitives/my-cone";
import {myCylinder} from "./primitives/my-cylinder";
import {myDodecahedron} from "./primitives/my-dodecahedron";


const meshArr: (Three.Mesh | Three.LineSegments)[] = []

const HelloPrimitives = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rendererRef = useRef<Three.WebGLRenderer | null>(null)
    const cameraRef = useRef<Three.PerspectiveCamera | null>(null)

    const createMaterial = () => {
        const material = new Three.MeshPhongMaterial({side: Three.DoubleSide})
        const hue = Math.floor(Math.random() * 100) / 100 //随机获得一个色相
        const saturation = 1 //饱和度
        const luminance = 0.5 //亮度
        material.color.setHSL(hue, saturation, luminance) // 随机生成材质颜色
        return material
    }

    const createInit = useCallback(() => {
        if (canvasRef.current === null) {
            return
        }
        meshArr.length = 0 //以防万一，先清空原有数组

        // 初始化场景
        const scene = new Three.Scene()
        scene.background = new Three.Color(0xAAAAAA)

        // 初始化镜头
        const camera = new Three.PerspectiveCamera(40, 2, 0.1, 1000)
        camera.position.z = 120
        cameraRef.current = camera

        //初始化渲染器
        const renderer = new Three.WebGLRenderer({canvas: canvasRef.current})
        rendererRef.current = renderer

        // 添加2盏灯光
        const light0 = new Three.DirectionalLight()
        light0.position.set(-1, 2, 4)
        scene.add(light0)

        const light1 = new Three.DirectionalLight()
        light1.position.set(1, -2, -4)
        scene.add(light1)

        // solid类型图元数组，存放所有 solid 类型的图元
        const solidPrimitivesArr: Three.BufferGeometry[] = []
        solidPrimitivesArr.push(myBox, myCircle, myCone, myCylinder, myDodecahedron)
        solidPrimitivesArr.forEach((item) => {
            const material = createMaterial() // 获得一种颜色随机的材质
            const mesh = new Three.Mesh(item, material)
            meshArr.push(mesh) //将网格添加到网格数组中
        })

        //获得各个 line 类型的图元实例，并添加到 meshArr 中
        const linePrimitivesArr: Three.BufferGeometry[] = []
        linePrimitivesArr.push(myWireframe, myEdges)
        linePrimitivesArr.forEach(item => {
            const material = new Three.LineBasicMaterial({color: 0x000000})
            const mesh = new Three.LineSegments(item, material)
            meshArr.push(mesh)
        })

        //定义物体在画面中显示的网格布局
        const eachRow = 5 //每一行显示 5 个
        const spread = 15 //行高 和 列宽

        //配置每一个图元实例，转化为网格，并位置和材质后，将其添加到场景中
        meshArr.forEach((mesh, index) => {
            //我们设定的排列是每行显示 eachRow，即 5 个物体、行高 和 列宽 均为 spread 即 15
            //因此每个物体根据顺序，计算出自己所在的位置
            const row = Math.floor(index / eachRow) //计算出所在行
            const column = index % eachRow //计算出所在列

            mesh.position.x = (column - 2) * spread // Q: 为什么要 -2 ？
            //A: 因为我们希望将每一行物体摆放的单元格，依次是：-2、-1、0、1、2，这样可以使每一整行物体处于居中显示
            mesh.position.y = (2 - row) * spread

            scene.add(mesh) //将网格添加到场景中
        })

        //添加自动旋转渲染动画
        const render = (time: number) => {
            time = time * 0.001
            meshArr.forEach(item => {
                item.rotation.x = time
                item.rotation.y = time
            })
            renderer.render(scene, camera)
            window.requestAnimationFrame(render)
        }
        window.requestAnimationFrame(render)

    }, [canvasRef])

    const resizeHandle = () => {
        //根据窗口大小变化，重新修改渲染器的视椎
        if (rendererRef.current === null || cameraRef.current === null) {
            return
        }
        const canvas = rendererRef.current.domElement
        cameraRef.current.aspect = canvas.clientWidth / canvas.clientHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(canvas.clientWidth, canvas.clientHeight, false)
    }

    useEffect(() => {
        // 初始化3D场景
        createInit()
        // 处理页面尺寸变化
        resizeHandle()

        window.addEventListener('resize', resizeHandle)
        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [canvasRef, createInit])

    return (
        <canvas ref={canvasRef} className='full-screen'/>
    )
}

export default HelloPrimitives