import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
const HELIX_SPEED = 60;

export function Ldrone(props) {
  const { nodes, materials } = useGLTF("./models/ldrone.gltf");

  const helix = useRef();

  useFrame((_state, delta) => {
    helix.current.rotation.y += delta * HELIX_SPEED;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.body.geometry}
        material={materials.body}
        position={[0, 1.463, 0]}
      >
        <mesh
          geometry={nodes.hands.geometry}
          material={materials.hands}
          position={[0, -0.042, -0.015]}
        />
        <group position={[0.372, -0.005, 0.255]} rotation={[0, 1, 0]}>
          <mesh
            ref={helix}
            geometry={nodes.Cylinder027.geometry}
            material={materials.wing}
          />
          <mesh
            geometry={nodes.Cylinder027_1.geometry}
            material={materials.wingWhite}
          />
        </group>
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/ldrone.gltf");
