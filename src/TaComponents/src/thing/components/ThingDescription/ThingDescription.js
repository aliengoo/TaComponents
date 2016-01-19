"use strict";

import Q from "q";
import _ from "lodash";
import React, {Component, PropTypes} from "react";

import Field from "../../../_components/Field";
import ValidityStateMessages from "../../../_components/ValidityStateMessages";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";

export default class ThingDescription extends React.Component {

  render() {
    const {value, onChange, fetching, shadowValue} = this.props;

    return (
      <div className="ThingDescription">
        <Field>
          <label>Description</label>

            <textarea
              rows="5"
              disabled={fetching}
              placeholder={"Enter a description"}
              type="text"
              ref="description"
              onChange={() => onChange("description", this.refs.description.value)}
              value={value}
            />
          <ValidityStateMessages shadowValue={shadowValue}/>

        </Field>
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
  shadowValue: PropTypes.object,
  onChange: PropTypes.func.isRequired
};