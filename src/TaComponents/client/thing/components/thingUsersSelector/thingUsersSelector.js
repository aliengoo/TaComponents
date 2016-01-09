import $ from "jquery";
import _ from "lodash";
import template from "./thingUsersSelector.html";

/* @ngInject */
export default function thingUsersSelector() {
  return {
    require: "^form",
    restrict: "E",
    scope: {
      ngModel: "=",
      editable: "=",
      ngForm: "@",
      label: "@",
      name: "@"
    },
    template
  };
}
