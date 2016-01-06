import angular from "angular";

import Components from "../_common/components/Components";
import Constants from "../_common/constants/Constants";
import Services from "../_common/services/Services";

import template from "./users.html";
import UsersController from "./UsersController";

const MODULE_NAME = "Users";

/* @ngInject */
function usersConfig($stateProvider) {
  $stateProvider.state(MODULE_NAME, {
    url: "/users",
    controller: UsersController,
    controllerAs: MODULE_NAME,
    template
  });
}

export default angular.module(MODULE_NAME, [
  //vendor modules
  "ui.router",
  // app modules
  Components.name,
  Constants.name,
  Services.name
]).config(usersConfig);
