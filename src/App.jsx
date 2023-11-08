import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0.25, 0.25, 1], fov: 50 }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
