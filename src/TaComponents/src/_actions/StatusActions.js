"use strict";

import _ from "lodash";
import alt from "../alt";
import axios from "axios";

class StatusActions {
  get() {
    return (dispatch) => {
      dispatch();

      return axios.get(`api/status`)
        .then(this.getThen)
        .catch(this.getError);
    };
  }

  getThen(response) {
    // results are formatted for react-select
    return _.map(response.data, riske => {
      return {
        value: riske.id,
        label: riske.text
      };
    });
  }

  getError(response) {
    return response;
  }
}

export default alt.createActions(StatusActions);