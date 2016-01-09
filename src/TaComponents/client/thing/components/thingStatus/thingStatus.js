import _ from "lodash";
import template from "./thingStatus.html";

export default function thingCurrentStatus(thingService) {
  return {
    link,
    restrict: "E",
    scope: {
      ngModel: "=",
      editable: "=",
      ngForm: "@",
      label: "@",
      name: "@"
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

    thingService.getProductStatuses()
      .then(options => {
        scope.select2Data = options;
      })
      .finally(() => scope.loading = false);
  }
}
