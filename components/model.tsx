import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import * as TWEEN from "@tweenjs/tween.js";

type GLTFResult = GLTF & {
  nodes: {
    head: THREE.Mesh;
    glassR: THREE.Mesh;
    nose: THREE.Mesh;
    glassFrame: THREE.Mesh;
    Cube279: THREE.Mesh;
    Cube279_1: THREE.Mesh;
    lipTop: THREE.Mesh;
    lipBottom: THREE.Mesh;
    glassL: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube003_1: THREE.Mesh;
  };
  materials: {
    ["Take Skin.001"]: THREE.MeshStandardMaterial;
    ["Take Glass Frame"]: THREE.MeshStandardMaterial;
    ["Glass Bridge.001"]: THREE.MeshStandardMaterial;
    ["Take Brim"]: THREE.MeshStandardMaterial;
    ["Take Cap"]: THREE.MeshStandardMaterial;
    ["Take Lips.001"]: THREE.MeshStandardMaterial;
    ["Take Lips.002"]: THREE.MeshStandardMaterial;
    YellowCap: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/assets/models/takenori.glb"
  ) as unknown as GLTFResult;

  const takenoriRef = useRef(null);
  const headRef = useRef(null);
  const capRef = useRef(null);
  const brimRef = useRef(null);
  const glassLRef = useRef(null);
  const glassRRef = useRef(null);
  const noseRef = useRef(null);
  const lipTopRef = useRef(null);
  const lipBottomRef = useRef(null);

  const durationBase = 500;
  const easing = TWEEN.Easing.Quintic.Out;
  const vectorZero = new THREE.Vector3();

  let takenori: THREE.Group;
  let head: THREE.Mesh;
  let cap: THREE.Mesh;
  let brim: THREE.Mesh;
  let glassL: THREE.Mesh;
  let glassR: THREE.Mesh;
  let nose: THREE.Mesh;
  let lipTop: THREE.Mesh;
  let lipBottom: THREE.Mesh;

  useEffect(() => {
    takenori = takenoriRef.current;
    head = headRef.current;
    cap = capRef.current;
    glassL = glassLRef.current;
    glassR = glassRRef.current;
    nose = noseRef.current;
    lipTop = lipTopRef.current;
    lipBottom = lipBottomRef.current;
    brim = brimRef.current;

    takenori.traverse((child: any) => {
      const offsetMeshes = ["glassL", "glassR", "lipTop", "lipBottom"];
      if (offsetMeshes.includes(child.name)) {
        child.userData.initialPosition = child.position.clone();
        console.log(child.name);
      }
      if (child.material) {
        child.userData.initialMaterial = child.material;
      }
    });

    setInterval(animateRandomly, 2000);
  }, []);

  useFrame(() => {
    TWEEN.update();
  });

  function rotate() {
    new TWEEN.Tween(takenori.rotation)
      .to(randomVector3(3, 6), durationBase)
      .easing(easing)
      .start();
  }

  function extendGlasses() {
    if (!glassL.userData.extended) {
      new TWEEN.Tween(glassL.scale)
        .to({ z: 8 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(glassR.scale)
        .to({ z: 10 }, durationBase)
        .easing(easing)
        .start();
      glassL.userData.extended = true;
    } else {
      new TWEEN.Tween(glassL.scale)
        .to({ z: 1 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(glassR.scale)
        .to({ z: 1 }, durationBase)
        .easing(easing)
        .start();
      glassL.userData.extended = false;
    }
  }

  function changeMaterial() {
    if (!takenori.userData.materialChanged) {
      const mode = Math.floor(Math.random() * 2);
      takenori.traverse((child: any) => {
        if (child.material) {
          if (mode) {
            child.material.wireframe = true;
          } else {
            child.material = new THREE.MeshNormalMaterial();
          }
        }
      });
      takenori.userData.materialChanged = true;
    } else {
      takenori.traverse((child: any) => {
        if (child.material) {
          child.material.wireframe = false;
          child.material = child.userData.initialMaterial;
        }
      });
      takenori.userData.materialChanged = false;
    }
  }

  function dissolve() {
    if (!takenori.userData.dissolved) {
      let target;
      target = glassL;
      new TWEEN.Tween(target.position)
        .to({ x: 0.5, y: 0.2, z: -0.5 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.rotation)
        .to({ x: 1 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.scale)
        .to({ x: 3, y: 3, z: 0.3 }, durationBase)
        .easing(easing)
        .start();

      target = glassR;
      new TWEEN.Tween(target.position)
        .to({ x: -0.2, z: 0.3 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.rotation)
        .to({ y: -1, z: -0.5 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.scale)
        .to({ x: 4, y: 4, z: 0.3 }, durationBase)
        .easing(easing)
        .start();

      target = cap;
      new TWEEN.Tween(target.position)
        .to({ x: 1, y: 0.3 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.rotation)
        .to({ y: 0.5, z: 0.5 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.scale)
        .to({ x: 1.5, y: 1.5, z: 1.5 }, durationBase)
        .easing(easing)
        .start();

      target = head;
      new TWEEN.Tween(target.rotation)
        .to({ x: 0.5, z: 2 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.scale)
        .to({ x: 1, y: 1, z: 0.03 }, durationBase)
        .easing(easing)
        .start();

      target = nose;
      new TWEEN.Tween(target.position)
        .to({ z: -1 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.rotation)
        .to({ z: 5 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.scale)
        .to({ x: 2, y: 2, z: 2 }, durationBase)
        .easing(easing)
        .start();

      target = lipTop;
      new TWEEN.Tween(target.position)
        .to({ y: -0.5 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.scale)
        .to({ x: 3, y: 3, z: 3 }, durationBase)
        .easing(easing)
        .start();

      target = lipBottom;
      new TWEEN.Tween(target.position)
        .to({ x: 1, y: 0.25 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.rotation)
        .to({ z: 1 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(target.scale)
        .to({ x: 2, y: 2, z: 2 }, durationBase)
        .easing(easing)
        .start();

      takenori.userData.dissolved = true;
    } else {
      const meshesToReset = [
        glassL,
        glassR,
        lipTop,
        lipBottom,
        cap,
        brim,
        head,
        nose,
      ];

      meshesToReset.forEach((target) => {
        let positionTo;
        if (target.userData.initialPosition) {
          positionTo = target.userData.initialPosition;
        } else {
          positionTo = vectorZero;
        }
        new TWEEN.Tween(target.position).to(positionTo, durationBase).start();
        new TWEEN.Tween(target.rotation).to(vectorZero, durationBase).start();
        new TWEEN.Tween(target.scale)
          .to({ x: 1, y: 1, z: 1 }, durationBase)
          .start();
      });

      takenori.userData.dissolved = false;
    }
  }

  function randomScale() {
    const minScale = 4;
    const maxScale = 13;
    const scale = Math.random() * (maxScale - minScale) + minScale;
    new TWEEN.Tween(takenori.scale)
      .to({ x: scale, y: scale, z: scale })
      .easing(easing)
      .start();
  }

  function flipLips() {
    if (!lipTop.userData.rotated) {
      new TWEEN.Tween(lipTop.rotation)
        .to({ y: Math.PI * 2 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(lipBottom.rotation)
        .to({ y: -Math.PI * 2 }, durationBase)
        .easing(easing)
        .start();
      lipTop.userData.rotated = true;
    } else {
      new TWEEN.Tween(lipTop.rotation)
        .to({ y: 0 }, durationBase)
        .easing(easing)
        .start();
      new TWEEN.Tween(lipBottom.rotation)
        .to({ y: 0 }, durationBase)
        .easing(easing)
        .start();
      lipTop.userData.rotated = false;
    }
  }

  function animateRandomly() {
    const random = Math.floor(Math.random() * 5);
    switch (random) {
      case 0:
        changeMaterial();
        flipLips();
      case 1:
        rotate();
        extendGlasses();
      case 2:
        randomScale();
      case 3:
        dissolve();
      case 4:
        rotate();
        extendGlasses();
    }
  }

  function randomVector3(min: number, max: number): THREE.Vector3 {
    const ra = Math.random() * (max - min) + min;
    const rb = Math.random() * (max - min) + min;
    const rc = Math.random() * (max - min) + min;
    return new THREE.Vector3(ra, rb, rc);
  }

  return (
    <group {...props} dispose={null} ref={takenoriRef}>
      <mesh
        name="head"
        castShadow
        receiveShadow
        geometry={nodes.head.geometry}
        material={materials["Take Skin.001"]}
        ref={headRef}
      />
      <mesh
        name="glassR"
        castShadow
        receiveShadow
        geometry={nodes.glassR.geometry}
        material={materials["Take Glass Frame"]}
        position={[-0.07, 0.05, 0.19]}
        ref={glassRRef}
      />
      <mesh
        name="nose"
        castShadow
        receiveShadow
        geometry={nodes.nose.geometry}
        material={materials["Take Skin.001"]}
        ref={noseRef}
      />
      <mesh
        name="glassFrame"
        castShadow
        receiveShadow
        geometry={nodes.glassFrame.geometry}
        material={materials["Glass Bridge.001"]}
      />
      <mesh
        name="Cube279"
        castShadow
        receiveShadow
        geometry={nodes.Cube279.geometry}
        material={materials["Take Brim"]}
        ref={brimRef}
      />
      <mesh
        name="cap"
        castShadow
        receiveShadow
        geometry={nodes.Cube279_1.geometry}
        material={materials["Take Cap"]}
        ref={capRef}
      />
      <mesh
        name="lipTop"
        castShadow
        receiveShadow
        geometry={nodes.lipTop.geometry}
        material={materials["Take Lips.001"]}
        position={[0, -0.08, 0.18]}
        ref={lipTopRef}
      />
      <mesh
        name="lipBottom"
        castShadow
        receiveShadow
        geometry={nodes.lipBottom.geometry}
        material={materials["Take Lips.002"]}
        position={[0, -0.12, 0.18]}
        ref={lipBottomRef}
      />
      <mesh
        name="glassL"
        castShadow
        receiveShadow
        geometry={nodes.glassL.geometry}
        material={materials["Take Glass Frame"]}
        position={[0.07, 0.05, 0.19]}
        ref={glassLRef}
      />
      <mesh
        name="yellowCap"
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.YellowCap}
        visible={false}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/takenori.glb");
