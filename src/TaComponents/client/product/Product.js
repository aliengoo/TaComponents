import angular from "angular";

import Components from "../_common/components/Components";
import Constants from "../_common/constants/Constants";
import Services from "../_common/services/Services";

import ProductController from "./ProductController";
import ProductService from "./ProductService";

import productName from "./components/productName/productName";
import productCompany from "./components/productCompany/productCompany";
import productStaffRiskLevel from "./components/productStaffRiskLevel/productStaffRiskLevel";
import productInformation from "./components/productInformation/productInformation";
import productParentProduct from "./components/productParentProduct/productParentProduct";
import productTeamMembers from "./components/productTeamMembers/productTeamMembers";
import productBusinessOwners from "./components/productBusinessOwners/productBusinessOwners";
import productCurrentStatus from "./components/productCurrentStatus/productCurrentStatus";
import productIntendedStatus from "./components/productIntendedStatus/productIntendedStatus";
import productHeader from "./components/productHeader/productHeader";
import productDebug from "./components/productDebug/productDebug";

import template from "./product.html";

const MODULE_NAME = "product";

/* @ngInject */
function resolveProduct($state, $stateParams, $q, productService) {
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
  "ngSanitize",

  Components.name,
  Constants.name,
  Services.name
]).service("productService", ProductService)
  .directive("productName", productName)
  .directive("productCompany", productCompany)
  .directive("productStaffRiskLevel", productStaffRiskLevel)
  .directive("productInformation", productInformation)
  .directive("productParentProduct", productParentProduct)
  .directive("productDebug", productDebug)
  .directive("productHeader", productHeader)
  .directive("productIntendedStatus", productIntendedStatus)
  .directive("productCurrentStatus", productCurrentStatus)
  .directive("productBusinessOwners", productBusinessOwners)
  .directive("productTeamMembers", productTeamMembers)
  .config(productConfig);


