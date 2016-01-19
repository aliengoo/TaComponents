"use strict";

import React, {Component, PropTypes} from "react";

// stores and actions
import UserActions from "../_actions/UserActions";
import RiskActions from "../_actions/RiskActions";
import StatusActions from "../_actions/StatusActions";
import ThingActions from "./ThingActions";
import ThingStore from "./ThingStore";

// components
import AppNavbar from "../_components/AppNavbar";
import FetchingIndicator from "../_components/FetchingIndicator";
import FetchingPlaceholder from "../_components/FetchingPlaceholder";



export default class ThingView extends Component {

  constructor(props) {
    super(props);

    this.state = ThingStore.getState();
    this._onThingStoreChange = this._onThingStoreChange.bind(this);
  }

  componentDidMount() {
    RiskActions.getRiskSeverities();
    RiskActions.getRiskProbabilities();
    StatusActions.getStatuses();
    UserActions.getAllUsers();
    ThingActions.get(this.props.params.id);
    ThingStore.listen(this._onThingStoreChange);
  }

  componentWillUnmount() {
    ThingStore.unlisten(this._onThingStoreChange);
  }

  render() {
    const {fetching, thing} = this.state;

    return (
      <div className="ThingView">
        <AppNavbar/>
        <FetchingIndicator fetching={fetching}/>
        {fetching ?
          <FetchingPlaceholder/> :
          <div className="ui grid">
          </div>
        };
      </div>
    );
  }

  _onThingStoreChange(state) {
    this.setState(state);
  }
}