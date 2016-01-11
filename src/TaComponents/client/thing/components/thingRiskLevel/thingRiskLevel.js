import $ from "jquery";
import _ from "lodash";
import template from "./thingRiskLevel.html";

/* @ngInject */
export default function thingRiskLevel(thingService) {
  return {
    link,
    require: "^form",
    restrict: "E",
    scope: {
      required: "=",
      ngModel: "=",
      editable: "=",
      label: "@",
      name: "@"
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

    const whenSuccessfulSetOptions = options => scope.select2Data = options;
    const endLoadingState = () => scope.loading = false;

    thingService.getRiskLevels()
      .then(whenSuccessfulSetOptions)
      .finally(endLoadingState);
  }
}