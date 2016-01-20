"use strict";

import Q from "q";
import _ from "lodash";
import alt from "../../alt";
import {thingApi} from "./ThingApi";
import ThingModel from "./ThingModel";

class ThingActions {
  constructor() {
    this._thingModel = new ThingModel();

    this.getThen = this.getThen.bind(this);
    this.getError = this.getError.bind(this);
    this.evaluateValueThen = this.evaluateValueThen.bind(this);
  }

  setValue(property, value) {
    // return the model, unformatted
    return this._thingModel.setModel(property, value);
  }

  evaluateAll() {
    return (dispatch) => {
      dispatch();
      return this._thingModel
        .evaluateAll()
        .then(this.evaluateAllThen)
        .catch(this.evaluateAllError);
    };
  }

  evaluateAllThen(shadowModel) {
    return shadowModel;
  }

  evaluateAllError(error) {
    return error;
  }

  evaluateValue(property, value) {
    return (dispatch) => {
      dispatch();
      return this._thingModel
        .evaluate(property, value)
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
      return thingApi
        .then(this.getThen)
        .catch(this.getError);
    };
  }

  getFormattedModel() {
    return this._thingModel.getFormattedModel();
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

      return thingApi.saveThing(thing)
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