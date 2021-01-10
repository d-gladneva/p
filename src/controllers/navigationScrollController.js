{
  const navLinks = document.getElementsByClassName('navigation__link');
  const navigationHeight = document.querySelector('.header__wrapper')
    .offsetHeight;

  const sections = document.getElementsByClassName('products__promo');

  const getPosition = (elem) => {
    return document.documentElement.scrollTop + elem.getBoundingClientRect().y;
  };

  const scrollToTarget = (e) => {
    const targetId = e.target.getAttribute('to');
    const target = document.getElementById(targetId);
    const targetPosition = getPosition(target);
    const offsetTargetPosition = targetPosition - navigationHeight;

    window.scrollTo({
      top: offsetTargetPosition,
      behavior: 'smooth'
    });
  };

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', scrollToTarget);
  }

  function changeColor() {
    for (let i = 0; i < sections.length; i++) {
      if (
        sections[i].getBoundingClientRect().y <= 175 &&
        sections[i].getBoundingClientRect().y >
          175 - sections[i].getBoundingClientRect().height - 50
      ) {
        navLinks[i].style.color = '#822f37';
      } else {
        navLinks[i].style.color = '#dadada';
      }
    }
  }

  window.addEventListener('scroll', changeColor);
}
