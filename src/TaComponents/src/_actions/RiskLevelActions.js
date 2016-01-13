"use strict";

import _ from "lodash";
import alt from "../alt";
import axios from "axios";

class RiskLevelActions {
  constructor() {
    this.getThen = this.getThen.bind(this);
    this.getError = this.getError.bind(this);
  }
  get() {
    return (dispatch) => {
      dispatch();

      return axios.get(`api/risk-level`)
        .then(this.getThen)
        .catch(this.getError);
    };
  }

  getThen(response) {
    // results are formatted for react-select
    return _.map(response.data, riskLevel => {
      return {
        value: riskLevel.id,
        label: riskLevel.text
      };
    });
  }

  getError(response) {
    return response;
  }
}

export default alt.createActions(RiskLevelActions);