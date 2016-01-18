"use strict";

import _ from "lodash";
import Q from "q";
import React, {Component, PropTypes} from "react";
import FormGroup from "./FormGroup";
import FieldMessage from "../_components/FieldMessages";
import Label from "./Label";
import Select from "react-select";

export default class FormGroupFieldSelect extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(value) {
    var actual = value;

    if (this.props.multi) {
      actual = _.filter(value.split(","), v => !!v);
    }

    this._field.set(actual);
  }

  render() {

    const {label, labelKey, placeholder, value, valueKey, options, name, multi, attr, tooltip} = this.props;

    return (
      <div className="FormGroupFieldSelect">
        <FormGroup>
          <Label>{label} {tooltip}</Label>
          <Select
            labelKey={labelKey}
            valueKey={valueKey}
            placeholder={placeholder}
            value={value}
            options={options}
            inputProps={attr}
            name={name}
            multi={multi}
            onChange={this._onChange}
          />
          <FieldMessage field={this._field}/>
        </FormGroup>
      </div>
    );
  }
}

FormGroupFieldSelect.defaultProps = {
  multi: false,
  label: "",
  labelKey: "label",
  valueKey: "value"
};

FormGroupFieldSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  valueKey: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  labelKey: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  validityState: PropTypes.object,
  multi: PropTypes.bool,
  tooltip: PropTypes.node
};