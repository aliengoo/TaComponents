import template from "./productName.html";

export default function productName() {
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