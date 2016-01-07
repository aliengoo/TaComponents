import _ from "lodash";
import template from "./productIntendedStatus.html";

export default function productIntendedStatus(productService) {
  return {
    link,
    restrict: "E",
    scope: {
      product: "=",
      editable: "="
    },
    require: "^form",
    template
  };

  function link(scope) {
    scope.select2Data = [];
    scope.select2Options = {
      allowClear: true,
      placeholder: "Select the intended status"
    };

    productService.getProductStatuses()
      .then(options => {
        scope.select2Data = options;
      })
      .finally(() => scope.loading = false);
  }
}
