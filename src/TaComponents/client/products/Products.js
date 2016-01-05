import angular from "angular";

import Components from "../_common/components/Components";
import Constants from "../_common/constants/Constants";
import Services from "../_common/services/Services";

import ProductsController from "./ProductsController";
import ProductsService from "./ProductsService";
import template from "./products.html";

const MODULE_NAME = "products";

/* @ngInject */
function resolveFilter(productsService) {
  return productsService.getFilter();
}

/* @ngInject */
function productsConfig($stateProvider) {
  $stateProvider.state(MODULE_NAME, {
    controller: ProductsController,
    controllerAs: MODULE_NAME,
    url: `/${MODULE_NAME}`,
    resolve: {
      filter: resolveFilter
    },
    template
  });
}

export default angular.module(MODULE_NAME, [
  "ui.router",
  "ngAnimate",
  "ngMessages",

  Components.name,
  Constants.name,
  Services.name
]).service("productsService", ProductsService)
  .config(productsConfig);


