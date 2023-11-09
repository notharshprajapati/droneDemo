import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useRef, useState } from "react";
import { useConfigurator } from "./contexts/Configurator";

function App() {
  const { follow, setFollow } = useConfigurator();

  const cameraRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);

  const changeCameraPosition = () => {
    console.log(cameraPosition);
    setCameraPosition([10, 0, 0]);
  };
  return (
    <>
      <Canvas
        camera={{
          position: cameraPosition,
          rotation: [0, 0, 0],
          fov: 50,
          ref: cameraRef,
        }}
      >
        <Experience />
      </Canvas>
      <div className="buttonDiv">
        <button className="buttons" onClick={changeCameraPosition}>
          frontCam
        </button>
        <button className="buttons" onClick={changeCameraPosition}>
          tailCam
        </button>
        <button
          style={
            (follow && { color: "red" }) || (!follow && { color: "green" })
          }
          className="buttons"
          onClick={(e) => setFollow(!follow)}
        >
          followCursor
        </button>
      </div>
    </>
  );
}

export default App;
