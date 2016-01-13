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
    this.bindActions(UserActions);
    this.bindActions(RiskLevelActions);
    this.bindActions(StatusActions);

    this.state = {
      editable: true,
      error: null,
      fetching: false,
      fetchingId: null,
      fields: {},
      isValid: false,
      users: [],
      riskLevels: [],
      statuses: [],
      isNameUnique: true,
      thing: {}
    };
  }

  onGetRiskLevels() {
    this.setState({
      fetching: true,
      riskLevels: []
    });
  }

  onGetRiskLevelsThen(riskLevels) {
    this.setState({
      fetching: false,
      riskLevels
    });
  }

  onGetRiskLevelsError(error) {
    this.setState({
      fetching: false,
      riskLevels: [],
      error
    });
  }

  onGetStatuses() {
    this.setState({
      fetching: true,
      statuses: []
    });
  }

  onGetStatusesThen(statuses) {
    this.setState({
      fetching: false,
      statuses
    });
  }

  onGetStatusesError(error) {
    this.setState({
      fetching: false,
      statuses: [],
      error
    });
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
    this.setState({
      fetching: false,
      users: [],
      error: response
    });
  }


  onSetField(field) {
    // set the field matching the fieldName in fields
    const fields = Object.assign(this.state.fields, {
      [field.fieldName]: field
    });

    // check for validity by counting the number of fields that are invalid
    const isValid = Field.areAllValid(fields);

    // update the thing object with the field value
    const thing = Object.assign(this.state.thing, {
      [field.fieldName]: field.value
    });

    this.setState({
      fields,
      isValid,
      thing,
      error: null
    });
  }

  onIsNameUnique() {
    this.setState({
      fetching: true
    });
  }

  onIsNameUniqueThen(isNameUnique) {
    this.setState({
      fetching: false,
      isNameUnique
    });
  }

  onIsNameUniqueError(response) {
    // conflict, indicating the name is not unique
    if (response.status === 409) {
      this.setState({
        fetching: false,
        isNameUnique: false
      });
    } else {
      this.setState({
        fetching: false,
        error: response
      });
    }
  }

  onClearIsNameUnique() {
    this.setState({
      isNameUnique: true
    });
  }

  onGet(id) {
    this.setState({
      fetching: true,
      fetchingId: id,
      thing: {},
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
    this.setState({
      fetching: false,
      fetchingId: null,
      thing: {},
      error: response
    });
  }
}

export default alt.createStore(ThingStore, "ThingStore");
