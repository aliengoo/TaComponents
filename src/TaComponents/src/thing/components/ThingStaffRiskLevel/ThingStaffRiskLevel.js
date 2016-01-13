"use strict";

import _ from "lodash";
import React from "react";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";
import ThingRiskLevel from "../ThingRiskLevel/ThingRiskLevel";

export default class ThingStaffRiskLevel extends React.Component {

  constructor(props) {
    super(props);
    this._validator = this._validator.bind(this);
    this._errorsMap = {
      required: "Staff risk must be specified"
    };
  }

  render() {
    const {fieldSetter, riskLevels, value, editable} = this.props;

    const tooltip = (
      <Tooltip container="ThingStaffRiskLevel">
        <p>How critical is the staff risk for this thing</p>
      </Tooltip>
    );

    return (
      <div className="ThingStaffRiskLevel">
        <ThingRiskLevel
          tooltip={tooltip}
          requiredIndicator={<RequiredIndicator/>}
          editable={editable}
          errorsMap={this._errorsMap}
          fieldSetter={fieldSetter}
          fieldName="staffRiskLevelId"
          label="Staff Risk Level"
          placeholder="Select the staff risk level"
          riskLevels={riskLevels}
          value={value}
          validatorFn={this._validator}
        />
      </div>
    );
  }

  _validator(value) {

    const valid = !!value;

    return {
      required: !valid,
      valid
    };
  }
}

ThingStaffRiskLevel.defaultProps = {
  value: ""
};

ThingStaffRiskLevel.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  fieldSetter: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  riskLevels: React.PropTypes.arrayOf(React.PropTypes.object)
};

