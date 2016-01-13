"use strict";

import alt from "../alt";
import UserActions from "./UserActions";

class UserStore {
  constructor() {
    this.bindActions(UserActions);

    this.state = {
      fetching: false,
      users: [],
      error: null
    };
  }

  onGetAllUsers() {
    this.setState({
      fetching: true
    });
  }

  onGetAllUsersThen(users) {
    this.setState({
      fetching: false,
      users,
      error: null
    });
  }

  onGetAllUsersError(response) {
    this.setState({
      fetching: false,
      error: response
    });
  }

}

export default alt.createStore(UserStore);

