import $ from "jquery";
import _ from "lodash";
import template from "./productTeamMembers.html";

/* @ngInject */
export default function productTeamMembers() {
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