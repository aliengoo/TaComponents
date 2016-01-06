export default class ProductController {
  /* @ngInject */
  constructor(productService, product, editable) {
    this.productService = productService;
    this.loading = false;
    this.product = product || {
        name: "test",
        staffRisk: "Low"
      };
    this.editable = editable;
  }

  save() {
    this.loading = true;


    if (this.editable) {


      this.productService.insert(this.product).then(() => {});

    }
  }
}