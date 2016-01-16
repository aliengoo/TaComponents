"use strict";

import React, {Component, PropTypes} from "react";
import Field from "../_models/Field";
import FormGroup from "./FormGroup";
import Label from "./Label";
import Select from "react-select";

export default class FormGroupSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._field = new Field(
      this.props.fieldSetter,
      undefined,
      this.props.validatorFn,
      this.props.fieldName,
      this.props.errorsMap
    );
  }

  render() {

    const {label, placeholder, value, options, fieldName, multi} = this.props;

    return (
      <div className="FormGroupSelect">
        <FormGroup>
          <Label>{label}</Label>
          <Select
            labelKey={"text"}
            valueKey={"id"}
            placeholder={placeholder}
            value={value}
            options={options}
            name={fieldName}
            multi={multi}
            onChange={() => this._field.get()}
          />

        </FormGroup>
      </div>
    );
  }
}

FormGroupSelect.defaultProps = {
  validatorFn: () => {
    return {valid: true};
  },
  multi: false,
  label: ""
};

FormGroupSelect.propTypes = {
  value: PropTypes.oneOf([PropTypes.array, PropTypes.string]),
  label: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  fieldSetter: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  errorsMap: PropTypes.object,
  validatorFn: PropTypes.func,
  multi: PropTypes.bool
};