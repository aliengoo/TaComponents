"use strict";

import React from "react";
import ThingActions from "./ThingActions";
import ThingStore from "./ThingStore";
import UserActions from "../_actions/UserActions";

import Container from "../_components/Container";
import PageHeader from "../_components/PageHeader";

import ThingName from "./components/ThingName/ThingName";
import ThingPrimaryTechnicalTeam from "./components/ThingPrimaryTechnicalTeam/ThingPrimaryTechnicalTeam";
import ThingSecondaryTechnicalTeam from "./components/ThingSecondaryTechnicalTeam/ThingSecondaryTechnicalTeam";

export default class Thing extends React.Component {
  constructor(props) {
    super(props);

    this.state = ThingStore.getState();
    this.onChange = this.onChange.bind(this);
    this._setField = this._setField.bind(this);
    this._save = this._save.bind(this);
  }

  componentDidMount() {
    UserActions.getAllUsers();
    ThingStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ThingStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  _setField(field) {
    ThingActions.setField(field);
  }

  _save() {
    ThingActions.create(this.state.thing);
  }

  render() {
    const {editable, thing, isValid, users, fetching} = this.state;

    return (
      <Container>
        <PageHeader>
          Thing
        </PageHeader>

        <pre>{JSON.stringify(thing, null, 2)}</pre>

        <div className="col-lg-12">

          <form noValidate={true} name="thingForm">
            <div className="col-lg-6">
              <ThingName fieldSetter={this._setField} editable={editable} value={thing.name}/>
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
              <button disabled={!isValid} className="btn btn-primary btn-lg" onClick={this._save}>Save</button>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}



