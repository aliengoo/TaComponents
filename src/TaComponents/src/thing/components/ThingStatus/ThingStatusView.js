"use strict";

import _ from "lodash";
import React, {PropTypes} from "react";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";

export default class ThingStatusView extends React.Component {

  render() {
    const {value, label, statuses} = this.props;

    let statusLabel = "";
    let className = "";

    if (value && statuses.length > 0) {
      var selectedOption = _.find(statuses, o => o.value === value);

      if (selectedOption) {
        statusLabel = selectedOption.label;
        className = `status-${value}`;
      }
    }

    return (
      <div className="ThingStatusView">
        <FormGroup>
          <Label>{label}</Label>
          <div>
            <span className={className}>
              {statusLabel}
            </span>
          </div>
        </FormGroup>
      </div>
    );
  }
}

ThingStatusView.defaultProps = {
  value: "",
  statuses: []
};

ThingStatusView.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  statuses: PropTypes.arrayOf(PropTypes.object)
};