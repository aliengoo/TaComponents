"use strict";

import _ from "lodash";
import alt from "../alt";
import ThingActions from "./ThingActions";
import UserActions from "../_actions/UserActions";
import RiskLevelActions from "../_actions/RiskLevelActions";
import StatusActions from "../_actions/StatusActions";
import Field from "../_models/Field";

class ThingStore {
  constructor() {
    this.bindActions(ThingActions);
    this.bindActions(RiskLevelActions);
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
      thing: {}
    };
  }

  onGetRiskLevels() {
    this.setState({
      fetching: true
    });
  }

  onGetRiskLevelsThen(riskLevels) {
    this.setState({
      fetching: false,
      riskLevels
    });
  }

  onGetRiskLevelsError(response) {
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


  onSetField(field) {
    // set the field matching the fieldName in fields
    const fields = Object.assign({}, this.state.fields, {
      [field.fieldName]: field
    });

    // check for validity by counting the number of fields that are invalid
    const isValid = Field.areAllValid(fields);

    // update the thing object with the field value
    const thing = Object.assign({}, this.state.thing, {
      [field.fieldName]: field.value
    });

    this.setState({
      fields,
      isValid,
      thing,
      error: null
    });
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
