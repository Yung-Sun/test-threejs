import {LatheGeometry, Vector2} from "three";

const points = []
for (let i = 0; i < 10; i++) {
    let x = Math.sin(i * 0.7) + 3
    let y = 1.2 * i - 5
    points.push(new Vector2(x, y))
}

const segments = 20

// 车削缓冲几何体(绘制一条线，绕Y轴旋转生成几何体)
export const myLathe = new LatheGeometry(points, segments)