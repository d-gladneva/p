/** Типизация массива с продуктами
IProduct: {
  id: number,
  title: string,
  image: string
  price: number,
  count: number,
}
_productList: IProduct[]
*/

class CartStore {
  constructor(productList = []) {
    this._productList = productList;
  }
  _sum = 0;
  _totalCount = 0;

  calculateProductSum = (price, count) => {
    return String(Number(price) * Number(count));
  };

  getCartSum = () => {
    return this._sum || 0;
  };

  setCartSum = (sum) => {
    this._sum = sum;
  };

  getCartTotalCount = () => {
    return this._totalCount;
  };

  setCartTotalCount = (totalCount) => {
    this._totalCount = totalCount;
  };

  calculateCartSum = () => {
    this.setCartSum(
      this._productList.reduce(
        (sum, target) => sum + target.price * target.count,
        0
      )
    );
  };

  calculateCartTotalCount = () => {
    this.setCartTotalCount(
      this._productList.reduce((total, target) => total + target.count, 0)
    );
  };

  getCartProduct = (id) => {
    return this._productList.filter((product) => product.id === id)[0];
  };

  getCartProducts = (size) => {
    if (!size) return this._productList;

    let products = [];
    for (let i = 0; i < Math.ceil(this._productList.length / size); i++) {
      products[i] = this._productList.slice(i * size, i * size + size);
    }
    return products;
  };

  addCartProduct = (product) => {
    this._productList.push(product);
    this.calculateCartSum();
    this.calculateCartTotalCount();
    /** Записать в cookie новый _productList */
  };

  deleteCartProduct = (id) => {
    this._productList.splice(
      this._productList.findIndex((product) => product.id === id),
      1
    );
    this.calculateCartSum();
    this.calculateCartTotalCount();
    /** Записать в cookie новый _productList */
  };

  updateCartProduct = (id, newProductDate) => {
    const index = this._productList.findIndex((product) => product.id === id);
    this._productList.splice(index, 1, {
      ...this._productList[index],
      ...newProductDate,
    });
    this.calculateCartSum();
    this.calculateCartTotalCount();
    /** Записать в cookie новый _productList */
  };

  checkProduct = (id) => {
    return this._productList.findIndex((product) => product.id === id) !== -1;
  };
}
