"use strict";

import Q from "q";
import React, {Component, PropTypes} from "react";
import FormGroup from "./FormGroup";
import Label from "./Label";
import FieldMessages from "./FieldMessages";

export default class FormGroupFieldInput extends Component {

  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.props.onChange({
      [this.props.name]: this.refs[name].value
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
            onChange={this._onChange}
            value={value}
          />
          <FieldMessages field={this._field}/>
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