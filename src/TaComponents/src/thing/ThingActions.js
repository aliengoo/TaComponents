"use strict";

import alt from "../alt";
import ThingApi from "./ThingApi";
import validate, {valueMissing, tooShort} from "../_validation/validate";

class ThingActions {
  constructor() {
    this.thingApi = new ThingApi();

    const isThingNameUnique = (name) => {
      return this.thingApi.isThingNameUnique(name, this.id).then(unique => {
        return {
          nameInUse: !unique
        };
      });
    };

    this._validatorConfig = {
      name: [valueMissing(), tooShort(3), isThingNameUnique, {
        nameInUse: "The name specified is already in use",
        valueMissing: "Name is a required",
        tooShort: "Name is too short"
      }]
    };

    this.getThen = this.getThen.bind(this);
    this.getError = this.getError.bind(this);
    this.validateThen = this.validateThen.bind(this);
  }

  setValue(property, value) {
    return {property, value};
  }

  validate(thing, property, value) {
    return (dispatch) => {
      dispatch();
      return validate(thing, property, value, this._validatorConfig).then(this.validateThen);
    };
  }

  validateThen(validationResult) {
    return validationResult;
  }

  clearFetching() {
    return true;
  }

  get(id) {
    return (dispatch) => {
      dispatch(id);
      return this.thingApi
        .then(this.getThen)
        .catch(this.getError);
    };
  }

  getThen(response) {
    return response.data;
  }

  getError(response) {
    return response;
  }

  save(thing) {
    return (dispatch) => {
      dispatch();

      return this.thingApi.saveThing(thing)
        .then(this.saveThen)
        .catch(this.saveError)
    };
  }

  saveThen(response) {
    return response.data;
  }

  saveError(response) {
    return response;
  }
}

export default alt.createActions(ThingActions);