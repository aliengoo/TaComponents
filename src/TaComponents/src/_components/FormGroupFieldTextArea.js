"use strict";

import React, {Component, PropTypes} from "react";
import Q from "q";
import FormGroup from "./FormGroup";
import Label from "./Label";
import ValidityStateMessages from "./ValidityStateMessages";

export default class FormGroupFieldTextarea extends Component {

  render() {
    const {label, attr, name, tooltip, value, validityState, onChange} = this.props;

    return (
      <div className="FormGroupFieldTextarea">
        <FormGroup>
          <Label>{label} {tooltip}</Label>
          <textarea
            {...attr}
            ref={name}
            value={value}
            onChange={() => {onChange({
              [name]: this.refs[name].value
            })}}/>
          <ValidityStateMessages validityState={validityState}/>
        </FormGroup>
      </div>
    );
  }
}

FormGroupFieldTextarea.defaultProps = {
  label: ""
};

FormGroupFieldTextarea.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  validityState: PropTypes.object,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  attr: PropTypes.object,
  tooltip: PropTypes.node
};