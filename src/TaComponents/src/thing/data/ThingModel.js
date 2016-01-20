"use strict";

import _ from "lodash";
import ShadowModel from "../../_models/ShadowModel";
import {thingApi} from "./ThingApi";
import {valueMissing, tooShort} from "../../_validation/validators";
import {
  isThingNameUnique,
  primaryTechnicalTeamConflictWithSecondary,
  secondaryTechnicalTeamConflictWithPrimary} from "./ThingValidators";

const InitialThingModel = {
  name: undefined,
  description: undefined,
  currentStatusId: undefined,
  intendedStatusId: undefined,
  statusDescription: undefined,
  primaryTechnicalTeam: undefined,
  secondaryTechnicalTeam: undefined,
  technicalTeamDescription: undefined
};

const validationConfig = {
  name: [valueMissing(), tooShort(3), isThingNameUnique, {
    valueMissing: "This thing must have a name",
    tooShort: "This name is too short",
    isThingNameUnique: "The name of this thing is already in use"
  }],
  description: [],
  currentStatusId: [],
  intendedStatusId: [],
  statusDescription: [],
  primaryTechnicalTeam: [primaryTechnicalTeamConflictWithSecondary, {
    primaryTechnicalTeamConflictWithSecondary: "A member of the primary technical team is also a secondary team member"
  }],
  secondaryTechnicalTeam: [secondaryTechnicalTeamConflictWithPrimary, {
    secondaryTechnicalTeamConflictWithPrimary: "A member of the secondary technical team is also a primary team member"
  }],
  technicalTeamDescription: []
};

const parserConfig = {
  name: function (value) {
    // inert
    return value;
  }
};

const formatterConfig = {
  name: function (value) {
    // inert
    return value;
  }
};

export default class ThingModel extends ShadowModel {
  constructor() {
    super(InitialThingModel, validationConfig, parserConfig, formatterConfig);
  }
}
