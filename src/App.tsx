import './App.css';
import HelloPrimitives from '@/components/hello-primitives';
import HelloThreejs from '@/components/hello-threejs';
import HelloScene from '@/components/hello-scene';
import HelloOBJLoader from '@/components/hello-obj-loader';
import HelloGLTFLoader from '@/components/hello-gltf-loader';

function App() {
  return (
    <>
      <HelloGLTFLoader/>
      <HelloOBJLoader/>
      <HelloScene/>
      <HelloPrimitives/>
      <HelloThreejs/>
    </>
  );
}

export default App;
