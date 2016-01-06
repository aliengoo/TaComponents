import template from "./productHeader.html";

export default function productHeader() {
  return {
    link,
    restrict: "E",
    scope: {
      product: "=",
      editable: "="
    },
    template
  };

  function link(scope, element, attributes) {

  }
}

