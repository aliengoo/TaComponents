export default class ProductController {
  /* @ngInject */
  constructor(productService, product, editable) {
    this.productService = productService;
    this.loading = false;
    this.product = product;
    this.editable = editable;
  }
}