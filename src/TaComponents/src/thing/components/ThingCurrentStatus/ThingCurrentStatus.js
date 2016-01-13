"use strict";

import _ from "lodash";
import React from "react";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";
import ThingStatus from "../ThingStatus/ThingStatus";

export default class ThingCurrentStatus extends React.Component {

  constructor(props) {
    super(props);
    this._validator = this._validator.bind(this);
    this._errorsMap = {
      valueMissing: "You must provide the current status"
    };
  }

  render() {
    const {fieldSetter, statuses, value, editable} = this.props;

    const tooltip = (
      <Tooltip title="Current Status" container="ThingCurrentStatus">
          <p>What is the current status of this thing?</p>
      </Tooltip>
    );

    return (
      <div className="ThingCurrentStatus">
        <ThingStatus
          tooltip={tooltip}
          requiredIndicator={<RequiredIndicator/>}
          editable={editable}
          errorsMap={this._errorsMap}
          fieldSetter={fieldSetter}
          fieldName="currentStatusId"
          label="Current status"
          placeholder="Select the current status"
          statuses={statuses}
          value={value}
          validatorFn={this._validator}/>
      </div>
    );
  }

  _validator(value) {

    const valid = !!value;

    return {
      valueMissing: !valid,
      valid
    };
  }
}

ThingCurrentStatus.defaultProps = {
  value: ""
};

ThingCurrentStatus.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  fieldSetter: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  statuses: React.PropTypes.arrayOf(React.PropTypes.object)
};

