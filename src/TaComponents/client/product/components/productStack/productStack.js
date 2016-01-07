import $ from "jquery";
import _ from "lodash";
import template from "./productStack.html";

/* @ngInject */
export default function productStack() {
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
    const select = $(element.find("select"));

    select.on("change", () => {
      scope.product.stack = _.map(select.select2("data"), "id");
      scope.$apply();
    });

    select.select2({
      placeholder: "Enter any number of product names",
      allowClear: true,
      theme: "bootstrap",
      minimumInputLength: 2,
      ajax: {
        url: "api/component-product/name-search",
        delay: 500,
        cache: true,
        processResults: function(data) {
          return {
            results: data
          };
        }
      }
    });
  }
}