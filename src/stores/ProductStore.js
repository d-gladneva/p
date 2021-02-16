class ProductStore {
  constructor() {
    this.loadProducts();
  }

  _products;

  loadProducts = () => {
    const url = `http://sole-pizza.cxz.su/api/products`;
    this._products = fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((data) => data.json())
      .then((products) => ({
        head: {
          total: 4,
        },
        list: [...products],
      }))
      .catch((error) => {
        console.log(error);
      });
  };

  getProducts = (categoryId) => {
    if (!categoryId) return this._products;
    return this._products.then(({ head, list }) => {
      return {
        head,
        list: list.filter((product) => product.category.id === categoryId),
      };
    });
  };

  getProduct = (id) =>
    this._products.then(
      ({ head, list }) => list.filter((product) => product.id === id)[0]
    );
}
