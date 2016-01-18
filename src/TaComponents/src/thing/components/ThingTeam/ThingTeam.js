"use strict";

import _ from "lodash";
import React, {PropTypes} from "react";
import FormGroupFieldSelect from "../../../_components/FormGroupFieldSelect";

export default class ThingTeam extends React.Component {

  render() {
    const {value, users, label, name, placeholder, tooltip, requiredIndicator} = this.props;

    return (
      <div className="ThingTeam">
        <FormGroupFieldSelect label={label}
          labelKey={"displayName"}
          valueKey={"samAccountName"}
          placeholder={placeholder}
          value={value}
          options={users}
          multi={true}
          name={name}
          onChange={this._onChange}
        />
      </div>
    );
  }
}

ThingTeam.propTypes = {
  errorsMap: PropTypes.object,
  name: PropTypes.string.isRequired,
  fieldSetter: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  tooltip: PropTypes.node,
  requiredIndicator: PropTypes.node,
  users: PropTypes.array,
  validatorFn: PropTypes.func.isRequired,
  value: PropTypes.array
};