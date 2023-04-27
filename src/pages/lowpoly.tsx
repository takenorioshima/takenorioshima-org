import Container from "../components/container";
import Layout from "../components/layouts/posts";
import { NextSeo } from "next-seo";
import { SITE_NAME } from "../lib/constants";
import PageHeader from "../components/page-header";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { GLTF } from "three-stdlib";

type Props = {
  filename: string;
  scale: number;
};

type GLTFResult = GLTF & {
  nodes: object;
  materials: object;
};

function Model({ filename, scale }: Props) {
  const gltf = useGLTF(`/assets/models/${filename}`) as unknown as GLTFResult;

  return (
    <>
      <primitive object={gltf.scene} scale={scale} />
    </>
  );
}

export default function LowPoly() {
  const title = `Low Poly - ${SITE_NAME}`;

  const items = [
    { id: 1, filename: "takenori.glb", scale: 1 },
    { id: 2, filename: "birdy.glb", scale: 1 },
    { id: 3, filename: "iceCream.glb", scale: 1 },
    { id: 4, filename: "bender.glb", scale: 1 },
  ];

  const listItems = items.map((item) => (
    <div className="col-span-3 rounded-lg overflow-hidden bg-white drop-shadow hover:shadow-xl transition-shadow duration-200 aspect-square">
      <div className="text-sm p-2 absolute top-0 left-0 bg-slate-300 rounded-br">{item.filename}</div>
      <Suspense fallback={null}>
        <Canvas orthographic={true} shadows>
          <color attach="background" args={["#ffcccc"]} />
          <OrbitControls autoRotate={true} enableZoom={true} />
          <Stage adjustCamera={1.2} intensity={0.5} preset="soft" shadows="contact" environment="city">
            <Model filename={item.filename} scale={item.scale} />
          </Stage>
        </Canvas>
      </Suspense>
    </div>
  ));

  return (
    <>
      <Layout>
        <NextSeo title={title} />
        <PageHeader
          title="Low Poly"
          description="趣味のローポリモデリング"
          icon="bi-pentagon-half"
          className="bg-gray-600"
        />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-10">{listItems}</div>
        </Container>
      </Layout>
    </>
  );
}
