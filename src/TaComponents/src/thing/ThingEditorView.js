"use strict";

import React from "react";
import ThingActions from "./data/ThingActions";
import ThingStore from "./data/ThingStore";
import UserActions from "../_actions/UserActions";
import RiskActions from "../_actions/RiskActions";
import StatusActions from "../_actions/StatusActions";

import AppNavbar from "../_components/AppNavbar";
import PageHeader from "../_components/PageHeader";
import DividingHeader from "../_components/DividingHeader";
import Field from "../_components/Field";
import FetchingIndicator from "../_components/FetchingIndicator";
import FetchingPlaceholder from "../_components/FetchingPlaceholder";

import ThingName from "./fields/ThingName";
import ThingTextarea from "./fields/ThingTextarea";
import ThingStatus from "./fields/ThingStatus";
import ThingUsersSelect from "./fields/ThingUsersSelect";

import ThingDetailsSegment from "./segments/ThingDetailsSegment";
import ThingStatusSegment from "./segments/ThingStatusSegment";
import ThingBusinessSegment from "./segments/ThingBusinessSegment";
import ThingTechnicalTeamSegment from "./segments/ThingTechnicalTeamSegment";

export default class Thing extends React.Component {
  constructor(props) {
    super(props);

    this.state = ThingStore.getState();
    this._onThingStoreChange = this._onThingStoreChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this._save = this._save.bind(this);
    this._isEditing = this.props.params.mode === "edit";
  }

  componentDidMount() {
    RiskActions.getRiskSeverities();
    RiskActions.getRiskProbabilities();
    StatusActions.getStatuses();
    UserActions.getAllUsers();

    // i.e. it is not new
    if (this._isEditing) {
      ThingActions.get(this.props.params.id);
    } else {
      // when not editing, set the fetch to false
      ThingActions.clearFetching();
    }

    ThingActions.evaluateAll();

    ThingStore.listen(this._onThingStoreChange);
  }

  componentWillUnmount() {
    ThingStore.unlisten(this._onThingStoreChange);
  }

  _onThingStoreChange(state) {
    this.setState(state);
  }

  _onChange(property, value) {
    ThingActions.setValue(property, value);
    ThingActions.evaluateValue(property, value);

    // Formatted for the view
    ThingActions.getFormattedModel();
  }

  _save(event) {
    event.preventDefault();
    ThingActions.save(this.state.thing);
  }

  render() {
    const {
      fetching,
      fetchingIsNameUnique,
      statuses,
      users,
      thingFormatted,
      thingShadow,
      thing
      } = this.state;

    return (
      <div>
        <AppNavbar/>
        <FetchingIndicator fetching={fetching || fetchingIsNameUnique}/>
        <div className="Thing">


          <div className="ui container">
            <PageHeader>New Thing</PageHeader>
            <pre className="hide">{JSON.stringify(thing, null, 2)}</pre>
            <pre className="hide">{JSON.stringify(thingFormatted, null, 2)}</pre>
            <form noValidate={true} name="thingForm" className="ui form">

              <ThingDetailsSegment
                fetching={fetching}
                onChange={this._onChange}
                thingShadow={thingShadow}
                thing={thing}
              />

              <ThingStatusSegment
                fetching={fetching}
                onChange={this._onChange}
                statuses={statuses}
                thingShadow={thingShadow}
                thing={thing}
              />

              <ThingBusinessSegment
                fetching={fetching}
                onChange={this._onChange}
                users={users}
                thingShadow={thingShadow}
                thing={thing}
              />

              <ThingTechnicalTeamSegment
                fetching={fetching}
                onChange={this._onChange}
                users={users}
                thingShadow={thingShadow}
                thing={thing}
              />

              <button
                disabled={!thingShadow.isValid}
                className="ui primary button"
                type="button"
                onClick={this._save}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}



