"use strict";

import _ from "lodash";
import alt from "../alt";
import ThingActions from "./ThingActions";
import UserActions from "../_actions/UserActions";
import RiskLevelStore from "../_actions/RiskLevelStore";
import StatusStore from "../_actions/StatusStore";
import UserStore from "../_actions/UserStore";
import Field from "../_models/Field";

class ThingStore {
  constructor() {
    this.bindActions(ThingActions);

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
    this.waitFor([
      RiskLevelStore.dispatchToken,
      StatusStore.dispatchToken,
      UserStore.dispatchToken
    ]);
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
