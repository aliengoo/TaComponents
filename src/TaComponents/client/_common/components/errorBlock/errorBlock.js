import template from "./errorBlock.html";

/* @ngInject */
export default function errorBlock() {
    return {
    restrict: "E",
    transclude: true,
    scope: true,
    template
  };
}
