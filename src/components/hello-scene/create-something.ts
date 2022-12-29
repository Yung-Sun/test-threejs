//创建一个球体
import {DirectionalLight, Mesh, MeshPhongMaterial, Object3D, PointLight, SphereGeometry, TorusGeometry} from "three";

const sphere = new SphereGeometry(1, 6, 6) //球体为6边形，目的是为了方便我们观察到他在自转

//创建太阳
const sunMaterial = new MeshPhongMaterial({emissive: 0xf76b1e})
const sunMesh = new Mesh(sphere, sunMaterial)
sunMesh.scale.set(4, 4, 4) //将球体尺寸放大 4 倍

//创建地球
const earthMaterial = new MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244})
const earthMesh = new Mesh(sphere, earthMaterial)

// 创建土星
const saturnMaterial = new MeshPhongMaterial({color: 0xd09b54, emissive: 0x52496e})
const saturnMesh = new Mesh(sphere, saturnMaterial)
const saturnRingMaterial = new MeshPhongMaterial({color: 0xd09b54})
const saturnRingTorus = new TorusGeometry(1.5, 0.2)
const saturnRingMesh = new Mesh(saturnRingTorus, saturnRingMaterial)
saturnRingTorus.rotateX(45)
saturnRingTorus.rotateY(45)


//创建月球
const moonMaterial = new MeshPhongMaterial({color: 0x888888, emissive: 0x222222})
const moonMesh = new Mesh(sphere, moonMaterial)
moonMesh.scale.set(0.5, 0.5, 0.5) //将球体尺寸缩小 0.5 倍

//创建一个 3D 空间，用来容纳月球，相当于月球轨迹空间
export const moonOrbit = new Object3D()
moonOrbit.position.x = 2
moonOrbit.add(moonMesh)

//创建一个 3D 空间，用来容纳地球，相当于地球轨迹空间
export const earthOrbit = new Object3D()
earthOrbit.position.x = 10
earthOrbit.add(earthMesh)
earthOrbit.add(moonOrbit)


export const saturnRingOrbit = new Object3D()
saturnRingOrbit.add(saturnRingMesh)

export const saturnOrbit = new Object3D()
saturnOrbit.position.set(0, 0, 13)
saturnOrbit.add(saturnMesh)
saturnOrbit.add(saturnRingOrbit)

//创建一个 3D 空间，用来容纳太阳和地球(含月球)
export const solarSystem = new Object3D()
solarSystem.add(sunMesh)
solarSystem.add(saturnOrbit)
solarSystem.add(earthOrbit)

//创建点光源
export const pointLight = new PointLight(0xeeeeee, 2)
export const directionalLight = new DirectionalLight(0xFFFFFF, 0.4)
