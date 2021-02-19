{
  const portfolioDots = document.querySelector(".slider-dots");
  const slide = document.querySelectorAll(".slider-item");

  const renderDots = (q) => {
    const li = `
            <li class="dot"></li>
        `;
    return li.repeat(q);
  };
  const dot = document.querySelector(".dot");
  portfolioDots.insertAdjacentHTML("beforeEnd", renderDots(slide.length));

  const slider = () => {
    const slide = document.querySelectorAll(".slider-item");
    const slider = document.querySelector(".slider-content");
    const btn = document.querySelectorAll(".slider-btn");
    const dot = document.querySelectorAll(".dot");

    let currentSlide = 0;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "slider-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "slider-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time) => {
      setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches(".slider-btn, .dot")) {
        return;
      }

      prevSlide(slide, currentSlide, "slider-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
        if (currentSlide < 0) {
          currentSlide = slide.length - 1;
        }
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      nextSlide(slide, currentSlide, "slider-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    startSlide(2000);
  };
  slider();
}
