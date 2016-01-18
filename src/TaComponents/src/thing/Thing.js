"use strict";

import React from "react";
import ThingActions from "./ThingActions";
import ThingStore from "./ThingStore";
import UserActions from "../_actions/UserActions";
import RiskActions from "../_actions/RiskActions";
import StatusActions from "../_actions/StatusActions";

import AppNavbar from "../_components/AppNavbar";
import ContainerFluid from "../_components/ContainerFluid";
import PageHeader from "../_components/PageHeader";
import FetchingIndicator from "../_components/FetchingIndicator";
import FetchingPlaceholder from "../_components/FetchingPlaceholder";

import ThingName from "./components/ThingName/ThingName";
import ThingCurrentStatus from "./components/ThingCurrentStatus/ThingCurrentStatus";
import ThingIntendedStatus from "./components/ThingIntendedStatus/ThingIntendedStatus";

import ThingStaffRiskLevel from "./components/ThingStaffRiskLevel/ThingStaffRiskLevel";
import ThingPrimaryTechnicalTeam from "./components/ThingPrimaryTechnicalTeam/ThingPrimaryTechnicalTeam";
import ThingSecondaryTechnicalTeam from "./components/ThingSecondaryTechnicalTeam/ThingSecondaryTechnicalTeam";
import ThingOwners from "./components/ThingOwners/ThingOwners";
import ThingDescription from "./components/ThingDescription/ThingDescription";
import ThingHeader from "./components/ThingHeader/ThingHeader";

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

  _onChange(keyValuePair) {
    ThingActions.setValue(keyValuePair);
  }

  _save(event) {
    event.preventDefault();
    ThingActions.save(this.state.thing);
  }

  render() {
    const {fetching, fetchingIsNameUnique, thing} = this.state;

    return (
      <div>
        <AppNavbar/>
        <FetchingIndicator fetching={fetching || fetchingIsNameUnique}/>
        <div className="Thing">
          <ContainerFluid>
            {this.renderThingModel()}
            <div className="col-lg-12">
              {this.renderThing()}
            </div>
          </ContainerFluid>
        </div>
      </div>
    );
  }

  renderThing() {
    const {
      editable,
      fetching,
      isNameUnique,
      isValid,
      users,
      riskLevels,
      statuses,
      thing
      } = this.state;

    return (
      <form noValidate={true} name="thingForm">

        <div className="row">
          <div className="col-lg-6">
            <ThingName
              fetching={fetching}
              fieldSetter={this._onChange}
              value={thing.name}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <ThingDescription fetching={fetching}
                              fieldSetter={this._onChange}
                              value={thing.description}/>
            <ThingCurrentStatus
              fetching={fetching}
              value={thing.currentStatusId}
              fieldSetter={this._onChange}
              statuses={statuses}/>

            <ThingIntendedStatus
              fetching={fetching}
              value={thing.intendedStatusId}
              fieldSetter={this._onChange}
              statuses={statuses}/>

          </div>
          <div className="col-lg-6">

          </div>
        </div>

        <div className="col-lg-12">
          <button disabled={!isValid} className="btn btn-primary btn-lg" type="button" onClick={this._save}>Save
          </button>
        </div>
      </form>
    );
  }

  renderThingModel() {
    return <pre className="">{JSON.stringify(this.state.thing, null, 2)}</pre>
  }
}



