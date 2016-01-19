"use strict";

import alt from "../alt";
import ThingApi from "./ThingApi";
import ShadowModel from "../_validation/ShadowModel";
import validate, {valueMissing, tooShort} from "../_validation/validate";

class ThingActions {
  constructor() {
    this._thingApi = new ThingApi();
    this._shadowModel = new ShadowModel();

    const isThingNameUnique = (name) => {
      return this._thingApi.isThingNameUnique(name, this.id).then(unique => {
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
    this.evaluateValueThen = this.evaluateValueThen.bind(this);
  }

  setValue(property, value) {
    return this._shadowModel.setModel(property, value);
  }

  evaluateValue(property, value) {
    return (dispatch) => {
      dispatch();
      return this._shadowModel
        .evaluate(property, value, this._validatorConfig)
        .then(this.evaluateValueThen)
        .catch(this.evaluateValueError);
    };
  }

  evaluateValueThen(shadowModelJS) {
    return shadowModelJS;
  }

  evaluateValueError(error) {
    return error;
  }

  clearFetching() {
    return true;
  }

  get(id) {
    return (dispatch) => {
      dispatch(id);
      return this._thingApi
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

      return this._thingApi.saveThing(thing)
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