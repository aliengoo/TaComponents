import $ from "jquery";
import _ from "lodash";
import template from "./productStaffRiskLevel.html";

/* @ngInject */
export default function productTeamMembers(productService) {
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
    const selectElement = $(element.find("select"));
    // HACK: Select2
    $(selectElement).on("change", () => {
      scope.$apply();
    });

    scope.loading = true;

    productService.getRiskLevels()
      .then(riskLevels => {
        scope.riskLevels = riskLevels;
        selectElement.select2({
          placeholder: "Select a risk level",
          allowClear: true,
          theme: "bootstrap"
        });
      })
      .finally(() => scope.loading = false);
  }
}