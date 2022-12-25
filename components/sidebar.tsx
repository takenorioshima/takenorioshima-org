import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AUTHOR_PROFILES } from "../lib/constants";

const Sidebar = () => {
  const links = AUTHOR_PROFILES.links;
  return (
    <>
      <div className="sidebar-profile bg-white p-5 rounded-lg">
        <div className="font-semibold text-lg">{AUTHOR_PROFILES.name.ja}</div>
        <div className="text-xs text-slate-500">{AUTHOR_PROFILES.name.en}</div>
        <div className="text-sm my-2">{AUTHOR_PROFILES.description}</div>
        <div className="flex align-center w-full">
          {Object.keys(links).map((key) => {
            const klass = `bi bi-${key}`;
            return (
              <Link href={links[key]} className="flex-1 text-center">
                <i className={klass}></i>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
