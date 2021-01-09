{
  const productsWrapper = document.getElementById('productsWrapper');
  const tooltip = document.getElementById('tooltip');

  function getPosition(target) {
    return {
      descPosX: window.pageXOffset + target.getBoundingClientRect().x,
      descPosY: window.pageYOffset + target.getBoundingClientRect().y
    };
  }

  function showTooltip(e) {
    if (e.target.className === 'products__productDescription') {
      const tooltipText = e.target.getAttribute('data-tooltip');
      const headerHeight = document.getElementById('headerWrapper')
        .offsetHeight;

      tooltip.append(tooltipText);

      const descPosition = getPosition(e.target);

      tooltip.style.display = 'block';
      const tooltipHeight = tooltip.offsetHeight;

      let positionY = descPosition.descPosY - tooltipHeight;
      let positionX = descPosition.descPosX + 50;

      if (positionY < window.pageYOffset + headerHeight) {
        positionY = descPosition.descPosY + e.target.offsetHeight;
      }
      if (positionX < window.pageXOffset) {
        positionX = window.pageXOffset;
      }

      tooltip.style.top = `${positionY}px`;
      tooltip.style.left = `${positionX}px`;
    }
  }

  function hideTooltip(e) {
    if (e.target.className === 'products__productDescription') {
      tooltip.style.display = 'none';
      tooltip.innerHTML = `<span class="tooltip__text">Состав: </span>`;
    }
  }

  productsWrapper.addEventListener('mouseover', showTooltip);
  productsWrapper.addEventListener('mouseout', hideTooltip);
}
