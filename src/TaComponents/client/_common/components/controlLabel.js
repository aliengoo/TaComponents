import template from "./controlLabel.html";

/* @ngInject */
export default function controlLabel() {
  return {
    restrict: 'E',
    transclude: true,
    template
  };
}
