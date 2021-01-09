const openBurger = () => {
  const popupMenu = document.querySelector('#popupMenu');
  console.log(popupMenu);
  let f = false;
  if (document.documentElement.clientWidth < 768) {
    document.addEventListener('click', (e) => {
      let target = e.target;
      if (!f) {
        target = target.closest('.navigation__burger');
        if (target && target.classList.contains('navigation__burger')) {
          console.log(target);
          popupMenu.style.display = 'block';
          f = true;
        }
      } else if (f) {
        if (!target.classList.contains('popup-menu')) {
          popupMenu.style.display = 'none';
          f = false;
        }
      }
    });
  }
};

openBurger();

window.addEventListener('resize', () => {
  openBurger();
});