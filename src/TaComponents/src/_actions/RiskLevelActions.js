"use strict";

import _ from "lodash";
import alt from "../alt";
import axios from "axios";

class RiskLevelActions {
  getRiskLevels() {
    return (dispatch) => {
      dispatch();

      return axios.get(`api/risk-level`)
        .then(this.getRiskLevelsThen)
        .catch(this.getRiskLevelsError);
    };
  }

  getRiskLevelsThen(response) {
    // results are formatted for react-select
    return _.map(response.data, riskLevel => {
      return {
        value: riskLevel.id,
        label: riskLevel.text
      };
    });
  }

  getRiskLevelsError(response) {
    return response;
  }
}

export default alt.createActions(RiskLevelActions);