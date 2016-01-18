"use strict";

import _ from "lodash";
import Q from "q";
import React from "react";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";
import FormGroupFieldSelect from "../../../_components/FormGroupFieldSelect";

export default class ThingCurrentStatus extends React.Component {

  render() {
    const {fieldSetter, statuses, value} = this.props;
    const options = {
      errorsMap: {
        valueMissing: "You must select the current status"
      },
      fieldSetter,
      label: (<span>Current status <RequiredIndicator/></span>),
      labelKey: "text",
      name: "currentStatusId",
      options: statuses,
      tooltip: (
        <Tooltip container="ThingCurrentStatus">
          <p>What is the current status of this thing?</p>
        </Tooltip>
      ),
      value,
      validator: (value) => {
        var valid = false;

        if (_.isArray(value) || _.isString(value)) {
          valid = value.length > 0;
        }

        return Q.resolve({
          valid
        });
      },
      valueKey: "id"
    };

    return (
      <div className="ThingCurrentStatus">
        <FormGroupFieldSelect {...options}/>
      </div>
    );
  }
}

ThingCurrentStatus.propTypes = {
  fieldSetter: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  statuses: React.PropTypes.arrayOf(React.PropTypes.object)
};

