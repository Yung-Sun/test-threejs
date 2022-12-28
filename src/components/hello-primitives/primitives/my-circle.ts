import {CircleGeometry} from "three";

const radius = 5
const segments = 32

// 圆形缓冲几何体
export const myCircle = new CircleGeometry(radius, segments)