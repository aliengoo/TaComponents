import $ from "jquery";
import _ from "lodash";
import template from "./thingUsersSelector.html";

/* @ngInject */
export default function thingUsersSelector() {
  return {
    link,
    require: "^form",
    restrict: "E",
    scope: {
      editable: "=",
      label: "@",
      name: "@",
      users: "=",
      required: "=?"
    },
    template,
    transclude: {
      messages: "?messages",
      help: "?help"
    }
  };

  function link(scope, element, attributes, form) {
    scope.required = angular.isDefined(scope.required) ? scope.required: false;
    scope.form = form;
  }
}
