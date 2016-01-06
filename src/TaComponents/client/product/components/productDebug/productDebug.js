import template from "./productDebug.html";

export default function productDebug() {
  return {
    restrict: "E",
    scope: {
      product: "="
    },
    template
  };
}
