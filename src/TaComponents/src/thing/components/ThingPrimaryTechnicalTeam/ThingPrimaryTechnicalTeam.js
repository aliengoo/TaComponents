"use strict";

import _ from "lodash";
import React from "react";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";
import ThingTeam from "../ThingTeam/ThingTeam";

export default class ThingPrimaryTechnicalTeam extends React.Component {

  constructor(props) {
    super(props);
    this._validator = this._validator.bind(this);
    this._errorsMap = {
      duplicated: "One of the users has already been selected as a secondary team member"
    };
  }

  render() {
    const {fieldSetter, users, value, editable} = this.props;

    const tooltip = (
      <Tooltip container="ThingPrimaryTechnicalTeam">
        <p>List people who are most capable at supporting this thing.</p>
      </Tooltip>
    );

    return (
      <ThingTeam
        editable={editable}
        errorsMap={this._errorsMap}
        fieldSetter={fieldSetter}
        fieldName="primaryTechnicalTeam"
        label="Primary Technical Team"
        placeholder="Select primary team members"
        tooltip={tooltip}
        users={users}
        value={value}
        validatorFn={this._validator}
      />
    );
  }

  _validator(value) {
    const {secondaryTechnicalTeam} = this.props;

    var duplicates = (_.intersection(secondaryTechnicalTeam, value)).length;

    return {
      duplicated: duplicates > 0,
      valid: duplicates === 0
    };
  }
}

ThingPrimaryTechnicalTeam.defaultProps = {
  secondaryTechnicalTeam: [],
  value: []
};

ThingPrimaryTechnicalTeam.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  fieldSetter: React.PropTypes.func.isRequired,
  value: React.PropTypes.array,
  secondaryTechnicalTeam: React.PropTypes.array,
  users: React.PropTypes.arrayOf(React.PropTypes.object)
};

