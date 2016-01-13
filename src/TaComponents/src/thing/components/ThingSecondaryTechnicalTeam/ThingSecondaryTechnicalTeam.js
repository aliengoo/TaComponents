"use strict";

import _ from "lodash";
import React from "react";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";
import ThingTeam from "../ThingTeam/ThingTeam";

export default class ThingSecondaryTechnicalTeam extends React.Component {

  constructor(props) {
    super(props);
    this._validator = this._validator.bind(this);
    this._errorsMap = {
      duplicated: "One of the users has already been selected as a primary team member"
    };
  }

  render() {
    const {fieldSetter, users, value, editable} = this.props;

    const tooltip = (
      <Tooltip container="ThingSecondaryTechnicalTeam">
        <p>List people who could possibly offer limited support (best efforts).</p>
      </Tooltip>
    );

    return (
      <ThingTeam
        editable={editable}
        errorsMap={this._errorsMap}
        fieldSetter={fieldSetter}
        fieldName="secondaryTechnicalTeam"
        label="Secondary Technical Team"
        placeholder="Select secondary team members"
        tooltip={tooltip}
        users={users}
        value={value}
        validatorFn={this._validator}
      />
    );
  }

  _validator(value) {
    const {primaryTechnicalTeam} = this.props;

    var duplicates = (_.intersection(primaryTechnicalTeam, value)).length;

    return {
      duplicated: duplicates > 0,
      valid: duplicates === 0
    };
  }
}

ThingSecondaryTechnicalTeam.defaultProps = {
  primaryTechnicalTeam: [],
  value: []
};

ThingSecondaryTechnicalTeam.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  fieldSetter: React.PropTypes.func.isRequired,
  value: React.PropTypes.array,
  primaryTechnicalTeam: React.PropTypes.array,
  users: React.PropTypes.arrayOf(React.PropTypes.object)
};

