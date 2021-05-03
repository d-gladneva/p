class CategoryStore {
  constructor() {
    this.loadCategories();
  }
  _categories;

  loadCategories = () => {
    const url = `${ROUTES.host}/${ROUTES.models}/categories.json`;
    this._categories = fetch(url)
      .then((data) => data.json())
      .then((categories) => categories);
  };

  getCategories = () => {
    return this._categories;
  };
}
