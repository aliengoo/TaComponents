export default function thingIntendedStatus() {
  return {
    link,
    restrict: "E",
    require: "^form",
    scope: {
      thing: "=",
      editable: "="
    }
  };

  function link(scope, element, attributes, form) {
    scope.form = form;
    scope.required = true;
  }
}