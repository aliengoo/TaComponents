"use strict";

import Q from "q";
import React, {Component, PropTypes} from "react";
import Field from "../_models/Field";
import FormGroup from "./FormGroup";
import Label from "./Label";
import FieldMessages from "./FieldMessages";

export default class FormGroupFieldInput extends Component {

  componentDidMount() {
    const {fieldSetter, validator, errorsMap, name} = this.props;

    const element = this.refs[name];

    this._field = new Field({
      element,
      fieldSetter,
      validator,
      errorsMap,
      name
    });
  }

  render() {

    const {label, attr, name, value, tooltip} = this.props;

    return (
      <div className="FormGroupFieldInput">
        <FormGroup>
          <Label>{label} {tooltip}</Label>
          <input
            {...attr}
            ref={name}
            onChange={() => this._field.set()}
            value={value}
          />
          <FieldMessages field={this._field}/>
        </FormGroup>
      </div>
    );
  }
}

FormGroupFieldInput.defaultProps = {
  validator: () => {
    return Q.resolve({valid: true});
  },
  label: "",
  value: ""
};

FormGroupFieldInput.propTypes = {
  label: PropTypes.string,
  fieldSetter: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  errorsMap: PropTypes.object,
  validator: PropTypes.func,
  value: PropTypes.string,
  attr: PropTypes.object.isRequired,
  tooltip: PropTypes.node
};