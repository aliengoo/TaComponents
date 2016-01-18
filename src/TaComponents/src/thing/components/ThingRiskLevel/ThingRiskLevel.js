"use strict";

import _ from "lodash";
import React from "react";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";
import ValidityStateMessages from "../../../_components/ValidityStateMessages";
import Select from "react-select";

export default class ThingRiskLevel extends React.Component {


  render() {
    const {
      onChange,
      value,
      riskLevels,
      label,
      name,
      placeholder,
      requiredIndicator,
      validityState,
      tooltip} = this.props;

    return (
      <div className="ThingRiskLevel">
        <FormGroup>
          <Label>{label} {requiredIndicator} {tooltip}</Label>
          <div>
            <Select
              labelKey={"text"}
              valueKey={"id"}
              placeholder={placeholder}
              value={value}
              options={riskLevels}
              name={name}
              onChange={onChange}
            />
            <ValidityStateMessages validityState={validityState}/>
          </div>
        </FormGroup>
      </div>
    );
  }
}

ThingRiskLevel.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  riskLevels: React.PropTypes.array,
  tooltip: React.PropTypes.node,
  requiredIndicator: React.PropTypes.node,
  validityState: React.PropTypes.object,
  value: React.PropTypes.string
};