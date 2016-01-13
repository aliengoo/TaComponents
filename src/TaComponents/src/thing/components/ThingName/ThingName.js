"use strict";

import _ from "lodash";
import React from "react";
import Field from "../../../_models/Field";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";
import FieldMessages from "../../../_components/FieldMessages";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";


export default class ThingName extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = _.debounce(this._onChange, 500).bind(this);
  }

  componentDidMount() {
    this._field = new Field(this.props.fieldSetter, this.refs.ThingName, undefined, undefined, {
      conflict: "This name is already in use",
      valueMissing: "You must specify a name"
    });
  }

  _onChange() {
    const {isNameUniqueFn} = this.props;
    this._field.set();
    isNameUniqueFn(this._field.value);
  }

  render() {

    const {editable, value, isNameUnique} = this.props;

    if (this._field) {
      var currentValidityState = this._field.validityState;

      if (currentValidityState && currentValidityState.valid) {
        var newValidityState = Object.assign({}, currentValidityState, {
          conflict: !isNameUnique,
          valid: isNameUnique
        });

        this._field.setValidityState(newValidityState);
      }
    }

    const inputContent = (
      <div>
        <input
          className="form-control"
          data-field-name="name"
          minLength={3}
          onChange={this._onChange}
          placeholder="Enter a name"
          ref="ThingName"
          required="required"
          defaultValue={value}
          type="text"
        />
        <FieldMessages field={this._field}/>
      </div>
    );

    const staticContent = (<p className="form-control-static">{value}</p>);

    const tooltip = (
      <Tooltip title="What's the name?" container="ThingName">
        <strong>Note:</strong>
        <ul>
          <li>
            The name must be <strong>unique</strong>
          </li>
          <li>
            Include the version number, e.g. "C# v6.0"
          </li>
        </ul>
      </Tooltip>
    );

    return (
      <div className="ThingName">
        <FormGroup>
          <Label>Name <RequiredIndicator/> {tooltip}</Label>
          {editable ? inputContent : staticContent}
        </FormGroup>
      </div>
    );
  }
}

ThingName.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  value: React.PropTypes.string,
  fieldSetter: React.PropTypes.func.isRequired,
  isNameUnique: React.PropTypes.bool.isRequired,
  isNameUniqueFn: React.PropTypes.func.isRequired
};