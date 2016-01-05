import template from "./registrationPasswordInput.html";

export default function registrationPasswordInput() {
  return {
    restrict: 'E',
    scope: {
      credentials: '='
    },
    template
  };
}
