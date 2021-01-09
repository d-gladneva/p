class ProductStore {
  constructor() {
    this.loadProducts();
  }

  _products;

  loadProducts = () => {
    const url = `${ROUTES.host}/${ROUTES.models}/products.json`;
    this._products = fetch(url)
      .then((data) => data.json())
      .then((products) => products);
  };

  getProducts = (categoryId) => {
    if (!categoryId) return this._products;
    return this._products.then(({ head, list }) => {
      return {
        head,
        list: list.filter((product) => product.category.id === categoryId)
      };
    });
  };

  getProduct = (id) =>
    this._products.then(
      ({ head, list }) => list.filter((product) => product.id === id)[0]
    );
}
