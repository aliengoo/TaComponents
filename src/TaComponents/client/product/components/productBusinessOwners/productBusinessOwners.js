import $ from "jquery";
import _ from "lodash";
import template from "./productBusinessOwners.html";

/* @ngInject */
export default function productBusinessOwners(userService) {
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
    const selectElement = $(element).find("select");

    $(selectElement).on("change", () => {
      scope.product.teamMembers = _.map($(selectElement).select2("data"), "id");
      scope.$apply();
    });

    scope.loading = true;

    userService.getUsersForSelect().then((options) => {
      selectElement.select2({
        placeholder: "Enter business owners",
        allowClear: true,
        theme: "bootstrap",
        data: options
      });
    }).finally(() => scope.loading = false);
  }
}