"use strict";

import _ from "lodash";
import alt from "../alt";
import ThingActions from "./ThingActions";
import UserActions from "../_actions/UserActions";
import RiskActions from "../_actions/RiskActions";
import StatusActions from "../_actions/StatusActions";
import {isValid} from "../_validation/validate";

class ThingStore {
  constructor() {
    this.bindActions(ThingActions);
    this.bindActions(RiskActions);
    this.bindActions(StatusActions);
    this.bindActions(UserActions);

    this.state = {
      editable: true,
      error: null,
      // start fetching true to prevent controls rendering initially
      fetching: true,
      validating: false,
      fetchingIsNameUnique: false,
      isValid: false,
      isNameUnique: true,
      riskSeverities: [],
      riskProbabilities: [],
      thing: {},
      thingValidityState: {}
    };
  }

  onSetValue(data) {

    const thing = Object.assign({}, this.state.thing, {
      [data.property]: data.value
    });


    this.setState({
      thing
    });
  }

  onValidate() {
    this.setState({
      validating: true
    });
  }

  onValidateThen(validationResult) {
    const thingValidityState = Object.assign({}, this.state.thingValidityState, {
      [validationResult.property]: validationResult.validityState
    });

    this.setState({
      isValid: isValid(thingValidityState),
      thingValidityState
    });
  }

  onGetRiskSeverities() {
    this.setState({
      fetching: true
    });
  }

  onGetRiskSeveritiesThen(riskSeverities) {
    this.setState({
      fetching: false,
      riskSeverities
    });
  }

  onGetRiskSeveritiesError(response) {
    this._handleError(response);
  }

  onGetRiskProbabilities() {
    this.setState({
      fetching: true
    });
  }

  onGetRiskProbabilitiesThen(riskProbabilities) {
    this.setState({
      fetching: false,
      riskProbabilities
    });
  }

  onGetRiskProbabilitiesError(response) {
    this._handleError(response);
  }

  onGetStatuses() {
    this.setState({
      fetching: true
    });
  }

  onGetStatusesThen(statuses) {
    this.setState({
      fetching: false,
      statuses
    });
  }

  onGetStatusesError(response) {
    this._handleError(response);
  }

  onGetAllUsers() {
    this.setState({
      fetching: true
    });
  }

  onGetAllUsersThen(users) {
    this.setState({
      fetching: false,
      users
    });
  }

  onGetAllUsersError(response) {
    this._handleError(response);
  }

  onClearFetching() {
    this.setState({
      fetching: false
    });
  }

  onSave() {
    this.setState({
      fetching: true
    });
  }

  onSaveThen(thing) {
    this.setState({
      fetching: false,
      thing
    });
  }

  onSaveError(response) {
    this.setState({
      fetching: false,
      error: response
    });
  }

  onGet(id) {
    this.setState({
      fetching: true,
      error: null
    });
  }

  onGetThen(thing) {
    this.setState({
      fetching: false,
      thing,
      error: null
    });
  }

  onGetError(response) {
    console.error("onGetError:", response);
  }

  _handleError(response) {
    console.error("onGetError:", response);
  }
}

export default alt.createStore(ThingStore, "ThingStore");
