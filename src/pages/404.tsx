import Layout from "../components/layouts/default";
import Head from "next/head";
import { SITE_NAME } from "../lib/constants";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "../components/hero-model";
import React, { Suspense } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function PageNotFound() {
  const title = `404 - ${SITE_NAME}`;

  return (
    <>
      <Layout>
        <NextSeo title={title} />
        <div id="hero-unit" className="hero-unit">
          <div className="relative flex items-center justify-center w-full h-full z-10">
            <div className="text-center parsed-content">
              <h1 className="text-9xl leading-none">404</h1>
              <p className="text-2xl mb-10">Page not found.</p>
              <Link href="/" className="relative z-10 text-lg lg:text-xl lg:mx-2 text-center">
                <i className="bi bi-house mr-1"></i>
                Back to home.
              </Link>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            <Canvas orthographic={true} camera={{ zoom: 100, position: [10, 5, 0] }}>
              <OrbitControls autoRotate={true} enableZoom={false} />
              <ambientLight intensity={0.1} />
              <directionalLight color="white" position={[0, 0, 5]} />
              <Suspense fallback={null}>
                <Model scale={13} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </Layout>
    </>
  );
}
