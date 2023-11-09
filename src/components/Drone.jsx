import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useConfigurator } from "../contexts/Configurator";
const HELIX_SPEED = 25;

export function Drone(props) {
  const { nodes, materials } = useGLTF("./models/drone.gltf");

  const wing1 = useRef(); //wings
  const wing2 = useRef();
  const wing3 = useRef();
  const wing4 = useRef();
  const camFollow = useRef(); //droneFlight
  const { follow } = useConfigurator();

  const [lastMouseX, setlastMouseX] = useState(0);
  
  useFrame((state, delta) => {
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 0]);

    //wings
    wing1.current.rotation.y += delta * HELIX_SPEED;
    wing2.current.rotation.y += delta * HELIX_SPEED;
    wing3.current.rotation.y += delta * HELIX_SPEED;
    wing4.current.rotation.y += delta * HELIX_SPEED;

    // ---------- droneControl
    // follow toggle
    if (!follow) {
      easing.damp3(
        camFollow.current.position, // drone position
        [
          (state.pointer.x * viewport.width) / 2,
          1.5 + (state.pointer.y * viewport.height) / 2,
          0,
        ],
        0.15,
        delta
      );
      easing.damp3(
        camFollow.current.rotation, // drone rotation
        [0, 0, -(state.pointer.x - lastMouseX) * viewport.width * 5],
        0.15,
        delta
      );
    }
    setlastMouseX(state.pointer.x);
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.body.geometry}
        material={materials.body}
        position={(follow && [0, 0, 0]) || (!follow && [0, 1.463, 0])}
        ref={camFollow}
        {...props}
      >
        <mesh
          geometry={nodes.battery.geometry}
          material={materials.battery}
          position={[0, -0.014, -0.158]}
        />
        <mesh
          geometry={nodes.hands.geometry}
          material={materials.hands}
          position={[0, -0.042, -0.015]}
        />
        <mesh
          geometry={nodes.Motor.geometry}
          material={materials.Motor}
          position={[0, -0.021, -0.015]}
        />

        <group
          ref={wing1}
          position={[-0.372, -0.005, 0.255]}
          rotation={[0, (1 * Math.PI) / 4, 0]}
        >
          <mesh
            geometry={nodes.Cylinder003.geometry}
            material={materials.wing}
          />
          <mesh
            geometry={nodes.Cylinder003_1.geometry}
            material={materials.wingWhite}
          />
        </group>
        <group
          ref={wing2}
          position={[0.372, -0.005, -0.285]}
          rotation={[0, (2 * Math.PI) / 4, 0]}
        >
          <mesh
            geometry={nodes.Cylinder010.geometry}
            material={materials.wing}
          />
          <mesh
            geometry={nodes.Cylinder010_1.geometry}
            material={materials.wingWhite}
          />
        </group>
        <group
          ref={wing3}
          position={[-0.372, -0.005, -0.285]}
          rotation={[0, (3 * Math.PI) / 4, 0]}
        >
          <mesh
            geometry={nodes.Cylinder012.geometry}
            material={materials.wing}
          />
          <mesh
            geometry={nodes.Cylinder012_1.geometry}
            material={materials.wingWhite}
          />
        </group>
        <group
          ref={wing4}
          position={[0.372, -0.005, 0.255]}
          rotation={[0, (4 * Math.PI) / 4, 0]}
        >
          <mesh
            geometry={nodes.Cylinder027.geometry}
            material={materials.wing}
          />
          <mesh
            geometry={nodes.Cylinder027_1.geometry}
            material={materials.wingWhite}
          />
        </group>
        <mesh
          geometry={nodes.wingProtector.geometry}
          material={materials.wingWhite}
          position={[0, -0.016, -0.015]}
        />
        <mesh
          geometry={nodes.zRotate.geometry}
          material={materials.hands}
          position={[0, -0.06, 0.227]}
        >
          <mesh
            geometry={nodes.yRotate.geometry}
            material={materials.hands}
            position={[0, -0.005, 0.003]}
          >
            <mesh
              geometry={nodes.Camera.geometry}
              material={materials.Camera}
              position={[0, 0, 0.007]}
            >
              <group position={[0.014, 0, 0.021]}>
                <mesh
                  geometry={nodes.Sphere.geometry}
                  material={materials["Camera Lens Black"]}
                />
                <mesh
                  geometry={nodes.Sphere_1.geometry}
                  material={materials["Camera lens glass"]}
                />
                <mesh
                  geometry={nodes.Sphere_2.geometry}
                  material={materials["Black Camera"]}
                />
              </group>
              <mesh
                geometry={nodes.lensBoundry.geometry}
                material={materials["Camera.001"]}
                position={[0.014, 0, 0.021]}
              />
              <mesh
                geometry={nodes.lensCover.geometry}
                material={materials.Glass}
                position={[0.014, 0, 0.026]}
              />
            </mesh>
          </mesh>
        </mesh>
        <mesh
          geometry={nodes.tpsCamZRotate.geometry}
          material={materials["Metal Parts.001"]}
          position={[0, 0.05, -0.233]}
        >
          <mesh
            geometry={nodes.tpsCamYRotate.geometry}
            material={materials["Metal Parts.001"]}
            position={[0, 0.005, 0.003]}
          >
            <mesh
              geometry={nodes.tpsCam.geometry}
              material={materials.Camera}
              position={[0, 0, 0.007]}
            >
              <group position={[-0.014, 0, 0.021]}>
                <mesh
                  geometry={nodes.Sphere001.geometry}
                  material={materials["Camera Lens Black.001"]}
                />
                <mesh
                  geometry={nodes.Sphere001_1.geometry}
                  material={materials["Camera lens glass.001"]}
                />
                <mesh
                  geometry={nodes.Sphere001_2.geometry}
                  material={materials["Black Camera.001"]}
                />
              </group>
              <mesh
                geometry={nodes.tpsCamLensBoundry.geometry}
                material={materials.Camera}
                position={[-0.014, 0, 0.021]}
              />
              <mesh
                geometry={nodes.tpsCamLensCover.geometry}
                material={materials["Glass.001"]}
                position={[-0.014, 0, 0.026]}
              />
            </mesh>
          </mesh>
        </mesh>
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/drone.gltf");
