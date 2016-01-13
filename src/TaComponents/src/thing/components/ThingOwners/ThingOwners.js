"use strict";

import React from "react";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";
import ThingTeam from "../ThingTeam/ThingTeam";

export default class ThingOwners extends React.Component {

  constructor(props) {
    super(props);
    this._validator = this._validator.bind(this);
    this._errorsMap = {
      valueMissing: "You must select at least one Business Owner"
    };
  }

  render() {
    const {fieldSetter, users, value, editable} = this.props;

    const tooltip = (
      <Tooltip container="ThingOwners">
        <p>List people are considered the business owners of this thing.</p>
      </Tooltip>
    );

    return (
      <ThingTeam
        placeholder="Select one or more business owners"
        editable={editable}
        errorsMap={this._errorsMap}
        fieldSetter={fieldSetter}
        fieldName="businessOwners"
        label="Business Owners"
        requiredIndicator={<RequiredIndicator/>}
        tooltip={tooltip}
        users={users}
        value={value}
        validatorFn={this._validator}
      />
    );
  }

  _validator(value) {

    var valid = !!value && value.length > 0;

    return {
      valueMissing: !valid,
      valid
    };
  }
}

ThingOwners.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  fieldSetter: React.PropTypes.func.isRequired,
  value: React.PropTypes.array,
  users: React.PropTypes.arrayOf(React.PropTypes.object)
};

