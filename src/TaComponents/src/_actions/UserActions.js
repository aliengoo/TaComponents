"use strict";

import _ from "lodash";
import alt from "../alt";
import axios from "axios";
import UserApi from "../_api/UserApi";

class UserActions {

  constructor() {
    this.userApi = new UserApi();
    this.getAllUsersThen = this.getAllUsersThen.bind(this);
    this.getAllUsersError = this.getAllUsersError.bind(this);
  }

  getAllUsers() {
    return (dispatch) => {
      dispatch();
      return this.userApi.getAll()
        .then(this.getAllUsersThen)
        .catch(this.getAllUsersError);
    }
  }

  getAllUsersThen(users) {
    return users;
  }

  getAllUsersError(response) {
    return response;
  }
}

export default alt.createActions(UserActions);
