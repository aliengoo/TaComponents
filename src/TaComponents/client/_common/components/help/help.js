import template from "./help.html";

export default function help() {
  return {
    compile: (element, attributes) => {
      if (!attributes.ngShow) {
        attributes.ngShow = true;
      }
    },
    restrict: "E",
    scope: {
      ngShow: "="
    },
    template,
    transclude: true
  };
}