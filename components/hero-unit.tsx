import React, { Suspense, useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Model from "./model";

export default function HeroUnit() {
  useEffect(() => {
    const titles = document.querySelectorAll(".flip-titles > div");
    let index = 0;
    let index_inactive = 0;
    setInterval(addActiveClass, 1000);
    function addActiveClass() {
      titles.forEach((element) => {
        element.classList.remove("active", "inactive");
      });
      if (index === 0) {
        index_inactive = titles.length - 1;
      } else {
        index_inactive = index - 1;
      }
      titles[index].classList.add("active");
      titles[index_inactive].classList.add("inactive");
      if (index < titles.length - 1) {
        index++;
      } else {
        index = 0;
      }
    }
  }, []);

  return (
    <>
      <div id="hero-unit" className="hero-unit">
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="flip-titles-container">
            <p>大島武宜は</p>
            <div className="flip-titles">
              <div className="flip-title">コンポーザー</div>
              <div className="flip-title">ギタリスト</div>
              <div className="flip-title">ＷＥＢデザイナー</div>
              <div className="flip-title">音楽家</div>
              <div className="flip-title">プログラマ</div>
              <div className="flip-title">自由工作員</div>
              <div className="flip-title">ブックデザイナー</div>
              <div className="flip-title">歌うたい</div>
              <div className="flip-title">電子工作家</div>
            </div>
            <p>です。</p>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full">
          <Canvas
            orthographic={true}
            camera={{ zoom: 100, position: [10, 5, 0] }}
          >
            <OrbitControls autoRotate={true} enableZoom={false} />
            <ambientLight intensity={0.1} />
            <directionalLight color="white" position={[0, 0, 5]} />
            <Suspense fallback={null}>
              <Model scale={10} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}
