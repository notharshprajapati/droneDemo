import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useConfigurator } from "../contexts/Configurator";
const HELIX_SPEED = 25;

export function Drone(props) {
  const { nodes, materials } = useGLTF("./models/drone.gltf");

  //cam ref variables
  const tpsCamZRotate = useRef();
  const tpsCam = useRef();
  const zRotate = useRef();
  const Camera = useRef();

  //wings ref variables
  const wing1 = useRef();
  const wing2 = useRef();
  const wing3 = useRef();
  const wing4 = useRef();

  //droneFlight ref variables
  const curFollow = useRef();
  const { follow } = useConfigurator();
  const [lastMouseX, setlastMouseX] = useState(0);

  useFrame((state, delta) => {
    //cam tps
    const camTpsPos = state.camera.position;
    // Apply the rotation to the tpsCamZRotate
    tpsCamZRotate.current.rotation.y = Math.atan2(
      camTpsPos.x - tpsCamZRotate.current.position.x,
      camTpsPos.z - tpsCamZRotate.current.position.z
    );
    // Apply the rotation to the tpsCam
    tpsCam.current.rotation.x = Math.atan2(
      -(camTpsPos.y - tpsCam.current.position.y),
      Math.abs(camTpsPos.z - tpsCam.current.position.z)
    );

    // cam tail
    const camTailPos = state.camera.position;
    // Apply the rotation to the zRotate
    zRotate.current.rotation.y = Math.atan2(
      camTailPos.x - zRotate.current.position.x,
      camTailPos.z - zRotate.current.position.z
    );
    // Apply the rotation to the Camera
    Camera.current.rotation.x = Math.atan2(
      -(camTailPos.y - Camera.current.position.y),
      Math.abs(camTailPos.z - Camera.current.position.z)
    );

    //wings
    wing1.current.rotation.y += delta * HELIX_SPEED;
    wing2.current.rotation.y += delta * HELIX_SPEED;
    wing3.current.rotation.y += delta * HELIX_SPEED;
    wing4.current.rotation.y += delta * HELIX_SPEED;

    // ---------- droneControl
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 0]);
    // follow toggle
    if (!follow) {
      easing.damp3(
        curFollow.current.position, // drone position
        [
          (state.pointer.x * viewport.width) / 2,
          1.5 + (state.pointer.y * viewport.height) / 2,
          0,
        ],
        0.15,
        delta
      );
      easing.damp3(
        curFollow.current.rotation, // drone rotation
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
        geometry={nodes.body.geometry}
        material={materials.body}
        position={(follow && [0, 0, 0]) || (!follow && [0, 1.463, 0])}
        ref={curFollow}
      >
        <mesh
          geometry={nodes.battery.geometry}
          material={materials.battery}
          position={[0, -0.014, -0.158]}
        />
        <mesh
          geometry={nodes.frontCam.geometry}
          material={materials.hands}
          position={[0, -0.042, -0.015]}
        >
          <mesh
            ref={zRotate}
            geometry={nodes.zRotate.geometry}
            material={materials.hands}
            position={[0, -0.001, 0.248]}
          >
            <mesh
              geometry={nodes.yRotate.geometry}
              material={materials.hands}
              position={[0, -0.026, -0.024]}
            >
              <mesh
                ref={Camera}
                geometry={nodes.Camera.geometry}
                material={materials.hands}
                position={[0, 0, 0.029]}
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
                  material={materials.hands}
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
        </mesh>
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
        <mesh
          geometry={nodes.tailCam.geometry}
          material={materials.hands}
          position={[0, -0.042, -0.015]}
        >
          <mesh
            ref={tpsCamZRotate}
            geometry={nodes.tpsCamZRotate.geometry}
            material={materials.hands}
            position={[0, 0.071, -0.21]}
          >
            <mesh
              geometry={nodes.tpsCamYRotate.geometry}
              material={materials.hands}
              position={[0, 0.026, -0.027]}
            >
              <mesh
                ref={tpsCam}
                geometry={nodes.tpsCam.geometry}
                material={materials.hands}
                position={[0, 0, 0.029]}
              >
                <group position={[-0.014, 0, 0.021]}>
                  <mesh
                    geometry={nodes.Sphere001.geometry}
                    material={materials["Camera Lens Black"]}
                  />
                  <mesh
                    geometry={nodes.Sphere001_1.geometry}
                    material={materials["Camera lens glass"]}
                  />
                  <mesh
                    geometry={nodes.Sphere001_2.geometry}
                    material={materials["Black Camera"]}
                  />
                </group>
                <mesh
                  geometry={nodes.tpsCamLensBoundry.geometry}
                  material={materials.hands}
                  position={[-0.014, 0, 0.021]}
                />
                <mesh
                  geometry={nodes.tpsCamLensCover.geometry}
                  material={materials.Glass}
                  position={[-0.014, 0, 0.026]}
                />
              </mesh>
            </mesh>
          </mesh>
        </mesh>
        <group
          ref={wing1}
          rotation={[0, (1 * Math.PI) / 4, 0]}
          position={[-0.372, -0.005, 0.255]}
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
          rotation={[0, (2 * Math.PI) / 4, 0]}
          position={[0.372, -0.005, -0.285]}
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
          rotation={[0, (3 * Math.PI) / 4, 0]}
          position={[-0.372, -0.005, -0.285]}
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
          rotation={[0, (4 * Math.PI) / 4, 0]}
          position={[0.372, -0.005, 0.255]}
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
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/drone.gltf");
