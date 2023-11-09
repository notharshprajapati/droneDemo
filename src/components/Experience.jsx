import { OrbitControls, Stage } from "@react-three/drei";
import { Drone } from "./Drone";
import { useConfigurator } from "../contexts/Configurator";
export const Experience = () => {
  const { follow } = useConfigurator();

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
        enableRotate={follow}
        enablePan={follow}
        enableZoom={follow}
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};
