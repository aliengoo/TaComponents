import template from "./container.html";

export default function container() {
  return {
    restrict: "E",
    transclude: true,
    template
  };
}