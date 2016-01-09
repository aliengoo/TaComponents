import template from "./thingHeader.html";

export default function thingHeader() {
  return {
    restrict: "E",
    scope: {
      thing: "=",
      editable: "="
    },
    template
  };
}

