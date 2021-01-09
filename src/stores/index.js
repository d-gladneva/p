const productStore = new ProductStore();
const bannerStore = new BannerStore();
const categoryStore = new CategoryStore();
const cartStore = new CartStore();

let renderProduct = undefined;
const renderProductInstance = (func) => {
  renderProduct = func;
};
