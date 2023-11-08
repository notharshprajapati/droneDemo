import { OrbitControls, Stage } from "@react-three/drei";
import { Drone } from "./Drone";
import { BoxGeometry } from "three";
export const Experience = () => {
  return (
    <>
      <Stage
        intensity={1.5}
        environment="city"
        shadows={{
          type: "accumulative",
          color: "#b5afd9",
          colorBlend: 2,
          opacity: 2,
        }}
        adjustCamera={2}
      >
        <Drone />
      </Stage>
      
      <OrbitControls
        makeDefault
        // zoomToCursor={true}
        // enableZoom={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};
