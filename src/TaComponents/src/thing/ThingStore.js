"use strict";

import _ from "lodash";
import alt from "../alt";
import ThingActions from "./ThingActions";
import UserActions from "../_actions/UserActions";
import Field from "../_models/Field";

class ThingStore {
  constructor() {
    this.bindActions(ThingActions);
    this.bindActions(UserActions);

    this.state = {
      editable: true,
      error: null,
      fetching: false,
      fetchingId: null,
      fields: {},
      isValid: false,
      users: [],
      thing: {
      }
    };
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
