const root = document.querySelector('#root');
const upButton = document.querySelector('#upButton');

const showUpButton = () => {
  if (root.getBoundingClientRect().y < -300) {
    upButton.style.opacity = '1';
  } else upButton.style.opacity = '0';
};

const scrollingTo = () => {
  if (root.getBoundingClientRect().y < 0) {
    window.scrollBy(0, -100);
    setTimeout(scrollingTo, 20);
  }
};

window.addEventListener('scroll', showUpButton);
upButton.addEventListener('click', scrollingTo);
