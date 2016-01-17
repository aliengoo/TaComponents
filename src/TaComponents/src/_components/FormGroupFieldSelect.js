"use strict";

import _ from "lodash";
import Q from "q";
import React, {Component, PropTypes} from "react";
import Field from "../_models/Field";
import FormGroup from "./FormGroup";
import FieldMessage from "../_components/FieldMessages";
import Label from "./Label";
import Select from "react-select";

export default class FormGroupSelect extends Component {
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

  _onChange(value) {
    if (this.props.multi) {
      return _.filter(value.split(","), v => !!v);
    }

    return value;
  }

  render() {

    const {label, labelKey, placeholder, value, valueKey, options, modelPropertyName, multi, tooltip} = this.props;

    return (
      <div className="FormGroupSelect">
        <FormGroup>
          <Label>{label} {tooltip}</Label>
          <Select
            labelKey={labelKey}
            valueKey={valueKey}
            placeholder={placeholder}
            value={value}
            options={options}
            name={modelPropertyName}
            multi={multi}
            onChange={this._onChange}
          />
          <FieldMessage field={this._field}/>
        </FormGroup>
      </div>
    );
  }
}

FormGroupSelect.defaultProps = {
  validator: () => {
    return Q.resolve({valid: true});
  },
  multi: false,
  label: "",
  labelKey: "label",
  valueKey: "value"
};

FormGroupSelect.propTypes = {
  value: PropTypes.oneOf([PropTypes.array, PropTypes.string]),
  valueKey: PropTypes.string,
  label: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
  labelKey: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  fieldSetter: PropTypes.func.isRequired,
  modelPropertyName: PropTypes.string.isRequired,
  errorsMap: PropTypes.object,
  validator: PropTypes.func,
  multi: PropTypes.bool,
  tooltip: PropTypes.node
};