import $ from "jquery";
import _ from "lodash";
import template from "./productBusinessOwners.html";

/* @ngInject */
export default function productBusinessOwners() {
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