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

  function link(scope) {
    scope.select2Data = [];

    scope.select2Options = {
      allowClear: true,
      placeholder: "Select a risk level"
    };

    scope.loading = true;

    productService.getRiskLevels()
      .then(options => {
        scope.select2Data = options;
      })
      .finally(() => scope.loading = false);
  }
}