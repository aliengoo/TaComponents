"use strict";

import React from "react";
import ThingTeam from "../ThingTeam/ThingTeam";

export default class ThingOwners extends React.Component {

  constructor(props) {
    super(props);
    this._validator = this._validator.bind(this);
  }

  render() {
    const {fieldSetter, users, value, editable} = this.props;

    return (
      <ThingTeam
        editable={editable}
        fieldSetter={fieldSetter}
        fieldName="owners"
        label="Owners"
        users={users}
        value={value}
        validatorFn={this._validator}
      />
    );
  }

  _validator() {
    return {
      valid: true
    };
  }
}

ThingOwners.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  fieldSetter: React.PropTypes.func.isRequired,
  value: React.PropTypes.array,
  users: React.PropTypes.arrayOf(React.PropTypes.object)
};

