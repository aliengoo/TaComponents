"use strict";

import _ from "lodash";
import $ from "jquery";
import React from "react";
import FormGroupFieldTextarea from "../../../_components/FormGroupFieldTextArea";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";

export default class ThingDescription extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {value, fieldSetter, fetching} = this.props;

    const tooltip = (
      <Tooltip container="ThingDescription">
        <p>Provide a short description of what this thing is.</p>
      </Tooltip>
    );

    var options = {
      fieldSetter,
      value,
      label: "Description",
      name: "description",
      errorsMap: {},
      tooltip,
      attr: {
        className: "form-control",
        rows: 5,
        disabled: fetching,
        placeholder: "Enter some sort of description"
      }
    };

    return (
      <div className="ThingDescription">
        <FormGroupFieldTextarea {...options}/>
      </div>
    );
  }
}

ThingDescription.defaultProps = {
  value: ""
};

ThingDescription.propTypes = {
  fetching: React.PropTypes.bool,
  value: React.PropTypes.string,
  fieldSetter: React.PropTypes.func.isRequired
};