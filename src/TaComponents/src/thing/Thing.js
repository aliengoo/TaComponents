"use strict";

import React from "react";
import ThingActions from "./ThingActions";
import ThingStore from "./ThingStore";
import UserActions from "../_actions/UserActions";
import UserStore from "../_actions/UserStore";
import RiskLevelActions from "../_actions/RiskLevelActions";
import RiskLevelStore from "../_actions/RiskLevelStore";
import StatusActions from "../_actions/StatusActions";
import StatusStore from "../_actions/StatusStore";

import AppNavbar from "../_components/AppNavbar";
import Container from "../_components/Container";
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

export default class Thing extends React.Component {
  constructor(props) {
    super(props);

    this.state = ThingStore.getState();
    this.onThingStoreChange = this.onThingStoreChange.bind(this);
    this._setField = this._setField.bind(this);
    this._save = this._save.bind(this);
    this._isNameUnique = this._isNameUnique.bind(this);
    this._isEditing = !!this.props.params.id;
    this._loadRiskLevels = this._loadRiskLevels.bind(this);
    this._loadStatuses = this._loadStatuses.bind(this);
    this._loadUsers = this._loadUsers.bind(this);
  }

  _loadRiskLevels() {
    var listener = (state) => {
      if (state.riskLevels.length > 0) {
        this.setState({
          riskLevels: state.riskLevels
        });

        RiskLevelStore.unlisten(listener);
      }
    };

    RiskLevelStore.listen(listener);

    RiskLevelActions.get();
  }

  _loadStatuses() {
    var listener = (state) => {
      if (state.statuses.length > 0) {
        this.setState({
          statuses: state.statuses
        });

        StatusStore.unlisten(listener);
      }
    };

    StatusStore.listen(listener);
    StatusActions.get();
  }

  _loadUsers() {
    var listener = (state) => {
      if (state.users.length > 0) {
        this.setState({
          users: state.users
        });

        UserStore.unlisten(listener);
      }
    };

    UserStore.listen(listener);
    UserActions.getAllUsers();
  }

  componentDidMount() {
    this._loadUsers();
    this._loadStatuses();
    this._loadRiskLevels();

    if (this._isEditing) {
      ThingActions.get(this.props.params.id);
    } else {
      // when not editing, set the fetch to false
      ThingActions.clearFetching();
    }

    ThingStore.listen(this.onThingStoreChange);
  }

  componentWillUnmount() {
    ThingStore.unlisten(this.onThingStoreChange);
  }

  onThingStoreChange(state) {
    this.setState(state);
  }

  _isNameUnique(name) {
    if (name) {
      ThingActions.isNameUnique(name);
    } else {
      ThingActions.clearIsNameUnique();
    }
  }

  _setField(field) {
    ThingActions.setField(field);
  }

  _save(event) {
    event.preventDefault();
    ThingActions.save(this.state.thing);
  }

  render() {
    const {fetching, fetchingIsNameUnique} = this.state;

    return (
      <div>
        <AppNavbar/>
        <FetchingIndicator fetching={fetching || fetchingIsNameUnique}/>
        <Container>
          {this.renderThingModel()}

          <div className="col-lg-12">
            {this.renderHeader()}
            {this.renderThing()}
          </div>
        </Container>
      </div>
    );
  }

  renderHeader() {
    const {thing, isNameUnique} = this.state;

    var defaultPageHeader = (
      <div className="text-muted">
        &lt;This thing has no name&gt;
      </div>
    );

    var conflictingNamePageHeader = (
      <div className="text-danger">
        <i className="fa fa-warning"/> {thing.name}
      </div>
    );

    return (
      <PageHeader>
        {!isNameUnique ? conflictingNamePageHeader : thing.name || defaultPageHeader}
      </PageHeader>
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

    if (true) {
      return <FetchingPlaceholder/>;
    } else {
      return (
        <form noValidate={true} name="thingForm">
          <div className="col-lg-6">
            <ThingName
              fieldSetter={this._setField}
              isNameUniqueFn={this._isNameUnique}
              isNameUnique={isNameUnique}
              editable={editable}
              value={thing.name}/>

            <ThingDescription
              fieldSetter={this._setField}
              editable={editable}
              value={thing.description}
            />

            <ThingCurrentStatus
              fieldSetter={this._setField}
              editable={editable}
              value={thing.currentStatusId}
              statuses={statuses}/>

            <ThingIntendedStatus
              fieldSetter={this._setField}
              editable={editable}
              value={thing.intendedStatusId}
              statuses={statuses}/>

          </div>
          <div className="col-lg-6">
            <ThingStaffRiskLevel
              fieldSetter={this._setField}
              editable={editable}
              value={thing.staffRiskLevelId}
              riskLevels={riskLevels}/>

            <ThingOwners
              fieldSetter={this._setField}
              editable={editable}
              value={thing.businessOwners}
              users={users}/>

            <ThingPrimaryTechnicalTeam
              fieldSetter={this._setField}
              editable={editable}
              value={thing.primaryTechnicalTeam}
              secondaryTechnicalTeam={thing.secondaryTechnicalTeam}
              users={users}/>
            <ThingSecondaryTechnicalTeam
              fieldSetter={this._setField}
              editable={editable}
              value={thing.secondaryTechnicalTeam}
              primaryTechnicalTeam={thing.primaryTechnicalTeam}
              users={users}/>
          </div>

          <div className="col-lg-12">
            <button disabled={!isValid} className="btn btn-primary btn-lg" type="button" onClick={this._save}>Save
            </button>
          </div>
        </form>
      );
    }
  }

  renderThingModel() {
    return <pre className="hide">{JSON.stringify(this.state.thing, null, 2)}</pre>
  }
}



