"use strict";

import Q from "q";
import _ from "lodash";
import React, {Component, PropTypes} from "react";

import Field from "../../../_components/Field";
import ValidityStateMessages from "../../../_components/ValidityStateMessages";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";

export default class ThingName extends React.Component {

  render() {
    const {value, onChange, fetching, shadowValue} = this.props;

    return (
      <div className="ThingName">
        <Field>
          <label>Name</label>
          <div className="eight wide field">
            <input
              disabled={fetching}
              placeholder={"enter a name"}
              type="text"
              ref="name"
              onChange={() => onChange("name", this.refs.name.value)}
              value={value}
            />
          </div>
          <ValidityStateMessages shadowValue={shadowValue}/>
        </Field>
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
  shadowValue: PropTypes.object,
  onChange: PropTypes.func.isRequired
};