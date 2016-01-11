import angular from "angular";
import _ from "lodash";
import template from "./thingStatus.html";

/* @ngInject */
export default function thingStatus(thingService) {
  return {
    link,
    restrict: "E",
    scope: {
      required: "=?",
      status: "=",
      editable: "=",
      label: "@",
      name: "@"
    },
    require: "^form",
    template,
    transclude: {
      messages: "?messages",
      help: "?help"
    }
  };

  function link(scope, element, attributes, form) {
    scope.required = angular.isDefined(scope.required) ? scope.required : false;
    scope.form = form;
    scope.loading = true;
    scope.select2Data = [];
    scope.select2Options = {
      allowClear: true,
      placeholder: "Select the current status"
    };

    // used to get around isolated scoping.
    scope.setter = (value) => scope.status = value;

    thingService.getStatuses()
      .then(options => {
        scope.select2Data = options;
      })
      .finally(() => scope.loading = false);
  }
}
