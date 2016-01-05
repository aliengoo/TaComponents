import angular from "angular";

import Components from "../_common/components/Components";
import Constants from "../_common/constants/Constants";
import Services from "../_common/services/Services";

import ProductController from "./ProductController";
import ProductService from "./ProductService";

import productName from "./components/productName";
import productCompany from "./components/productCompany";
import productStaffRiskLevel from "./components/productStaffRiskLevel";

import template from "./product.html";

const MODULE_NAME = "product";

/* @ngInject */
function resolveProduct($state, $stateParams, $q, productService) {
  console.log($state);
  if ($stateParams.id) {
    return productService.get($stateParams.id);
  }

  return $q.when(undefined);
}

/* @ngInject */
function resolveEditableTrue($q) {
  return $q.when(true);
}

/* @ngInject */
function resolveEditableFalse($q) {
  return $q.when(false);
}

/* @ngInject */
function productConfig($stateProvider) {

  $stateProvider.state(`${MODULE_NAME}New`, {
    controller: ProductController,
    controllerAs: MODULE_NAME,
    url: `/${MODULE_NAME}/new`,
    template,
    resolve: {
      editable: resolveEditableTrue,
      product: resolveProduct
    }
  });

  $stateProvider.state(`${MODULE_NAME}Edit`, {
    controller: ProductController,
    controllerAs: MODULE_NAME,
    url: `/${MODULE_NAME}/:id/edit`,
    template,
    resolve: {
      editable: resolveEditableTrue,
      product: resolveProduct
    }
  });

  $stateProvider.state(`${MODULE_NAME}View`, {
    controller: ProductController,
    controllerAs: MODULE_NAME,
    template,
    url: `/${MODULE_NAME}/:id/view`,
    resolve: {
      editable: resolveEditableFalse,
      product: resolveProduct
    }
  });
}

export default angular.module(MODULE_NAME, [
  "ui.router",
  "ngAnimate",
  "ngMessages",

  Components.name,
  Constants.name,
  Services.name
]).service("productService", ProductService)
  .directive("productName", productName)
  .directive("productCompany", productCompany)
  .directive("productStaffRiskLevel", productStaffRiskLevel)
  .config(productConfig);


