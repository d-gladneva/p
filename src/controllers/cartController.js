{
  const cartButton = document.getElementById("cartButton");
  const cartBody = document.getElementById("cartBody");
  const root = document.getElementById("root");
  const cartSum = document.getElementById("cartSum");

  let cartIsOpen = false;

  const handleInputButtonClick = (productId, e, operator) => {
    const inputValue = Number(e.target.parentElement.children[1].value);
    if (operator === "+") {
      e.target.parentElement.children[1].value = inputValue + 1;
    } else if (operator === "-") {
      e.target.parentElement.children[1].value =
        inputValue > 1 ? inputValue - 1 : 1;
    }
    cartStore.updateCartProduct(+productId, {
      count: +e.target.parentElement.children[1].value,
    });
    renderCartProductsList();
    cartSum.innerText = String(cartStore.getCartSum());

    document.getElementById("product" + productId).outerHTML = renderProduct(
      cartStore.getCartProduct(+productId)
    );
  };

  const btnDelete = (productId) => {
    const product = cartStore.getCartProduct(+productId);
    cartStore.deleteCartProduct(+productId);
    renderCartProductsList();
    cartSum.innerText = String(cartStore.getCartSum());

    document.getElementById("product" + productId).outerHTML = renderProduct({
      ...product,
      count: 1,
    });
  };

  const HandelCartRowClick = (e) => {
    const productId = e.target
      .closest(".cart__tableRow")
      .getAttribute("itemId");
    switch (e.target.className) {
      case "counter__button counter__buttonIncrease":
        handleInputButtonClick(productId, e, "+");
        break;
      case "counter__button counter__buttonDecrease":
        handleInputButtonClick(productId, e, "-");
        break;
      case "cart__tableDelete":
        btnDelete(productId);
        break;
      default:
        return;
    }
  };

  const HandelCartRowChange = (e) => {
    const productId = e.target
      .closest(".cart__tableRow")
      .getAttribute("itemId");
    const inputValue = Number(e.target.value);
    if (inputValue < 0) {
      e.target.value = inputValue * -1;
    } else if (inputValue === 0) {
      e.target.value = 1;
    }
    cartStore.updateCartProduct(+productId, {
      count: +e.target.value,
    });
    renderCartProductsList();
    cartSum.innerText = String(cartStore.getCartSum(+productId));

    document.getElementById("product" + productId).outerHTML = renderProduct(
      cartStore.getCartProduct(+productId)
    );
  };

  const renderCartProductsList = () => {
    const cartList = cartStore.getCartProducts();

    if (cartList.length === 0) {
      document.getElementById("cartBody").innerHTML = `
        В корзине пока-что нет товаров
      `;
    } else {
      const products = cartList.map((product, index) => {
        return `
      <tr class="cart__tableRow" itemId="${product.id}">
        <td class="cart__tableCell">${index + 1}</td>
        <td class="cart__tableCell">
          <img 
            src="${product.thumbnail.small}" 
            alt="${product.title}" 
            class="cart__productImage"
          >
        </td>
        <td class="cart__tableCell">${product.title}</td>
        <td class="cart__tableCell">
          <div class="counter__wrapper" >
            <button class="counter__button counter__buttonIncrease">+</button>
            <input class="counter__input" type="number" value="${
              product.count
            }">
            <button class="counter__button counter__buttonDecrease">-</button>
          </div>
        </td>
        <td class="cart__tableCell">${cartStore.calculateProductSum(
          product.price,
          product.count
        )} &#8381;</td>
        <td class="cart__tableCell"><span class="cart__tableDelete">×</span></td>
      </tr>
    `;
      });

      document.getElementById("cartBody").innerHTML = `
      <table class="cart__table">
        <tbody>
          <tr>
            <th class="cart__tableHeader">№</th>
            <th class="cart__tableHeader"></th>
            <th class="cart__tableHeader">Название</th>
            <th class="cart__tableHeader">Количество</th>
            <th class="cart__tableHeader">Сумма</th>
            <th class="cart__tableHeader"></th>
          </tr>
          ${products.join("")}
        </tbody>
      </table>
      <hr noshade class="cart__divider">
      <div class="cart__total">
        <div>
          <p>Всего товаров: <span class="cart__totalValues">${cartStore.getCartTotalCount()}</span></p>
          <p>На сумму: <span class="cart__totalValues">${cartStore.getCartSum()} &#8381;</span></p>
        </div>
        <button class="global-buttonPrimary cart__buyButton">Оформить заказ</button>
      </div>
    `;

      const rows = document.getElementsByClassName("cart__tableRow");
      for (let i = 0; i < rows.length; i++) {
        rows[i].addEventListener("click", HandelCartRowClick);
        rows[i].addEventListener("change", HandelCartRowChange);
      }
    }
  };

  const handleCartBodyClick = () => {
    if (cartIsOpen === false) {
      cartBody.style.display = "block";
      renderCartProductsList();

      // валидация формы

      const validForm = (elemWork) => {
        const checkPhone = /^(\+7)?8?([-()]*\d){10}$/;
        if (elemWork.name === "phone") {
          elemWork.value = elemWork.value.replace(/^\++/g, "+");
          elemWork.value = elemWork.value.replace(/[^+0-9]/g, "");
          let valid = checkPhone.test(elemWork.value);
          if (!valid) {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error");
            errorDiv.textContent = "Ошибка в этом поле";
            errorDiv.style.cssText =
              "color: red; line-height: 0px; height: 15px; font-size: 15px;";
            if (
              elemWork.nextElementSibling &&
              elemWork.nextElementSibling.textContent === "Ошибка в этом поле"
            ) {
              return;
            }
            elemWork.insertAdjacentElement("afterend", errorDiv);
            // offBtn();
          } else {
            if (
              elemWork.nextElementSibling.textContent === "Ошибка в этом поле"
            ) {
              elemWork.nextElementSibling.remove();
            }
            // onBtn();
          }
        }
        if (
          elemWork.name === "name" ||
          elemWork.name === "surname" ||
          elemWork.name === "region" ||
          elemWork.name === "city" ||
          elemWork.name === "street"
        ) {
          elemWork.value = elemWork.value.replace(/[^а-яё\s]/gi, "");
        }
        if (
          elemWork.name === "house" ||
          elemWork.name === "building" ||
          elemWork.name === "apartment"
        ) {
          elemWork.value = elemWork.value.replace(/[^0-9]/g, "");
        }
        if (elemWork.name === "address" || elemWork.name === "comment") {
          elemWork.value = elemWork.value.replace(
            /[^а-яА-Я0-9 ,.?!"';:\-\%()\#]/g,
            ""
          );
        }
      };

      //отрисовать заказ

      document.getElementById("orderContent").innerHTML = `
      <div><span class="modal__close" id="close">&times;</span></div>
      <form class="cart__form">
         <input class="cart__form_item" name="name" type="text" required placeholder="Ваше имя">
         <input class="cart__form_item" name="surname" type="text" required placeholder="Ваша фамилия">
         <input class="cart__form_item" name="email" type="text" required placeholder="Ваш email">
         <input class="cart__form_item" name="phone" type="text" required placeholder="Ваш телефон">
         <input class="cart__form_item" name="comment" type="text" required placeholder="Ваш комметарий">
         <div class="order_coord__text">
         <input class="coord_text__item" name="region" type="text" required placeholder="Регион">
         <input class="coord_text__item" name="city" type="text" required placeholder="Город">
         </div>
         <input class="cart__form_item" name="street" type="text" required placeholder="Улица">
         <div class="order_coord__numbers">
         <input class="coord_numbers__item" name="house" type="text" required placeholder="Дом">
         <input class="coord_numbers__item" name="building" type="text" required placeholder="Строение">
         <input class="coord_numbers__item" name="apartment" type="text" required placeholder="Квартира">
         </div>
      <button type="submit" class="global-buttonPrimary cart__buyButton cart__buyButton_order">Оформить заказ</button>
      </form>
      `;

      // отправка формы

      const statusMessage = document.createElement("div");

      const sendForm = (elemWork) => {
        const errorMessage = "Что-то пошло не так...";
        const loadMessage = "Загрузка...";
        const succesMessage = "Спасибо! Мы скоро с Вами свяжемся!";

        statusMessage.style.cssText = `
          font-size: 1.5 rem;
          color: #505061;
          text-align: center;
          margin-top: 10px;
          `;
        const inputFormElems = elemWork.querySelectorAll("input");
        const inputPhone = elemWork.querySelector('input[name="phone"]');
        const inputName = elemWork.querySelector('input[name="name"]');

        if (inputPhone.value !== "" || inputName.value !== "") {
          elemWork.appendChild(statusMessage);

          statusMessage.textContent = loadMessage;

          setTimeout(() => {
            statusMessage.delete();
          }, 1000);

          const body = {
            name: document.querySelector('input[name="name"]').value,
            surname: document.querySelector('input[name="surname"]').value,
            email: document.querySelector('input[name="email"]').value,
            phone: document.querySelector('input[name="phone"]').value,
            comment: document.querySelector('input[name="comment"]').value,
            address: {
              city: document.querySelector('input[name="city"]').value,
              street: document.querySelector('input[name="street"]').value,
              house: document.querySelector('input[name="house"]').value,
              building: document.querySelector('input[name="building"]').value,
              region: document.querySelector('input[name="region"]').value,
              apartment: document.querySelector('input[name="apartment"]')
                .value,
            },
          };

          postData(body)
            .then((response) => {
              if (response.ok !== true) {
                throw new Error("status network not 200");
              }
              setTimeout(() => {
                statusMessage.delete();
              }, 1000);
              statusMessage.textContent = succesMessage;
              console.log(statusMessage);

              for (let i = 0; i < inputFormElems.length; i++) {
                inputFormElems[i].value = "";
              }
              setTimeout(() => {
                statusMessage.remove();
              }, 5000);
            })
            .catch((error) => {
              if (statusMessage.previousSibling) {
                return;
              }

              statusMessage.textContent = errorMessage;
              console.log(statusMessage.previousSibling);

              setTimeout(() => {
                statusMessage.delete();
              }, 1000);
              console.log(error);
            });
        } else {
          for (let i = 0; i < inputFormElems.length; i++) {
            const errorDiv = document.createElement("div");
            errorDiv.textContent = "Заполните поле!";
            errorDiv.style.cssText =
              "color: red; line-height: 0px; height: 15px; font-size: 15px;";
            if (
              inputFormElems[i].nextElementSibling &&
              inputFormElems[i].nextElementSibling.textContent ===
                "Заполните поле!"
            ) {
              return;
            }
            if (inputFormElems[i].value === "") {
              inputFormElems[i].insertAdjacentElement("afterend", errorDiv);
            }
          }
        }
      };

      const postData = (body) => {
        console.log(cartStore.getCartProducts());
        return fetch("http://sole-pizza.cxz.su/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...body,
            items: cartStore.getCartProducts().map((i) => ({
              product: `/api/products/${i.id}`,
              quantity: i.count,
            })),
          }),
        });
      };

      document.body.addEventListener("input", (event) => {
        event.preventDefault();
        validForm(event.target);
      });

      document.body.addEventListener("submit", (event) => {
        event.preventDefault();
        sendForm(event.target);
      });

      // оформить заказ

      const startOrder = () => {
        const myOrder = document.getElementById("myOrder");
        let orderIsOpen = false;
        document.addEventListener("click", (e) => {
          let target = e.target;
          if (target && target.classList.contains("cart__buyButton")) {
            myOrder.style.display = "flex";
            orderIsOpen = true;
          } else {
            // if (
            //   target.classList.contains('cart__form') ||
            //   target.localName === 'input' ||
            //   target === statusMessage
            // ) {
            //   return;
            // }
            if (target.classList.contains("modal__close")) {
              myOrder.style.display = "none";
              orderIsOpen = false;
            }
          }
        });
      };
      startOrder();

      cartIsOpen = !cartIsOpen;
    } else {
      cartBody.style.display = "none";
      cartIsOpen = !cartIsOpen;
    }
  };

  const handleRootClick = (e) => {
    if (
      e.target.closest("#cartBody") ||
      e.target.closest("#cartButton") ||
      e.target.closest(".cart__tableRow")
    )
      return;
    cartBody.style.display = "none";
    cartIsOpen = false;
  };

  cartButton.addEventListener("click", handleCartBodyClick);
  root.addEventListener("click", handleRootClick);
}

const div = document.querySelector("div");

console.log(div);
