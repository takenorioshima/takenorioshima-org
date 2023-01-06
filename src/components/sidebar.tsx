import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "bootstrap-icons/font/bootstrap-icons.css";
import SidebarToc from "./sidebar-toc";
import { AUTHOR_PROFILES } from "../lib/constants";

const Sidebar = () => {

  const links = AUTHOR_PROFILES.links;
  const linkList = [];
  for (const [key, value] of Object.entries(links)) {
    console.log(key, value);
    const klass = `bi bi-${key}`;
    linkList.push(<Link href={value} className="flex-1 text-center"><i className={klass}></i></Link>)
  }
  
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
            {linkList}
          </div>
        </div>
      </div>
      <SidebarToc />
    </>
  );
};

export default Sidebar;
