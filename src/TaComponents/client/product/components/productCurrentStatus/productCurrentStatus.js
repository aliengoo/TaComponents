import _ from "lodash";
import template from "./productCurrentStatus.html";

export default function productCurrentStatus(productService) {
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
    scope.loading = true;
    scope.select2Data = [];
    scope.select2Options = {
      allowClear: true,
      placeholder: "Select the current status"
    };

    productService.getProductStatuses()
      .then(options => {
        scope.select2Data = options;
      })
      .finally(() => scope.loading = false);
  }
}
