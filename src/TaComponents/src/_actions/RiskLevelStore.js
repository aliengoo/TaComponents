"use strict";

import alt from "../alt";
import RiskLevelActions from "./RiskLevelActions";

class RiskLevelStore {
  constructor() {
    this.bindActions(RiskLevelActions);

    this.state = {
      fetching: false,
      riskLevels: [],
      error: null
    };
  }

  onGet() {
    this.setState({
      fetching: true
    });
  }

  onGetThen(riskLevels) {
    this.setState({
      fetching: false,
      riskLevels,
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

export default alt.createStore(RiskLevelStore);

