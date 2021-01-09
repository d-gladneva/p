class BannerStore {
  _banners = [];

  getBanners = () => {
    return this._banners;
  };
  setBanners = (banners) => {
    this._banners = banners;
  };
}
