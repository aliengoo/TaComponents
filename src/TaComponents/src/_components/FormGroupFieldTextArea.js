"use strict";

import React, {Component, PropTypes} from "react";
import Q from "q";
import Field from "../_models/Field";
import FormGroup from "./FormGroup";
import Label from "./Label";
import FieldMessages from "./FieldMessages";

export default class FormGroupFieldTextArea extends Component {
  constructor(props) {
    super(props);
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

  render() {

    const {label, inputOptions, modelPropertyName, tooltip} = this.props;

    return (
      <div className="FormGroupFieldTextArea">
        <FormGroup>
          <Label>{label} {tooltip}</Label>
          <textarea {...inputOptions} ref={modelPropertyName}/>
          <FieldMessages field={this._field}/>
        </FormGroup>
      </div>
    );
  }
}

FormGroupFieldTextArea.defaultProps = {
  validator: () => {
    return {valid: true};
  },
  label: ""
};

FormGroupFieldTextArea.propTypes = {
  label: PropTypes.string,
  fieldSetter: PropTypes.func.isRequired,
  modelPropertyName: PropTypes.func.isRequired,
  errorsMap: PropTypes.object,
  validator: PropTypes.func,
  inputOptions: PropTypes.object.isRequired
};