import template from './navbarHeader.html';

export default function navbarHeader() {
  return {
    restrict: "E",
    transclude: true,
    template
  };
}

