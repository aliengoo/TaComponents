"use strict";

import angular from "angular";

import Components from "../_common/components/Components";

import ErrorController from "./ErrorController";
import template from "./error.html";

const MODULE_NAME = "error";

/* @ngInject */
function errorConfig($stateProvider) {
  $stateProvider.state(MODULE_NAME, {
    // no url, when an error occurs, maintain the current URL
    controller: ErrorController,
    controllerAs: MODULE_NAME,
    template
  });
}

export default angular.module(MODULE_NAME, ["ui.router", Components.name])
  .config(errorConfig);
