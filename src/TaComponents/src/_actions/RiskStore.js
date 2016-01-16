"use strict";

import alt from "../alt";
import RiskActions from "./RiskActions";

class RiskStore {
  constructor() {
    this.bindActions(RiskActions);

    this.state = {
      fetching: false,
      riskSeverities: [],
      riskProbabilities: [],
      error: null
    };
  }

  onGetSeverities() {
    this.setState({
      fetching: true
    });
  }

  onGetSeveritiesThen(riskSeverities) {
    this.setState({
      fetching: false,
      riskSeverities,
      error: null
    });
  }

  onGetSeveritiesError(response) {
    this.setState({
      fetching: false,
      error: response
    });
  }

  onGetProbabilities() {
    this.setState({
      fetching: true
    });
  }

  onGetProbabilitiesThen(riskProbabilities) {
    this.setState({
      fetching: false,
      riskProbabilities,
      error: null
    });
  }

  onGetProbabilitiesError(response) {
    this.setState({
      fetching: false,
      error: response
    });
  }

}

export default alt.createStore(RiskStore);

