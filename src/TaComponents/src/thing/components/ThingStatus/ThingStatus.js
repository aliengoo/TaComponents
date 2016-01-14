"use strict";

import _ from "lodash";
import React from "react";
import Field from "../../../_models/Field";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";
import FieldMessages from "../../../_components/FieldMessages";
import Select from "react-select";
import ThingStatusView from "./ThingStatusView";

export default class ThingStatus extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = _.debounce(this._onChange, 500).bind(this);
  }

  componentDidMount() {
    this._field = new Field(
      this.props.fieldSetter,
      undefined,
      this.props.validatorFn,
      this.props.fieldName,
      this.props.errorsMap
    );
  }

  _onChange(value) {
    this._field.set(value);
  }

  render() {
    const {editable, value, statuses, label, fieldName, tooltip, placeholder, requiredIndicator} = this.props;

    if (editable) {
      return (
        <div className="ThingStatus">
          <FormGroup>
            <Label>{label} {requiredIndicator} {tooltip}</Label>
            <Select
              placeholder={placeholder}
              value={value}
              options={statuses}
              name={fieldName}
              onChange={this._onChange}
            />
            <div>
              {this.props.children}
            </div>
            <FieldMessages field={this._field}/>
          </FormGroup>
        </div>
      );
    } else {
      return <ThingStatusView statuses={statuses} value={value} label={label}/>
    }
  }
}

ThingStatus.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  errorsMap: React.PropTypes.object,
  fieldName: React.PropTypes.string.isRequired,
  fieldSetter: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  requiredIndicator: React.PropTypes.node,
  statuses: React.PropTypes.array,
  tooltip: React.PropTypes.node,
  validatorFn: React.PropTypes.func.isRequired,
  value: React.PropTypes.string
};