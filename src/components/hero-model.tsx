import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import * as TWEEN from "@tweenjs/tween.js";

type GLTFResult = GLTF & {
  nodes: {
    head: THREE.Mesh;
    nose: THREE.Mesh;
    glassL: THREE.Mesh;
    glassR: THREE.Mesh;
    glassFrame: THREE.Mesh;
    lipTop: THREE.Mesh;
    lipBottom: THREE.Mesh;
    cap: THREE.Mesh;
    brim: THREE.Mesh;
    yellowCap: THREE.Mesh;
    yellowCapT: THREE.Mesh;
  };
  materials: {
    skin: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    glassFrame: THREE.MeshStandardMaterial;
    cap: THREE.MeshStandardMaterial;
    lip: THREE.MeshStandardMaterial;
    yellowCap: THREE.MeshStandardMaterial;
    white: THREE.MeshStandardMaterial;
    brim: THREE.MeshStandardMaterial;
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
  const yellowCapRef = useRef(null);
  const yellowCapTRef = useRef(null);
  const glassLRef = useRef(null);
  const glassRRef = useRef(null);
  const noseRef = useRef(null);
  const lipTopRef = useRef(null);
  const lipBottomRef = useRef(null);

  const durationBase = 2000;
  const easing = TWEEN.Easing.Exponential.Out;
  const vectorZero = new THREE.Vector3();

  let takenori: THREE.Group;
  let head: THREE.Mesh;
  let cap: THREE.Mesh;
  let brim: THREE.Mesh;
  let yellowCap: THREE.Mesh;
  let yellowCapT: THREE.Mesh;
  let glassL: THREE.Mesh;
  let glassR: THREE.Mesh;
  let nose: THREE.Mesh;
  let lipTop: THREE.Mesh;
  let lipBottom: THREE.Mesh;

  useEffect(() => {
    takenori = takenoriRef.current!;
    head = headRef.current!;
    cap = capRef.current!;
    glassL = glassLRef.current!;
    glassR = glassRRef.current!;
    nose = noseRef.current!;
    lipTop = lipTopRef.current!;
    lipBottom = lipBottomRef.current!;
    brim = brimRef.current!;
    yellowCap = yellowCapRef.current!;
    yellowCapT = yellowCapTRef.current!;

    takenori.traverse((child: any) => {
      const offsetMeshes = ["glassL", "glassR", "lipTop", "lipBottom"];
      if (offsetMeshes.includes(child.name)) {
        child.userData.initialPosition = child.position.clone();
      }
      if (child.material) {
        child.userData.initialMaterial = child.material;
      }
    });

    takenori.userData.initialScale = takenori.scale.clone();

    setInterval(animateRandomly, 2000);
  }, [props]);

  useFrame(() => {
    TWEEN.update();
  });

  function rotate() {
    tween(takenori.rotation, randomVector3(3, 6));
  }

  function extendGlasses() {
    if (!glassL.userData.extended) {
      tween(glassL.scale, { z: 8 });
      tween(glassR.scale, { z: 10 });
      glassL.userData.extended = true;
    } else {
      tween(glassL.scale, { z: 1 });
      tween(glassR.scale, { z: 1 });
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
      tween(target.position, { x: 0.5, y: 0.2, z: -0.5 });
      tween(target.rotation, { x: 1 });
      tween(target.scale, { x: 3, y: 3, z: 0.3 });

      target = glassR;
      tween(target.position, { x: -0.2, z: 0.3 });
      tween(target.rotation, { y: -1, z: -0.5 });
      tween(target.scale, { x: 4, y: 4, z: 0.3 });

      target = cap;
      tween(target.position, { x: 1, y: 0.3 });
      tween(target.rotation, { y: 0.5, z: 0.5 });
      tween(target.scale, { x: 1.5, y: 1.5, z: 1.5 });

      target = head;
      tween(target.rotation, { x: 0.5, z: 2 });
      tween(target.scale, { x: 1, y: 1, z: 0.03 });

      target = nose;
      tween(target.position, { z: -1 });
      tween(target.rotation, { z: 5 });
      tween(target.scale, { x: 2, y: 2, z: 2 });

      target = lipTop;
      tween(target.position, { y: -0.5 });
      tween(target.scale, { x: 3, y: 3, z: 3 });

      target = lipBottom;
      tween(target.position, { x: 1, y: 0.25 });
      tween(target.rotation, { z: 1 });
      tween(target.scale, { x: 2, y: 2, z: 2 });

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
        tween(target.position, positionTo);
        tween(target.rotation, vectorZero);
        tween(target.scale, { x: 1, y: 1, z: 1 });
      });

      takenori.userData.dissolved = false;
    }
  }

  function randomScale() {
    const minScale = takenori.userData.initialScale.x - 3;
    const maxScale = takenori.userData.initialScale.x + 3;
    const scale = Math.random() * (maxScale - minScale) + minScale;
    tween(takenori.scale, { x: scale, y: scale, z: scale });
  }

  function flipLips() {
    if (!lipTop.userData.rotated) {
      tween(lipTop.rotation, { y: Math.PI * 2 });
      tween(lipBottom.rotation, { y: -Math.PI * 2 });
      lipTop.userData.rotated = true;
    } else {
      tween(lipTop.rotation, { y: 0 });
      tween(lipBottom.rotation, { y: 0 });
      lipTop.userData.rotated = false;
    }
  }

  function tween(target: THREE.Vector3 | THREE.Euler, to: object) {
    new TWEEN.Tween(target).to(to, durationBase).easing(easing).start();
  }

  function animateRandomly() {
    const random = Math.floor(Math.random() * 5);
    switch (random) {
      case 0:
        changeMaterial();
        flipLips();
        randomScale();
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
        material={materials.skin}
        ref={headRef}
      />
      <mesh
        name="glassR"
        castShadow
        receiveShadow
        geometry={nodes.glassR.geometry}
        material={materials.glass}
        position={[-0.07, 0.05, -0.2]}
        ref={glassRRef}
      />
      <mesh
        name="nose"
        castShadow
        receiveShadow
        geometry={nodes.nose.geometry}
        material={materials.skin}
        ref={noseRef}
      />
      <mesh
        name="glassFrame"
        castShadow
        receiveShadow
        geometry={nodes.glassFrame.geometry}
        material={materials.glass}
      />
      <mesh
        name="brim"
        castShadow
        receiveShadow
        geometry={nodes.brim.geometry}
        material={materials.brim}
        ref={brimRef}
      />
      <mesh
        name="cap"
        castShadow
        receiveShadow
        geometry={nodes.cap.geometry}
        material={materials.cap}
        ref={capRef}
      />
      <mesh
        name="lipTop"
        castShadow
        receiveShadow
        geometry={nodes.lipTop.geometry}
        material={materials.lip}
        position={[0, -0.08, -0.19]}
        ref={lipTopRef}
      />
      <mesh
        name="lipBottom"
        castShadow
        receiveShadow
        geometry={nodes.lipBottom.geometry}
        material={materials.lip}
        position={[0, -0.12, -0.19]}
        ref={lipBottomRef}
      />
      <mesh
        name="glassL"
        castShadow
        receiveShadow
        geometry={nodes.glassL.geometry}
        material={materials.glass}
        position={[0.07, 0.05, -0.2]}
        ref={glassLRef}
      />
      <mesh
        name="yellowCap"
        castShadow
        receiveShadow
        geometry={nodes.yellowCap.geometry}
        material={materials.yellowCap}
        ref={yellowCapRef}
        visible={false}
      />
      <mesh
        name="yellowCapT"
        castShadow
        receiveShadow
        geometry={nodes.yellowCapT.geometry}
        material={materials.white}
        ref={yellowCapTRef}
        visible={false}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/takenori.glb");
