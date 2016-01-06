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

  function link(scope, element) {
    const selectElement = $(element).find("select");
    // HACK: Select2
    $(selectElement).on("change", (event) => {
      scope.product.intendedStatus = _.first(_.map($(event.target).select2("data"), "id"));
      scope.$apply();
    });

    productService.getProductStatuses()
      .then(options => {
        options.unshift({id: "", text: ""});

        selectElement.select2({
          placeholder: "Select a status",
          tags: false,
          allowClear: true,
          theme: "bootstrap",
          data: options
        });
      })
      .finally(() => scope.loading = false);
  }
}
