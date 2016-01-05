import template from "./productStaffRiskLevel.html";

/* @ngInject */
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

  function link(scope) {
    scope.loading = true;
    productService.getRiskLevels()
      .then(riskLevels => scope.riskLevels = riskLevels)
      .finally(() => scope.loading = false);
  }
}