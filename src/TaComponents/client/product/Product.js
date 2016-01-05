import angular from "angular";

import Components from "../_common/components/Components";
import Constants from "../_common/constants/Constants";
import Services from "../_common/services/Services";

import ProductController from "./ProductController";
import ProductService from "./ProductService";
import template from "./product.html";

const MODULE_NAME = "product";

/* @ngInject */
function resolveProduct($stateParams, productService) {
  return productService.get($stateParams.id);
}

/* @ngInject */
function productConfig($stateProvider) {
  $stateProvider.state(MODULE_NAME, {
    controller: ProductController,
    controllerAs: MODULE_NAME,
    url: `/${MODULE_NAME}`,
    template
  });

  $stateProvider.state(MODULE_NAME, {
    controller: ProductController,
    controllerAs: MODULE_NAME,
    url: `/${MODULE_NAME}/:id`,
    resolve: {
      product: resolveProduct
    },
    template
  });
}

export default angular.module(MODULE_NAME, [
  "ui.router",
  "ngAnimate",
  "ngMessage",

  Components.name,
  Constants.name,
  Services.name
]).service("productService", ProductService)
  .config(productConfig);


