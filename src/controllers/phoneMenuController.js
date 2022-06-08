const phone = () => {
  const phoneBody = document.querySelector("#phoneBody");
  let f = false;
  if (document.documentElement.clientWidth < 768) {
    document.addEventListener("click", (e) => {
      let target = e.target;
      if (!f) {
        target = target.closest(".header__phone_icon");
        if (target && target.classList.contains("header__phone_icon")) {
          phoneBody.style.display = "block";
          f = true;
        }
      } else if (f) {
        if (!target.classList.contains("phone__body")) {
          phoneBody.style.display = "none";
          f = false;
        }
      }
    });
  }
};

phone();

window.addEventListener("resize", () => {
  phone();
});
