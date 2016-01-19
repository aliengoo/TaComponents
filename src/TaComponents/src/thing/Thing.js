"use strict";

import React from "react";
import ThingActions from "./ThingActions";
import ThingStore from "./ThingStore";
import UserActions from "../_actions/UserActions";
import RiskActions from "../_actions/RiskActions";
import StatusActions from "../_actions/StatusActions";

import AppNavbar from "../_components/AppNavbar";
import PageHeader from "../_components/PageHeader";
import DividingHeader from "../_components/DividingHeader";
import Field from "../_components/Field";
import FetchingIndicator from "../_components/FetchingIndicator";
import FetchingPlaceholder from "../_components/FetchingPlaceholder";

import ThingName from "./components/ThingName/ThingName";
import ThingDescription from "./components/ThingDescription/ThingDescription";
import ThingStatus from "./components/ThingStatus/ThingStatus";
import ThingStatusDetails from "./components/ThingStatusDetails/ThingStatusDetails";
import ThingUsersSelect from "./components/ThingUsersSelect/ThingUsersSelect";

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
            <form noValidate={true} name="thingForm" className="ui form">
              <ThingName
                fetching={fetching}
                shadowValue={thingShadow.name}
                onChange={this._onChange}
                value={thing.name}/>

              <ThingDescription
                fetching={fetching}
                shadowValue={thingShadow.description}
                onChange={this._onChange}
                value={thing.description}/>

              <DividingHeader>Status</DividingHeader>

              <div className="two fields">
                <Field>
                  <ThingStatus
                    name="currentStatusId"
                    label="Current Status"
                    statuses={statuses}
                    fetching={fetching}
                    onChange={this._onChange}
                    shadowValue={thingShadow.currentStatusId}
                    value={thing.currentStatusId}
                  />
                </Field>

                <Field>
                  <ThingStatus
                    name="intendedStatusId"
                    label="Intended Status"
                    statuses={statuses}
                    fetching={fetching}
                    onChange={this._onChange}
                    shadowValue={thingShadow.intendedStatusId}
                    value={thing.intendedStatusId}
                  />
                </Field>
              </div>
              <ThingStatusDetails
                fetching={fetching}
                shadowValue={thingShadow.statusDetails}
                onChange={this._onChange}
                value={thing.statusDetails}/>

              <DividingHeader>Technical Team</DividingHeader>
              <Field>
                <div className="two fields">
                  <Field>
                    <ThingUsersSelect
                      tooltip={{
                        content: "Select users who are most capable of supporting this thing"
                      }}
                      name="primaryTechnicalTeam"
                      label="Primary Team"
                      users={users}
                      fetching={fetching}
                      onChange={this._onChange}
                      shadowValue={thingShadow.primaryTechnicalTeam}
                      value={thing.primaryTechnicalTeam}
                    />

                  </Field>
                  <Field>
                    <ThingUsersSelect
                      tooltip={{
                        content: "Select users that could attempt to support this system"
                      }}
                      name="secondaryTechnicalTeam"
                      label="Secondary Team"
                      users={users}
                      fetching={fetching}
                      onChange={this._onChange}
                      shadowValue={thingShadow.secondaryTechnicalTeam}
                      value={thing.secondaryTechnicalTeam}
                    />
                  </Field>
                </div>
              </Field>

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


//<pre className="hidden">{JSON.stringify(thingShadow, null, 2)}</pre>
