import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AUTHOR_PROFILES } from "../lib/constants";
import * as tocbot from "tocbot";

const Sidebar = () => {
  useEffect(() => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".js-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1, h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      headingsOffset: 60,
      scrollSmoothOffset: -60,
    });
    return () => tocbot.destroy();
  }, []);

  return (
    <>
      <div className="sidebar-profile relative mb-4">
        <div className="bg-white p-5 drop-shadow rounded-lg relative z-10">
          <div className="flex items-center">
            <Image
              alt="Icon: Takenori Oshima"
              className="rounded-full block w-16 mr-2"
              src="/assets/blog/authors/takenori.jpg"
              width="96"
              height="96"
            />
            <div>
              <div className="font-semibold text-lg">
                {AUTHOR_PROFILES.name.ja}
              </div>
              <div className="text-xs text-slate-500">
                {AUTHOR_PROFILES.name.en}
              </div>
            </div>
          </div>

          <div className="text-sm my-2">{AUTHOR_PROFILES.description}</div>
          <div className="flex align-center w-full">
            {Object.keys(AUTHOR_PROFILES.links).map((key) => {
              const klass = `bi bi-${key}`;
              return (
                <Link
                  href={AUTHOR_PROFILES.links[key]}
                  className="flex-1 text-center"
                >
                  <i className={klass}></i>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="sticky top-[80px]">
        <h4 className="text-gray-700 font-semibold text-sm">??????</h4>
        <div className="js-toc"></div>
      </div>
    </>
  );
};

export default Sidebar;
