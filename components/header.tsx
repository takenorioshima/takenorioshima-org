import Link from "next/link";
import { AUTHOR_PROFILES } from "../lib/constants";

const Header = () => {
  return (
    <div className="global-nav fixed top-0 left-0 right-0 z-50">
      <nav className="container flex items-center justify-between mx-auto flex-nowrap p-3 h-12">
        <Link href={"/"} className="flex items-center mr-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="global-nav-logo mr-3"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 580 323"
          >
            <g>
              <rect
                x="14.73"
                y="38.08"
                transform="matrix(0.9986 -0.0523 0.0523 0.9986 -3.2317 7.7369)"
                className="st0"
                width="262.77"
                height="55"
              />
              <polygon
                className="st1"
                points="180.34,36.24 138.23,302.81 82.26,305.75 124.37,39.18"
              />
            </g>
            <g>
              <path
                className="logo-o"
                d="M432.47,68.97c45.82,0,83.6,35.9,86,81.73c1.21,23-6.62,45.1-22.03,62.22c-15.41,17.12-36.57,27.21-59.58,28.42 c-1.54,0.08-3.1,0.12-4.63,0.12c-45.83,0-83.6-35.9-86.01-81.73c-1.21-23,6.62-45.1,22.03-62.22 c15.41-17.12,36.57-27.21,59.58-28.42c1.54-0.08,3.1-0.12,4.58-0.12h0.03H432.47 M432.47,18.97c-2.4,0-4.82,0.06-7.25,0.19 C350.08,23.1,292.36,87.21,296.3,162.35c3.81,72.71,63.96,129.11,135.94,129.11c2.4,0,4.82-0.06,7.25-0.19 c75.14-3.94,132.86-68.04,128.92-143.18C564.6,75.37,504.44,18.97,432.47,18.97L432.47,18.97z"
              />
            </g>
          </svg>
          <span className="text-xs lg:text-sm tracking-tight">
            まなぶ・つくる・あそぶ
          </span>
        </Link>
        <div className="block">
          {Object.keys(AUTHOR_PROFILES.links).map((key) => {
            const klass = `bi bi-${key}`;
            return (
              <Link
                href={AUTHOR_PROFILES.links[key]}
                className="mx-1 text-lg lg:text-xl lg:mx-2 text-center"
              >
                <i className={klass}></i>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Header;
