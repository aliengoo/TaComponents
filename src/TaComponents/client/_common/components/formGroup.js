import template from "./formGroup.html";

/* @ngInject */
export default function formGroup() {
  return {
    restrict: 'E',
    transclude: true,
    template
  };
}
