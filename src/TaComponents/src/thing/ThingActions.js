"use strict";

import alt from "../alt";
import ThingApi from "./ThingApi";
import validate, {valueMissing, tooShort} from "../_validation/validate";

function isThingNameUnique(api, name, id) {
  return thingApi.isThingNameUnique(name, id);
}

class ThingActions {
  constructor() {
    this.thingApi = new ThingApi();

    const ValidatorConfig = {
      name: [valueMissing(), tooShort(3), (data) => {
        return this.thingApi.isThingNameUnique(data.name, data.id).then(unique => {
          return {
            nameInUse: !unique,
            valid: unique
          };
        });
      }, {
        nameInUse: "The name specified is already in use",
        valueMissing: "Name is a required",
        tooShort: ""
      }]
    };

    this.getThen = this.getThen.bind(this);
    this.getError = this.getError.bind(this);
  }

  setValue(keyValuePair) {
    return keyValuePair;
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