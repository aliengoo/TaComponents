import template from "./containerFluid.html";

export default function containerFluid() {
  return {
    restrict: "E",
    transclude: true,
    template
  };
}