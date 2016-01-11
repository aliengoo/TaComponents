import angular from "angular";

import Components from "../_common/components/Components";
import Constants from "../_common/constants/Constants";
import Services from "../_common/services/Services";

import ThingController from "./controllers/ThingController";
import ThingService from "./services/ThingService";

// components - directives
import thingName from "./components/thingName/thingName";
import thingStatus from "./components/thingStatus/thingStatus";
import thingCurrentStatus from "./components/thingCurrentStatus/thingCurrentStatus";
import thingPrimaryTechnicalTeam from "./components/thingPrimaryTechnicalTeam/thingPrimaryTechnicalTeam";
import thingUsersSelector from "./components/thingUsersSelector/thingUsersSelector";

import template from "./thing.html";

const MODULE_NAME = "thing";

/* @ngInject */
function resolveThing($stateParams, $q, thingService) {
  if ($stateParams.id) {
    return thingService.get($stateParams.id);
  }

  // when no id is provided, assume this is a new thing
  return $q.when({});
}

/* @ngInject */
function resolveEditableTrue($q) {
  return $q.when(true);
}

/* @ngInject */
function resolveEditableFalse($q) {
  return $q.when(false);
}

/* @ngInject */
function thingConfig($stateProvider) {
  $stateProvider.state(`${MODULE_NAME}New`, {
    controller: ThingController,
    controllerAs: MODULE_NAME,
    url: `/${MODULE_NAME}/new`,
    template,
    resolve: {
      editable: resolveEditableTrue,
      thing: resolveThing
    }
  });

  $stateProvider.state(`${MODULE_NAME}Edit`, {
    controller: ThingController,
    controllerAs: MODULE_NAME,
    url: `/${MODULE_NAME}/:id/edit`,
    template,
    resolve: {
      editable: resolveEditableTrue,
      thing: resolveThing
    }
  });

  $stateProvider.state(`${MODULE_NAME}View`, {
    controller: ThingController,
    controllerAs: MODULE_NAME,
    template,
    url: `/${MODULE_NAME}/:id/view`,
    resolve: {
      editable: resolveEditableFalse,
      thing: resolveThing
    }
  });
}

export default angular.module(MODULE_NAME, [
  "ui.router",
  "ngAnimate",
  "ngMessages",
  "ngSanitize",

  Components.name,
  Constants.name,
  Services.name
]).service("thingService", ThingService)
  .directive("thingName", thingName)
  .directive("thingStatus", thingStatus)
  .directive("thingCurrentStatus", thingCurrentStatus)
  .directive("thingUsersSelector", thingUsersSelector)
  .directive("thingPrimaryTechnicalTeam", thingPrimaryTechnicalTeam)
  .config(thingConfig);


