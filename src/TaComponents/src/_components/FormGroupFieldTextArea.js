"use strict";

import React, {Component, PropTypes} from "react";
import Q from "q";
import Field from "../_models/Field";
import FormGroup from "./FormGroup";
import Label from "./Label";
import FieldMessages from "./FieldMessages";

export default class FormGroupFieldTextarea extends Component {

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

    const {label, attr, name, tooltip, value} = this.props;

    return (
      <div className="FormGroupFieldTextarea">
        <FormGroup>
          <Label>{label} {tooltip}</Label>
          <textarea
            {...attr}
            ref={name}
            value={value}
            onChange={() => this._field.set()}/>
          <FieldMessages field={this._field}/>
        </FormGroup>
      </div>
    );
  }
}

FormGroupFieldTextarea.defaultProps = {
  validator: () => {
    return Q.resolve({valid: true});
  },
  label: ""
};

FormGroupFieldTextarea.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  fieldSetter: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  errorsMap: PropTypes.object,
  validator: PropTypes.func,
  value: PropTypes.string,
  attr: PropTypes.object,
  tooltip: PropTypes.node
};