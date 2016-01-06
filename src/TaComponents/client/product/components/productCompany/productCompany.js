import template from "./productCompany.html";

export default function productCompany() {
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