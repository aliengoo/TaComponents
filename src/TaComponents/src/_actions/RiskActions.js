"use strict";

import alt from "../alt";
import RiskApi from "../_api/RiskApi";

class RiskActions {
  constructor() {
    this.riskApi = new RiskApi();
    this.getRiskSeveritiesThen = this.getRiskSeveritiesThen.bind(this);
    this.getRiskSeveritiesError = this.getRiskSeveritiesError.bind(this);
    this.getRiskProbabilitiesThen = this.getRiskProbabilitiesThen.bind(this);
    this.getRiskProbabilitiesError = this.getRiskProbabilitiesError.bind(this);
  }

  getRiskSeverities() {
    return (dispatch) => {
      dispatch();
      return this.riskApi.getSeverities()
        .then(this.getRiskSeveritiesThen)
        .catch(this.getRiskSeveritiesError);
    };
  }

  getRiskSeveritiesThen(options) {
    return options;
  }

  getRiskSeveritiesError(response) {
    return response;
  }

  getRiskProbabilities() {
    return (dispatch) => {
      dispatch();
      return this.riskApi.getProbabilities()
        .then(this.getRiskProbabilitiesThen)
        .catch(this.getRiskProbabilitiesError);
    };
  }

  getRiskProbabilitiesThen(options) {
    return options;
  }

  getRiskProbabilitiesError(response) {
    return response;
  }
}

export default alt.createActions(RiskActions);