"use strict";

import alt from "../alt";
import HomeActions from "./HomeActions";

class HomeStore {

  constructor() {
    this.bindActions(HomeActions);

    this.state = {
      user: null,
      fetching: false,
      error: null
    };
  }

  onGet() {
    this.setState({
      fetching: true
    });
  }

  onGetThen(response) {
    this.setState({
      user: response.data,
      fetching: false
    });
  }

  onGetError(response) {
    this.setState({
      user: null,
      fetching: false,
      error: response
    });
  }

}

export default alt.createStore(HomeStore, "HomeStore");

