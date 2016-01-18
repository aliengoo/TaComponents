"use strict";

import React, {Component, PropTypes} from "react";
import FormGroup from "../../../../_components/FormGroup";
import Label from "../../../../_components/Label";
import ValidityStateMessages from "../../../../_components/ValidityStateMessages";

export default class ThingRiskDescription extends Component {

  render() {
    const {name, onChange, validityState} = this.props;

    return (
      <div className="ThingRiskDescription">
        <FormGroup>
          <Label>Description</Label>
          <textarea
            className="form-control"
            ref="ThingRiskDescription"
            rows="10"
            cols="30"
            onChange={() => onChange({
              [name]: this.refs[name].value
            })}
          />
          <ValidityStateMessages validityState={validityState}/>
        </FormGroup>
      </div>
    );
  }
}

ThingRiskDescription.defaultProps = {};

ThingRiskDescription.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validityState: PropTypes.object
};