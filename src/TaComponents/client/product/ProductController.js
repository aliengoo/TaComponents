export default class ProductController {
  /* @ngInject */
  constructor(productService, product, editable) {
    this.productService = productService;
    this.loading = false;
    this.product = Object.assign(product, {
      teamMembers: ["rharris", "hsimpson"]
    });
    this.editable = editable;
  }
}