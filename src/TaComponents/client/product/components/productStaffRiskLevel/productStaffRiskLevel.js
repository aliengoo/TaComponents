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
    const selectElement = $(element).find("select");

    var ngModel = angular.element(selectElement).controller("ngModel");

    scope.loading = true;

    productService.getRiskLevels()
      .then(options => {
        options.unshift({id: "", text: ""});
        selectElement.select2({
          placeholder: "Select a risk level",
          allowClear: true,
          theme: "bootstrap",
          tags: false,
          data: options
        });


        selectElement.on('change', function(event) {
          console.log('on change event');

          var val = _.first(_.map($(event.target).select2("data"), "id"));
            ngModel.$setViewValue(val);
        });

        ngModel.$render = function() {
          console.log("rendering");
          //if this is called, the model was changed outside of select, and we need to set the value
          //not sure what the select2 api is, but something like:
          selectElement.val("data", {id: ngModel.$viewValue, text: ngModel.$viewValue});
        };

        selectElement.val(scope.product.staffRisk).trigger("change");

      })
      .finally(() => scope.loading = false);
  }
}