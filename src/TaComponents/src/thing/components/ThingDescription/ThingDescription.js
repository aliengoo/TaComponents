"use strict";

import React, {Component, PropTypes} from "react";
import FormGroupFieldTextarea from "../../../_components/FormGroupFieldTextArea";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";

export default class ThingDescription extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {value, onChange, fetching} = this.props;

    const tooltip = (
      <Tooltip container="ThingDescription">
        <p>Provide a short description of what this thing is.</p>
      </Tooltip>
    );

    var options = {
      onChange,
      value,
      label: "Description",
      name: "description",
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
  fetching: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};