"use strict";

import _ from "lodash";
import React from "react";
import Field from "../../../_models/Field";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";
import FieldMessages from "../../../_components/FieldMessages";
import Select from "react-select";

export default class ThingRiskLevel extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = _.debounce(this._onChange, 500).bind(this);
  }

  componentDidMount() {
    this._field = new Field(
      this.props.fieldSetter,
      undefined,
      this.props._validatorFn,
      this.props._fieldName,
      this.props.errorsMap
    );
  }

  _onChange(value) {
    this._field.set(value);
  }
  render() {
    const {editable, value, riskLevels, label, fieldName, placeholder, requiredIndicator, tooltip} = this.props;

    const inputContent = (
      <div>
        <Select
          labelKey={"text"}
          valueKey={"id"}
          placeholder={placeholder}
          value={value}
          options={riskLevels}
          name={name}
          onChange={this._onChange}
        />
        <FieldMessages field={this._field}/>
      </div>
    );

    const staticContent = (<p className="form-control-static">{value}</p>);

    return (
      <div className="ThingRiskLevel">
        <FormGroup>
          <Label>{label} {requiredIndicator} {tooltip}</Label>
          {editable ? inputContent : staticContent}
        </FormGroup>
      </div>
    );
  }
}

ThingRiskLevel.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  errorsMap: React.PropTypes.object,
  name: React.PropTypes.string.isRequired,
  fieldSetter: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  riskLevels: React.PropTypes.array,
  tooltip: React.PropTypes.node,
  requiredIndicator: React.PropTypes.node,
  validatorFn: React.PropTypes.func.isRequired,
  value: React.PropTypes.string
};