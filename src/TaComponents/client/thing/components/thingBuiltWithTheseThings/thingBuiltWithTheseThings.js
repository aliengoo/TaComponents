import $ from "jquery";
import _ from "lodash";
import template from "./thingBuiltWithTheseThings.html";

/* @ngInject */
export default function thingBuiltWithTheseThings(thingService) {
  return {
    link,
    require: "^form",
    restrict: "E",
    scope: {
      thing: "=",
      editable: "="
    },
    template
  };
  function link(scope, element, attributes, controllers) {
    const select = $(element).find("select");
    let ngModel = controllers[1];

    select.select2({
      placeholder: "Select your stack",
      allowClear: true,
      theme: "bootstrap",
      minimumInputLength: 2,
      ajax: {
        url: "api/thing/name-search",
        delay: 500,
        cache: true,
        processResults: function(data) {
          return {
            results: data
          };
        }
      }
    });

    scope.$watchCollection("ngModel", (newValue) => {
      select.val(newValue).trigger("change");
    });

    select.on("change", () => {
      let val;
      const data = select.select2("data");

      val = _.map(data, "id");

      if (_.isArray(val)) {
        ngModel.$setViewValue(val);
      }
    });

    scope.loading = true;
  }
}