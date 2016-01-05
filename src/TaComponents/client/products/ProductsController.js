export default class ProductsController {
  /* @ngInject */
  constructor(productsServices, filter) {
    this.productsServices = productsServices;
    this.loading = false;
    this.filter = filter;
    this.products = [];
  }

  filter() {
    this.loading = true;
    this.productsServices.filter();
  }
}