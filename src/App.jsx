import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useEffect, useRef, useState } from "react";
import { useConfigurator } from "./contexts/Configurator";
import { colors } from "@mui/material";

function App() {
  const { follow, setFollow } = useConfigurator();

  const cameraRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);

  const changeCameraPosition = () => {
    setCameraPosition([0, 0, 10]);
  };
  return (
    <>
      <Canvas
        camera={{
          position: cameraPosition,
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
          followCam
        </button>
      </div>
    </>
  );
}

export default App;
