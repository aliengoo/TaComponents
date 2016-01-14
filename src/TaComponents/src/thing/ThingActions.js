"use strict";

import axios from "axios";
import alt from "../alt";

class ThingActions {
  constructor() {
    this.getThen = this.getThen.bind(this);
    this.getError = this.getError.bind(this);
    this.isNameUniqueError = this.isNameUniqueError.bind(this);
    this.isNameUniqueThen = this.isNameUniqueThen.bind(this);
  }

  setField(field) {
    return field;
  }

  setEditable(editable) {
    return editable;
  }

  clearFetching() {
    return true;
  }

  isNameUnique(name, id) {
    return (dispatch) => {
      dispatch();
      return axios.get(`api/thing/is-name-unique`, {
        params: {
          name,
          id
        }
      }).then(this.isNameUniqueThen)
        .catch(this.isNameUniqueError);
    };
  }

  clearIsNameUnique() {
    return true;
  }

  isNameUniqueThen(response) {
    if (response.status === 409) {
      return false;
    }
    return true;
  }

  isNameUniqueError(response) {
    return response;
  }

  get(id) {
    return (dispatch) => {
      dispatch(id);
      return axios.get(`api/thing/${id}`)
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

      var promise;

      if(thing.id) {
        promise = axios.put(`api/thing/${thing.id}`, thing);
      } else {
        promise = axios.post(`api/thing`, thing);
      }

      return promise
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