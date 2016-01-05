// vendor dependencies
import angular from "angular";
import "angular-ui-router";

// application dependencies
import Components from "../_common/components/Components";
import Constants from "../_common/constants/Constants";
import Services from  "../_common/services/Services";

// module dependencies
import AboutController from "./AboutController";
import template from "./about.html";

const MODULE_NAME = "about";

/* @ngInject */
function aboutConfig($stateProvider) {
  $stateProvider.state(MODULE_NAME, {
    controller: AboutController,
    controllerAs: MODULE_NAME,
    template,
    url: `/${MODULE_NAME}`
  });
}

export default angular.module(MODULE_NAME, [
  // vendor modules
  "ui.router",

  // app modules
  Components.name,
  Constants.name,
  Services.name
]).config(aboutConfig);