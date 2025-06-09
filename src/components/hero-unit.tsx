import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./hero-model";
import { useLenisScroll } from "@/components/lenis-provider";

export default function HeroUnit() {
  const [scale, setScale] = useState(13);

  const { scrollY, windowHeight } = useLenisScroll();
  const scrollProgress = scrollY / windowHeight;
  const opacity = 1 - scrollProgress;

  useEffect(() => {
    const titles = document.querySelectorAll(".flip-titles > div");
    let index = 0;
    let index_inactive = 0;

    const intervalId = setInterval(addActiveClass, 1000);

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

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const scale = 1 + scrollProgress * 1.5;

    function updateScale() {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(8 * scale);
      } else if (width < 1024) {
        setScale(10 * scale);
      } else {
        setScale(13 * scale);
      }
    }

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [scrollProgress]);

  return (
    <div id="hero-unit" className="hero-unit overflow-hidden relative" data-aos="fade-in">
      <div className="relative flex items-center justify-center w-full h-full z-10">
        <div className="flip-titles-container parsed-content">
          <p>大島武宜は</p>
          <div className="flip-titles font-semibold">
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

      <div className="fixed top-0 left-0 w-full h-full origin-center" style={{ opacity: opacity }}>
        <Canvas orthographic={true} camera={{ zoom: 100, position: [100, 10, 100] }}>
          <OrbitControls autoRotate={true} enableZoom={false} />
          <ambientLight intensity={1} />
          <directionalLight color="white" position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <Model scale={scale} />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero-unit-scroll">
        <small>Scroll</small>
        <i className="bi-chevron-down"></i>
      </div>
    </div>
  );
}
