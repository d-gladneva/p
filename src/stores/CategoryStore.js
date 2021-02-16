class CategoryStore {
  constructor() {
    this.loadCategories();
  }
  _categories;

  loadCategories = () => {
    const url = `http://sole-pizza.cxz.su/api/categories`;
    this._categories = fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((data) => data.json())
      .then((categories) => ({
        head: {
          total: 4,
        },
        list: [...categories],
      }))
      .catch((error) => {
        console.warn(error);
      });
  };

  getCategories = () => {
    return this._categories;
  };
}
