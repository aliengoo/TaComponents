"use strict";
import angular from "angular";

import Components from "../_common/components/Components";

import AccessDeniedController from "./AccessDeniedController";
import template from "./access-denied.html";

const MODULE_NAME = "accessDenied";

/* @ngInject */
function accessDeniedConfig($stateProvider) {
  $stateProvider.state(MODULE_NAME, {
    // no url, when an error occurs, maintain the current URL
    controller: AccessDeniedController,
    controllerAs: "accessDenied",
    template
  });
}


export default angular.module(MODULE_NAME, [
  "ui.router",
  Components.name
]).config(accessDeniedConfig);
