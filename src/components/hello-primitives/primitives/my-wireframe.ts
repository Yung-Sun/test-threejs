import {BoxGeometry, WireframeGeometry} from "three";

const width = 8;
const height = 8;
const depth = 8

export const myWireframe = new WireframeGeometry(new BoxGeometry(width, height, depth))