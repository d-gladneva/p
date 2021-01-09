{
  categoryStore.getCategories().then(({ head, list }) => {
    renderCategory(list);
    for (let i = 0; i < list.length; i++) {
      const categoryId = 'category' + list[i].id;
      productStore.getProducts(list[i].id).then(({ head, list }) => {
        document.getElementById(categoryId).innerHTML = renderProducts(
          list
        ).join('');
      });
    }
  });

  const renderCategory = (categoryList) => {
    document.getElementById('productsWrapper').innerHTML = categoryList
      .map((category) => {
        return `
        <section class="products__promo" id="section${category.id}">
          <h2 class="products__promoCaption" id="${category.code}">${category.name}</h2>
          <div class="products__promoListing" id="category${category.id}"></div>
        </section>
      `;
      })
      .join('');
  };

  const renderProducts = (prods) => {
    return prods.map((item) => renderProduct(item));
  };

  const renderProduct = (product) => {
    const hasInCart = cartStore.checkProduct(product.id);

    return `
      <div class="products__productWrapper" id="product${
        product.id
      }" product-id="${product.id}">
        <div class="products__product">
          <img src="${ROUTES.productImage}/${PRODUCT_IMAGE_SIZE.small}/${
      product.image
    }" data-img="${product.image}">
          <p class="global-caption products__productCaption">${
            product.title
          }</p>
          <p class="products__productDescription" data-tooltip="${
            product.description
          }">${product.description}</p>
          <div class="products__boxCounterPrice" price="${product.price}">
            <div class="products__boxCounter">
              <button class="counter__button counter__buttonIncrease">+</button>
              <input class="counter__input" type="number" value="${product.count ||
                1}">
              <button class="counter__button counter__buttonDecrease">-</button>
            </div>
            <div class="products__boxPrice">
              <p class="products__productPrice"><span class="products__priceSum">
                ${cartStore.calculateProductSum(
                  product.price,
                  product.count || 1
                )}</span> &#8381;
              </p>
            </div>
          </div>
          <div class="products__buyBox">
            <button class="global-buttonPrimary global-buttonSecondary" product-id="${
              product.id
            }">Подробнее</button>
            ${
              hasInCart
                ? `<span>Товар в&nbsp;корзине</span>`
                : '<button class="global-buttonPrimary">В корзину</button>'
            }
          </div>
        </div>
      </div>
    `;
  };

  const productsWrapper = document.getElementById('productsWrapper');
  const tooltipCart = document.getElementById('tooltipCart');

  const showTooltipCart = () => {
    tooltipCart.style.display = 'block';
    setTimeout(hideTooltipCart, 1500);
  };

  const hideTooltipCart = () => {
    tooltipCart.style.display = 'none';
  };

  const setProductSum = (e, value) => {
    const counterBox = e.target.closest('.products__boxCounterPrice');
    const price = counterBox.getAttribute('price');

    counterBox.children[1].children[0].children[0].innerText = cartStore.calculateProductSum(
      +price,
      +value
    );
  };

  const HandelProductChange = (e) => {
    const productWrapper = e.target.closest('.products__productWrapper');
    const productId = productWrapper.getAttribute('product-id');
    const hasInCart = cartStore.checkProduct(+productId);

    const value = Number(e.target.value);
    if (value < 0) {
      e.target.value = value * -1;
    } else if (value === 0) {
      e.target.value = 1;
    } else if (value >= siteSetting.maxProductCount) {
      e.target.value = siteSetting.maxProductCount;
    }
    setProductSum(e, e.target.value);

    if (hasInCart) {
      cartStore.updateCartProduct(+productId, {
        count: +e.target.value
      });
    }

    document.getElementById('cartSum').innerText = String(
      cartStore.getCartSum()
    );
  };

  const btnIncrease = (e) => {
    const productWrapper = e.target.closest('.products__productWrapper');
    const productId = productWrapper.getAttribute('product-id');
    const hasInCart = cartStore.checkProduct(+productId);

    const countInput = e.target.nextElementSibling;
    countInput.value = ++countInput.value;
    setProductSum(e, countInput.value);

    if (hasInCart) {
      cartStore.updateCartProduct(+productId, {
        count: +countInput.value
      });
    }

    document.getElementById('cartSum').innerText = String(
      cartStore.getCartSum()
    );
  };

  const btnDecrease = (e) => {
    const productWrapper = e.target.closest('.products__productWrapper');
    const productId = productWrapper.getAttribute('product-id');
    const hasInCart = cartStore.checkProduct(+productId);

    const countInput = e.target.previousElementSibling;
    const nextValue = --countInput.value;
    if (nextValue < 1) {
      countInput.value = 1;
    } else {
      countInput.value = nextValue;
    }
    setProductSum(e, countInput.value);

    if (hasInCart) {
      cartStore.updateCartProduct(+productId, {
        count: +countInput.value
      });
    }

    document.getElementById('cartSum').innerText = String(
      cartStore.getCartSum()
    );
  };

  const addProductInCart = (e) => {
    const productWrapper = e.target.closest('.products__productWrapper');
    const productId = productWrapper.getAttribute('product-id');
    productStore.getProduct(+productId).then((product) => {
      const count = +productWrapper.children[0].children[3].children[0]
        .children[1].value;

      const productData = {
        ...product,
        count
      };

      cartStore.addCartProduct(productData);

      document.getElementById('cartSum').innerText = String(
        cartStore.getCartSum()
      );

      productWrapper.outerHTML = renderProduct(productData);
    });
  };

  const HandelProductClick = (e) => {
    switch (e.target.className) {
      case 'counter__button counter__buttonIncrease':
        btnIncrease(e);
        break;
      case 'counter__button counter__buttonDecrease':
        btnDecrease(e);
        break;
      case 'global-buttonPrimary':
        addProductInCart(e);
        showTooltipCart(e);
        break;
      default:
        return;
    }
  };

  renderProductInstance(renderProduct);

  productsWrapper.addEventListener('click', HandelProductClick);
  productsWrapper.addEventListener('change', HandelProductChange);
}
