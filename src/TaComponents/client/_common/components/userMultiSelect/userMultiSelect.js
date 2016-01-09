import _ from 'lodash';
import template from "./userMultiSelect.html";

/* @ngInject */
export default function userMultiSelect($interpolate, userService) {
  return {
    link,
    require: ["^form", "ngModel"],
    restrict: "E",
    scope: {
      name: "@",
      required: "=",
      ngModel: "="
    },
    template
  };

  function link(scope, element, attributes, controllers) {
    const select = $(element).find("select");
    let ngModel = controllers[1];

    userService.getUsersForSelect().then((options) => {
      select.select2({
        placeholder: "Enter team members",
        allowClear: true,
        theme: "bootstrap",
        data: options
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

    }).finally(() => scope.loading = false);

    scope.loading = true;
  }
};
