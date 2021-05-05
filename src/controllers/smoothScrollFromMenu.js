{
  const smoothScrollFromMenu = () => {
    const navigationHeight = document.querySelector(".header__wrapper")
      .offsetHeight;
    const menuItems = document.getElementsByClassName("scroll");
    const getPosition = (elem) => {
      return (
        document.documentElement.scrollTop + elem.getBoundingClientRect().y
      );
    };
    const scrollToTarget = (e) => {
      let target = e.target;
      target = target.closest(".test");
      let targetId = target.getAttribute("the");
      if (target) {
        const targetTo = document.getElementById(targetId);
        const targetPosition = getPosition(targetTo);
        const offsetTargetPosition = targetPosition - navigationHeight;
        window.scrollTo({
          top: offsetTargetPosition,
          behavior: "smooth",
        });
      }
    };

    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener("click", scrollToTarget);
    }
  };

  smoothScrollFromMenu();
}
