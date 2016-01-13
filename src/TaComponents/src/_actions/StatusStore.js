"use strict";

import alt from "../alt";
import StatusActions from "./StatusActions";

class StatusStore {
  constructor() {
    this.bindActions(StatusActions);

    this.state = {
      fetching: false,
      statuses: [],
      error: null
    };
  }

  onGet() {
    this.setState({
      fetching: true
    });
  }

  onGetThen(statuses) {
    this.setState({
      fetching: false,
      statuses,
      error: null
    });
  }

  onGetError(response) {
    this.setState({
      fetching: false,
      error: response
    });
  }

}

export default alt.createStore(StatusStore);

