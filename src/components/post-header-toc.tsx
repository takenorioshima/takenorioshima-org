import { useEffect } from "react";
import * as tocbot from "tocbot";

const PostHeaderToc = () => {
  useEffect(() => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".js-header-toc",
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

  function toggleToc() {
    const toc = document.querySelector(".js-header-toc");
    toc?.classList.toggle("hidden");
    const chevron = document.querySelector(".js-header-toc-chevron");
    chevron?.classList.toggle("flip");
  }
  return (
    <div className="lg:hidden">
      <button className="font-semibold text-white" onClick={toggleToc}>
        目次 <i className="bi bi-chevron-down js-header-toc-chevron header-toc-chevron"></i>
      </button>
      <div className="js-header-toc hidden absolute bg-white top-[3rem] left-0 w-full drop-shadow-md rounded-md p-4"></div>
    </div>
  );
};

export default PostHeaderToc;
