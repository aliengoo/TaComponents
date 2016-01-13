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

  isNameUnique(name) {
    return (dispatch) => {
      dispatch();
      return axios.get(`api/thing/is-name-unique`, {
        params: {
          name
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
}

export default alt.createActions(ThingActions);