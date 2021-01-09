{
  let display = 1;

  const leftButton = document.getElementById('slideLeft');
  const rightButton = document.getElementById('slideRight');
  const dotsContainer = document.getElementById('header__sliderDots');
  const banners = document.getElementsByClassName('slider__banner');

  const url = `${ROUTES.host}/${ROUTES.models}/banners.json`;
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      leftButton.addEventListener('click', arrowLeft);
      rightButton.addEventListener('click', arrowRight);
      document.getElementById('sliderDisplay').innerHTML = bannersMapper(
        data.banners
      ).join('');
      bannerStore.setBanners(data.banners);
      showButton();
      renderDots(data.banners, display);
      dotsContainer.addEventListener('click', changeSlideDot);
    });

  const bannersMapper = (banners) =>
    banners.map(
      (banner) =>
        `<a class="slider__banner" id="banner${banner.id}" ${banner.link &&
          'href="' + banner.link + '"'}>
            <img class="slider__image" src="${ROUTES.bannerImage}/${
          banner.name
        }">
        </a>`
    );

  // const rotation = () => {
  //   setInterval(() => {
  //     arrowRight();
  //   }, 5000);
  // };
  //
  // rotation();

  const showButton = () => {
    display < 2
      ? leftButton.setAttribute('style', 'display: none')
      : leftButton.setAttribute('style', 'display: block');
    display > bannerStore.getBanners().length - 1
      ? rightButton.setAttribute('style', 'display: none')
      : rightButton.setAttribute('style', 'display: block');
  };

  const arrowRight = () => {
    if (display > bannerStore.getBanners().length - 1) return;
    document
      .getElementById('banner' + display)
      .setAttribute('style', 'margin-left: -100%');
    display++;
    renderDots(bannerStore.getBanners(), display);
    showButton();
  };

  const arrowLeft = () => {
    if (display < 2) return;
    display--;
    document
      .getElementById('banner' + display)
      .setAttribute('style', 'margin-left: 0');
    renderDots(bannerStore.getBanners(), display);
    showButton();
  };

  const renderDots = (banners, display) => {
    const dots = [];
    for (let i = 0; i < banners.length; i++) {
      const dot =
        display === i + 1
          ? `<span class="header__dot header__dot_active" id="dot${i}"></span>`
          : `<span class="header__dot" id="dot${i}"></span>`;
      dots.push(dot);
    }
    document.getElementById('header__sliderDots').innerHTML = dots.join('');
  };

  const changeSlideDot = (e) => {
    if (e.target.className !== 'header__dot') return;

    const dotId = Number(e.target.id.match(/\d+/));

    if (display < dotId + 1) {
      for (let i = 0; i < dotId; i++) {
        banners[i].style.marginLeft = '-100%';
      }
    } else {
      for (let i = 0; i < display - 1; i++) {
        if (i < dotId) continue;
        banners[i].style.marginLeft = '0';
      }
    }

    display = dotId + 1;
    renderDots(bannerStore.getBanners(), display);
    showButton();
  };
}
