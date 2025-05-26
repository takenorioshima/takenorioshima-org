export const flipWorksHeader = () => {
  const headerServe = document.querySelector(".js-works-header-serve");
  const headerPrivate = document.querySelector(".js-works-header-private");

  setInterval(flipTitle, 1000);

  function flipTitle() {
    if (!headerServe || !headerPrivate) return;
    headerServe.classList.toggle("active");
    headerPrivate.classList.toggle("active");
  }
};
