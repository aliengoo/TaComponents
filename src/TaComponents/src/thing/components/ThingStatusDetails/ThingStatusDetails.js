"use strict";

import Q from "q";
import _ from "lodash";
import React, {Component, PropTypes} from "react";

import Field from "../../../_components/Field";
import ValidityStateMessages from "../../../_components/ValidityStateMessages";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";

export default class ThingStatusDetails extends Component {

  render() {
    const {value, onChange, fetching, shadowValue} = this.props;

    return (
      <div className="ThingStatusDetails">
        <Field>
          <label>Status Details</label>
            <textarea
              rows="5"
              disabled={fetching}
              placeholder={"Provide more information about the current and intended status"}
              type="text"
              ref="statusDetails"
              onChange={() => onChange("statusDetails", this.refs.statusDetails.value)}
              value={value}
            />
          <ValidityStateMessages shadowValue={shadowValue}/>

        </Field>
      </div>
    );
  }
}

ThingStatusDetails.defaultProps = {
  value: ""
};

ThingStatusDetails.propTypes = {
  fetching: PropTypes.bool,
  value: PropTypes.string,
  shadowValue: PropTypes.object,
  onChange: PropTypes.func.isRequired
};