"use strict";

import alt from "../alt";
import StatusApi from "../_api/StatusApi";

class StatusActions {
  constructor() {
    this.statusApi = new StatusApi();
    this.getStatusesThen = this.getStatusesThen.bind(this);
    this.getStatusesError = this.getStatusesError.bind(this);
  }
  getStatuses() {
    return (dispatch) => {
      dispatch();
      return this.statusApi.get()
        .then(this.getStatusesThen)
        .catch(this.getStatusesError);
    };
  }

  getStatusesThen(statuses) {
    return statuses;
  }

  getStatusesError(response) {
    return response;
  }
}

export default alt.createActions(StatusActions);