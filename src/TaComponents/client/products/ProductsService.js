const PRODUCTS_FILTER_KEY = "products-filter";

export default class ProductsServices {
  constructor($http, $log, storageService) {
    this.$http = $http;
    this.$log = $log;
    this.storageService = storageService;
  }
  
  filter(filter) {
    return this.$http.get(`api/product/${id}`);
  }

  getFilter() {
    return this.storageService.get(PRODUCTS_FILTER_KEY);
  }

  saveFilter(filter) {
    return this.storageService.set(PRODUCTS_FILTER_KEY, filter);
  }
}