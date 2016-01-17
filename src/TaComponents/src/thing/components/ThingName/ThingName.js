"use strict";

import Q from "q";
import _ from "lodash";
import React from "react";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";
import FormGroupFieldInput from "../../../_components/FormGroupFieldInput";

export default class ThingName extends React.Component {

  constructor(props) {
    super(props);

    this._validator = this._validator.bind(this);
  }

  _validator(value) {
    return this.props.isNameUniqueFn(value).then((nameIsUnique) => {
      return {
        nameNotUnique: !nameIsUnique,
        valid: nameIsUnique
      };
    });
  }

  render() {
    const {value, fieldSetter, fetching} = this.props;

    var options = {
      fieldSetter,
      value,
      label: "Name",
      modelPropertyName: "name",
      errorsMap: {
        nameNotUnique: "This name is already in use",
        valueMissing: "You must specify a name"
      },
      validator: this._validator,
      tooltip: (<span/>),
      attr: {
        disabled: fetching,
        name: "name",
        minLength: 3,
        placeholder: "Enter the name here",
        required: true,
        type: "text"
      }
    };

    return (
      <div className="ThingName">
        <FormGroupFieldInput {...options} />
      </div>
    );
  }
}

ThingName.defaultProps = {
  value: ""
};

ThingName.propTypes = {
  fetching: React.PropTypes.bool,
  value: React.PropTypes.string,
  fieldSetter: React.PropTypes.func.isRequired,
  isNameUniqueFn: React.PropTypes.func.isRequired
};