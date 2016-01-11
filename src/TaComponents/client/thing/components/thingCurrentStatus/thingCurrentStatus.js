import template from "./thingCurrentStatus.html";
/* @ngInject */
export default function thingCurrentStatus() {
  return {
    link,
    restrict: "E",
    require: "^form",
    scope: {
      thing: "=",
      editable: "="
    },
    template
  };

  function link(scope, element, attributes, form) {
    scope.form = form;
  }
}