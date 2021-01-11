{
    const slider = () => {
      const slide = document.querySelectorAll('.portfolio-item');
      const slider = document.querySelector('.portfolio-content');
      const btn = document.querySelectorAll('.portfolio-btn');
      const dot = document.querySelectorAll('.dot');

      let currentSlide = 0;

      const autoPlaySlide = () => {
        slide[currentSlide].classList.remove('portfolio-item-active');
        currentSlide++;
        if (currentSlide>=slide.length){
          currentSlide = 0;
        }
        slide[currentSlide].classList.add('portfolio-item-active');
      };

      const startSlide = () => {
        setInterval(autoPlaySlide, 2000);
      };

      const stopSlide = () => {
        clearInterval(interval);
      };

      startSlide();

    };
    slider();
}
