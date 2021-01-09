{
  const productsWrapper = document.getElementById('productsWrapper');
  const modal = document.getElementById('myModal');
  const modalBody = document.getElementById('modalContent');
  const tooltipCart = document.getElementById('tooltipCart');

  const renderModalProduct = (productData) => {
    const hasInCart = cartStore.checkProduct(productData.id);
    return `
      <div><span class="modal__close" id="close">&times;</span></div>
      <div class="modal__contentWrapper" product-id="${productData.id}">
          <h2 class="caption modal__caption">${productData.title}</h2>
          <img src="${ROUTES.productImage}/${PRODUCT_IMAGE_SIZE.normal}/${
      productData.image
    }" class="modal__image"/>
          <div class="modal__infoBox">
              <p class="modal__description">${productData.description}</p>
              <div class="modal__counter">
              <div class="counter__wrapper" >
                <button id="modalButtonIncrease" class="counter__button counter__buttonIncrease">+</button>
                <input id="modalCount" class="counter__input" type="number" value="${productData.count ||
                  1}">
                <button id="modalButtonDecrease" class="counter__button counter__buttonDecrease">-</button>
              </div>
              </div>
              <div class="modal__buyBox">
                  <p class="modal__price"><span id="price">
                    ${cartStore.calculateProductSum(
                      productData.price,
                      productData.count || 1
                    )}</span> &#8381;
                  </p>
                   ${
                     hasInCart
                       ? `<span>Товар в&nbsp;корзине</span>`
                       : '<button id="buyButton" class="global-buttonPrimary modal__buyButton" product-id="${productData.id}">В корзину</button>'
                   }
              </div>
          </div>
      </div>
    `;
  };

  const changeCountInput = (price, productId) => (e) => {
    const hasInCart = cartStore.checkProduct(productId);

    const value = Number(e.target.value);
    if (value < 0) {
      e.target.value = value * -1;
    } else if (value === 0) {
      e.target.value = 1;
    }
    document.getElementById('price').innerText = cartStore.calculateProductSum(
      price,
      e.target.value
    );

    if (hasInCart) {
      cartStore.updateCartProduct(productId, {
        count: +e.target.value
      });
      document.getElementById('product' + productId).outerHTML = renderProduct(
        cartStore.getCartProduct(productId)
      );
    }

    document.getElementById('cartSum').innerText = String(
      cartStore.getCartSum()
    );
  };

  const handleInputButtonClick = (
    countInput,
    price,
    productId,
    operator
  ) => () => {
    const hasInCart = cartStore.checkProduct(productId);

    if (operator === '+') {
      countInput.value = ++countInput.value;
    } else if (operator === '-') {
      countInput.value > 1 && (countInput.value = --countInput.value);
    }

    document.getElementById('price').innerText = cartStore.calculateProductSum(
      price,
      countInput.value
    );

    if (hasInCart) {
      cartStore.updateCartProduct(productId, {
        count: +countInput.value
      });
      document.getElementById('product' + productId).outerHTML = renderProduct(
        cartStore.getCartProduct(productId)
      );
    }

    document.getElementById('cartSum').innerText = String(
      cartStore.getCartSum()
    );
  };

  const showTooltipCart = () => {
    tooltipCart.style.display = 'block';
    setTimeout(hideTooltipCart, 1500);
  };

  const hideTooltipCart = () => {
    tooltipCart.style.display = 'none';
  };

  const addProductInCart = (product, countInput, productId) => () => {
    cartStore.addCartProduct({
      ...product,
      count: +countInput.value
    });
    document.getElementById('cartSum').innerText = String(
      cartStore.getCartSum()
    );

    document.getElementById('product' + productId).outerHTML = renderProduct(
      cartStore.getCartProduct(productId)
    );
  };

  const openModal = (e) => {
    if (e.target.className !== 'global-buttonPrimary global-buttonSecondary') {
      return;
    }

    modal.style.display = 'block';
    const productId = e.target.getAttribute('product-id');
    productStore.getProduct(+productId).then((product) => {
      const cartProduct = cartStore.getCartProduct(+productId);
      modalBody.innerHTML = renderModalProduct(cartProduct || product);

      const countInput = document.querySelector('#modalCount');
      const btnPlus = document.querySelector('#modalButtonIncrease');
      const btnMinus = document.querySelector('#modalButtonDecrease');
      const buyButton = document.querySelector('#buyButton');

      countInput.addEventListener(
        'change',
        changeCountInput(product.price, +productId)
      );
      btnPlus.addEventListener(
        'click',
        handleInputButtonClick(countInput, product.price, +productId, '+')
      );
      btnMinus.addEventListener(
        'click',
        handleInputButtonClick(countInput, product.price, +productId, '-')
      );
      !cartProduct &&
        buyButton.addEventListener(
          'click',
          addProductInCart(product, countInput, +productId)
        );
      !cartProduct && buyButton.addEventListener('click', showTooltipCart);
    });
    document.addEventListener('keydown', closeModal);
  };

  const closeModal = (e) => {
    if (
      e.target.id === 'myModal' ||
      e.target.id === 'close' ||
      e.target.id === 'buyButton' ||
      e.code === 'Escape'
    ) {
      modal.style.display = 'none';
      modalBody.innerHTML = ``;
      document.removeEventListener('keydown', closeModal);
    }
  };

  productsWrapper.addEventListener('click', openModal);
  modal.addEventListener('click', closeModal);
}
