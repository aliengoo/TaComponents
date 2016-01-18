"use strict";

import Q from "q";
import _ from "lodash";
import React, {Component, PropTypes} from "react";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";
import FormGroupFieldInput from "../../../_components/FormGroupFieldInput";

export default class ThingName extends React.Component {

  render() {
    const {value, onChange, fetching} = this.props;

    var options = {
      attr: {
        disabled: fetching,
        placeholder: "Enter the name here",
        type: "text"
      },
      label: "",
      name: "name",
      onChange,
      tooltip: (<span/>),
      value
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
  fetching: PropTypes.bool,
  value: PropTypes.string,
  validityState: PropTypes.object,
  onChange: PropTypes.func.isRequired
};