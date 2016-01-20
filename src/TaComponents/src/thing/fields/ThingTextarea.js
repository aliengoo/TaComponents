"use strict";

import Q from "q";
import _ from "lodash";
import React, {Component, PropTypes} from "react";

import Field from "../../_components/Field";
import ValidityStateMessages from "../../_components/ValidityStateMessages";
import Tooltip from "../../_components/Tooltip";
import RequiredIndicator from "../../_components/RequiredIndicator";

export default class ThingTextarea extends Component {

  render() {
    const {
      value,
      onChange,
      fetching,
      label,
      placeholder,
      shadowValue} = this.props;

    return (
      <div className="ThingTextarea">
        <Field>
          <label>{label}</label>
            <textarea
              rows="3"
              disabled={fetching}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
            />
          <ValidityStateMessages shadowValue={shadowValue}/>
        </Field>
      </div>
    );
  }
}

ThingTextarea.defaultProps = {
  value: ""
};

ThingTextarea.propTypes = {
  fetching: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.string,
  shadowValue: PropTypes.object,
  onChange: PropTypes.func.isRequired
};