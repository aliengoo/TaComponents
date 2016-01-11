import template from "./thingPrimaryTechnicalTeam.html";

/* @ngInject */
export default function thingPrimaryTechnicalTeam() {
  return {
    link,
    restrict: "E",
    required: "^form",
    scope: {
      thing: "=",
      editable: "="
    },
    template
  };

  function link(scope, element, attributes, form) {
    scope.form = form;
    //scope.showHelp = () => form.thingPrimaryTechnicalTeam.$valid || form.thingPrimaryTechnicalTeam.$pristine;
  }
}