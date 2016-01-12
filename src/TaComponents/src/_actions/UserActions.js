"use strict";

import _ from "lodash";
import alt from "../alt";
import axios from "axios";


class UserActions {

  constructor() {
    this.getAllUsersThen = this.getAllUsersThen.bind(this);
    this.getAllUsersError = this.getAllUsersError.bind(this);
  }

  getAllUsers() {
    return (dispatch) => {
      dispatch();
      return axios.get("api/user/all")
        .then(this.getAllUsersThen)
        .catch(this.getAllUsersError);
    }
  }

  getAllUsersThen(response) {
    return _.map(response.data, (user) => {
      return {
        value: user.samAccountName,
        label: `${user.firstName} ${user.lastName}`
      };
    });
  }

  getAllUsersError(response) {
    return response;
  }

}

export default alt.createActions(UserActions);
