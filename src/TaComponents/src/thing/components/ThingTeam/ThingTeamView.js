"use strict";

import React, {Component, PropTypes} from "react";

import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";

export default class ThingTeamView extends Component {
  render() {
    const {label, users} = this.props;
    return (
      <div className="ThingTeamView">
        <FormGroup>
          <Label>{label}</Label>
          {users.map((name, key) => {
            return <span className="label label-default" key={key}>{name}</span>
          })}
        </FormGroup>
      </div>
    );
  }
}

ThingTeamView.defaultProps = {
  label: "*ThingTeamView*"
};

ThingTeamView.propTypes = {
  label: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.string)
};