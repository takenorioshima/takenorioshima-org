export const flipWorksHeader = () => {
  const headerServe = document.querySelectorAll(".js-works-header-serve");
  const headerPrivate = document.querySelectorAll(".js-works-header-private");

  function flipTitle() {
    if (!headerServe || !headerPrivate) return;
    headerServe.forEach((e) => {
      e.classList.toggle("active");
    });
    headerPrivate.forEach((e) => {
      e.classList.toggle("active");
    });
  }

  return setInterval(flipTitle, 1000);
};
