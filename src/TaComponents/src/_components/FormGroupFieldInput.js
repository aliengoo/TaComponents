"use strict";

import Q from "q";
import React, {Component, PropTypes} from "react";
import Field from "../_models/Field";
import FormGroup from "./FormGroup";
import Label from "./Label";
import FieldMessages from "./FieldMessages";

export default class FormGroupFieldInput extends Component {

  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    const {fieldSetter, validator, errorsMap, modelPropertyName} = this.props;

    this._field = new Field({
      fieldSetter,
      validator,
      errorsMap,
      modelPropertyName
    });
  }

  componentDidUpdate() {
    this.refs[this.props.modelPropertyName] = this.props.value;
  }

  _onChange() {
    this._field.set();
  }

  render() {

    const {label, attr, modelPropertyName, tooltip} = this.props;

    return (
      <div className="FormGroupFieldInput">
        <FormGroup>
          <Label>{label} {tooltip}</Label>
          <input {...attr} ref={modelPropertyName} onChange={this._onChange}/>
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
  modelPropertyName: PropTypes.string.isRequired,
  errorsMap: PropTypes.object,
  validator: PropTypes.func,
  value: PropTypes.string,
  attr: PropTypes.object.isRequired,
  tooltip: PropTypes.node
};