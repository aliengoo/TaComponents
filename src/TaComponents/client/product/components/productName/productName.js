import angular from "angular";
import template from "./productName.html";

export default function productName(productService) {
  return {
    link,
    require: "^form",
    restrict: "E",
    scope: {
      product: "=",
      editable: "="
    },
    template
  };

  function link(scope, element) {
    var input = element.find("input");
    var ngModel = angular.element(input).controller("ngModel");

    ngModel.$asyncValidators.conflict = (modelValue, viewValue) => {
      var value = modelValue || viewValue;
      return productService.isNameUnique(value, scope.product._id);
    };
  }
}