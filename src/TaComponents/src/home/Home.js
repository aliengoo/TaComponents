"use strict";

import React, {Component} from "react";
import HomeActions from "./HomeActions";
import HomeStore from "./HomeStore";

import PageHeader from "../_components/PageHeader";
import User from "../_components/User";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.get();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const {user, fetching} = this.state;

    return (
      <div className="ui grid">
        <div className="one column wide">
          <PageHeader>Home</PageHeader>
          <User user={user} fetching={fetching}/>
        </div>
      </div>
    );
  }
}