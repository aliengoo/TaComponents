import template from "./productInformation.html";

export default function productInformation() {
  return {
    require: "^form",
    restrict: "E",
    scope: {
      product: "=",
      editable: "="
    },
    template
  };
}