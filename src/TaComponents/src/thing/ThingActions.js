"use strict";

import alt from "../alt";
import ThingApi from "./ThingApi";

class ThingActions {
  constructor() {
    this.thingApi = new ThingApi();
    this.getThen = this.getThen.bind(this);
    this.getError = this.getError.bind(this);
    this.setFieldThen = this.setFieldThen.bind(this);
    this.setFieldError = this.setFieldError.bind(this);
  }

  setField(field) {
    return (dispatch) => {
      dispatch();

      return field.validate()
        .then(this.setFieldThen)
        .catch(this.setFieldError);
    };
  }

  setFieldThen(field) {
    return field;
  }

  setFieldError(error) {
    return error;
  }

  setEditable(editable) {
    return editable;
  }

  clearFetching() {
    return true;
  }

  clearIsNameUnique() {
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