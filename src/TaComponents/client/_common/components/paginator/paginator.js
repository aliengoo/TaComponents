"use strict";

import template from "./paginator.html";

/* @ngInject */
export default function paginator() {

  return {
    link,
    restrict: "E",
    template
  };

  function link(scope, element, attributes) {

  }
}