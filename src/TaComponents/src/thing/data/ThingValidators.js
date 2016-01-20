"use strict";

import _ from "lodash";
import Q from "q";
import {thingApi} from "./ThingApi";

/*
  Run these functions in the context of the model, e.g. validator.call(currentModel, valueBeingValidated)
*/

export function isThingNameUnique (name) {
  return thingApi.isThingNameUnique(name, this.id).then(unique => {
    return {
      nameInUse: !unique
    };
  });
}

export function primaryTechnicalTeamConflictWithSecondary(primaryTechnicalTeam) {
  return Q.resolve({
    primaryTechnicalTeamConflictWithSecondary: _.intersection(primaryTechnicalTeam, this.secondaryTechnicalTeam).length > 0
  });
}

export function secondaryTechnicalTeamConflictWithPrimary(secondaryTechnicalTeam) {
  return Q.resolve({
    secondaryTechnicalTeamConflictWithPrimary: _.intersection(secondaryTechnicalTeam, this.primaryTechnicalTeam).length > 0
  });
}