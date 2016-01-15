"use strict";

import _ from "lodash";
import alt from "../alt";
import axios from "axios";

import RiskLevelApi from "../_api/RiskLevelApi";

class RiskLevelActions {
  constructor() {
    this.riskLevelApi = new RiskLevelApi();
    this.getRiskLevelsThen = this.getRiskLevelsThen.bind(this);
    this.getRiskLevelsError = this.getRiskLevelsError.bind(this);
  }

  getRiskLevels() {
    return (dispatch) => {
      dispatch();
      return this.riskLevelApi.get()
        .then(this.getRiskLevelsThen)
        .catch(this.getRiskLevelsError);
    };
  }

  getRiskLevelsThen(options) {
    return options;
  }

  getRiskLevelsError(response) {
    return response;
  }
}

export default alt.createActions(RiskLevelActions);