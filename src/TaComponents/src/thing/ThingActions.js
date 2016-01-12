"use strict";

import alt from "../alt";
import ThingApi from "./ThingApi";

class ThingActions {
  constructor() {
    this.thingApi = new ThingApi();
    this.getThen = this.getThen.bind(this);
    this.getError = this.getError.bind(this);
  }

  setField(field) {
    return field;
  }

  get(id) {
    return (dispatch) => {
      dispatch(id);
      return this.thingApi.get(id)
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