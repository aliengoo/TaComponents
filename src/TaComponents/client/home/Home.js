import angular from "angular";
import "angular-ui-router";
import "angular-animate";
import "angular-messages";
import HomeController from "./HomeController";
import Services from "../_common/services/Services";
import Constants from "../_common/constants/Constants";

import template from "./home.html";

const MODULE_NAME = "home";

/* @ngInject */
function homeConfig($stateProvider) {
  $stateProvider.state(MODULE_NAME, {
    auth: true,
    controller: HomeController,
    controllerAs: MODULE_NAME,
    template,
    url: `/${MODULE_NAME}`
  });
}

export default angular.module(MODULE_NAME, [
  // vendor modules
  "ui.router",
  "ngAnimate",
  "ngMessages",
  "toastr",
  "LocalStorageModule",

  // application dependencies
  Constants.name,
  Services.name
]).config(homeConfig);
