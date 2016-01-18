"use strict";

import Q from "q";
import React, {Component, PropTypes} from "react";
import FormGroup from "./FormGroup";
import Label from "./Label";
import ValidityStateMessages from "./ValidityStateMessages";

export default class FormGroupFieldInput extends Component {

  render() {

    const {label, attr, name, value, tooltip, onChange, validityState} = this.props;

    return (
      <div className="FormGroupFieldInput">
        <FormGroup>
          <Label>{label} {tooltip}</Label>
          <input
            {...attr}
            ref={name}
            onChange={() => onChange(name, this.refs[name].value)}
            value={value}
          />
          <ValidityStateMessages validityState={validityState}/>
        </FormGroup>
      </div>
    );
  }
}

FormGroupFieldInput.defaultProps = {
  label: "",
  value: ""
};

FormGroupFieldInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  validityState: PropTypes.object,
  value: PropTypes.string,
  attr: PropTypes.object.isRequired,
  tooltip: PropTypes.node
};