import './App.css';
import HelloPrimitives from "@/components/hello-primitives";
import HelloThreejs from "@/components/hello-threejs";
import HelloScene from "@/components/hello-scene";

function App() {
    return (
        <>
            <HelloScene/>
            <HelloPrimitives/>
            <HelloThreejs/>
        </>
    );
}

export default App;
