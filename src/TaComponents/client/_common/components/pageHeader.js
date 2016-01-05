import template from "./pageHeader.html";

export default function pageHeader() {
  return {
    restrict: "E",
    transclude: true,
    template
  };
}

