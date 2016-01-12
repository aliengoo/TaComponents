"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import Field from "../../../_models/Field";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";
import FieldMessages from "../../../_components/FieldMessages";
import Select from "react-select";

export default class ThingTeam extends React.Component {

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

    this._field.set(this.props.value);
  }

  _onChange(values) {
    this._field.set(values.split(","));
  }

  render() {

    const {editable, value, users, label, fieldName, placeholder} = this.props;

    const inputContent = (
      <div>
        <Select
          placeholder={placeholder}
          value={value}
          options={users}
          multi={true}
          name={fieldName}
          onChange={this._onChange}
        />
        <FieldMessages field={this._field}/>
      </div>
    );

    const staticContent = (<p className="form-control-static">{value}</p>);

    return (
      <div className="ThingTeam">
        <FormGroup>
          <Label>{label}</Label>
          {editable ? inputContent : staticContent}

        </FormGroup>
      </div>
    );
  }
}

ThingTeam.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  errorsMap: React.PropTypes.object,
  fieldName: React.PropTypes.string.isRequired,
  fieldSetter: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  validatorFn: React.PropTypes.func.isRequired,
  value: React.PropTypes.array
};