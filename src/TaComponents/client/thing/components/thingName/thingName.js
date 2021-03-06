import angular from "angular";
import template from "./thingName.html";

export default function thingName(thingService) {
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

  function link(scope, element, attributes, form) {
    scope.form = form;
    const input = element.find("input");
    const ngModel = angular.element(input).controller("ngModel");

    ngModel.$asyncValidators.conflict = (modelValue, viewValue) => {
      var value = modelValue || viewValue;
      return thingService.isNameUnique(value, scope.thing._id);
    };
  }
}