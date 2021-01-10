const smoothScrollFromMenu = () => {
  const navigationHeight = document.querySelector('.header__wrapper')
    .offsetHeight;
  console.log(navigationHeight);
  const menuItems = document.getElementsByClassName('scroll');
  console.log(menuItems);
  const getPosition = (elem) => {
    return document.documentElement.scrollTop + elem.getBoundingClientRect().y;
  };
  const scrollToTarget = (e) => {
    let target = e.target;
    target = target.closest('.test');
    let targetId = target.getAttribute('to');
    console.log(targetId);
    if (target) {
      const targetTo = document.getElementById(targetId.substring(1, targetId.length));
      const targetPosition = getPosition(targetTo);
      const offsetTargetPosition = targetPosition - 200;
      window.scrollTo({
        top: offsetTargetPosition,
        behavior: 'smooth'
      });
    }
  };

  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', scrollToTarget);
  }

};

smoothScrollFromMenu();

