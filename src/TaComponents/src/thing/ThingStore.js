"use strict";

import _ from "lodash";
import alt from "../alt";
import ThingActions from "./ThingActions";
import UserActions from "../_actions/UserActions";
import RiskActions from "../_actions/RiskActions";
import StatusActions from "../_actions/StatusActions";
import Field from "../_models/Field";

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
      fetchingIsNameUnique: false,
      fields: {},
      isValid: false,
      isNameUnique: true,
      riskSeverities: [],
      riskProbabilities: [],
      thing: {}
    };
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


  onSetField() {
    this.setState({
      fetching: true
    });
  }

  onSetFieldThen(field) {
    var result = field.evaluateInContext(
      this.state.fields,
      this.state.thing);

    this.setState({
      fetching: false,
      fields: result.updatedFields,
      isValid: result.isValid,
      thing: result.updatedModel
    });
  }

  onSetFieldError(error) {
    this._handleError(error);
  }

  onSetEditable(editable) {
    this.setState({
      editable
    });
  }

  onIsNameUnique() {
    this.setState({
      fetchingIsNameUnique: true
    });
  }

  onIsNameUniqueThen(isNameUnique) {
    this.setState({
      fetchingIsNameUnique: false,
      isNameUnique
    });
  }

  onIsNameUniqueError(response) {
    // conflict, indicating the name is not unique
    if (response.status === 409) {
      this.setState({
        fetchingIsNameUnique: false,
        isNameUnique: false
      });
    } else {
      this.setState({
        fetchingIsNameUnique: false,
        error: response
      });
    }
  }

  onClearIsNameUnique() {
    this.setState({
      isNameUnique: true
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
      fetchingId: null,
      thing,
      error: null
    });
  }

  onGetError(response) {
    console.error("onGetError:", response);
  }

  _handleError (response) {
    console.error("onGetError:", response);
  }
}

export default alt.createStore(ThingStore);
