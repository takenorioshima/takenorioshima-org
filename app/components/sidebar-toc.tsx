"use client";

import { useEffect } from "react";
import tocbot from "tocbot";
import { usePathname } from "next/navigation";

const SidebarToc = () => {
  const pathname = usePathname();

  useEffect(() => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".js-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      headingsOffset: 60,
      scrollSmoothOffset: -60,
      tocScrollingWrapper: null,
    });
    return () => tocbot.destroy();
  }, [pathname]);

  return (
    <div className="sticky top-[80px] hidden lg:block">
      <div className="text-gray-700 font-semibold text-sm">目次</div>
      <div className="js-toc"></div>
    </div>
  );
};

export default SidebarToc;
