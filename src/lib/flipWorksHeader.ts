export const flipWorksHeader = () => {
  const headerServe = document.querySelector(".js-works-header-serve");
  const headerPrivate = document.querySelector(".js-works-header-private");

  function flipTitle() {
    if (!headerServe || !headerPrivate) return;
    headerServe.classList.toggle("active");
    headerPrivate.classList.toggle("active");
  }

  return setInterval(flipTitle, 1000);
};
