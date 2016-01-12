"use strict";

import alt from "../alt";
import HomeApi from "./HomeApi";

class HomeActions {
  constructor() {
    this.homeApi = new HomeApi();
    this.getThen = this.getThen.bind(this);
    this.getError = this.getError.bind(this);
  }

  get() {
    return (dispatch) => {
      dispatch();
      return this.homeApi.get()
        .then(this.getThen)
        .catch(this.getError);
    };
  }

  getThen(user) {
    return user;
  }

  getError(response) {
    return response;
  }
}

export default alt.createActions(HomeActions);