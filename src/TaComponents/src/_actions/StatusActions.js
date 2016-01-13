"use strict";

import _ from "lodash";
import alt from "../alt";
import axios from "axios";

class StatusActions {
  getStatuses() {
    return (dispatch) => {
      dispatch();

      return axios.get(`api/status`)
        .then(this.getStatusesThen)
        .catch(this.getStatusesError);
    };
  }

  getStatusesThen(response) {
    // results are formatted for react-select
    return _.map(response.data, riske => {
      return {
        value: riske.id,
        label: riske.text
      };
    });
  }

  getStatusesError(response) {
    return response;
  }
}

export default alt.createActions(StatusActions);