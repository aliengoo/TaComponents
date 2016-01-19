"use strict";

import $ from "jquery";
import React, {Component, PropTypes} from "react";
import ValidityStateMessages from "../../../_components/ValidityStateMessages";
import Field from "../../../_components/Field";
import Tooltip from "../../../_components/Tooltip";

/**
 * Uncontrolled component.  Updates are handled in the dropdown call back.
 */
export default class ThingUsersSelect extends Component {

  componentDidMount() {
    $(`#${this.props.name}`).dropdown({
      onChange: (value) => {
        this.props.onChange(this.props.name, value)
      }
    });
  }

  componentDidUpdate() {
    $(`#${this.props.name}`).dropdown('set selected', this.props.value);
  }

  render() {
    const {users, shadowValue, name, label, tooltip} = this.props;

    let options = <option/>;

    if (users) {
      options = users.map((user, key) => {
        return (<option value={user.samAccountName} key={key}>{user.displayName}</option>);
      });
    }
    let tooltipContent = "";

    if (tooltip) {
      tooltipContent = <Tooltip {...tooltip} containerId={name}/>;
    }

    return (
      <div className="ThingUsersSelect">
        <Field>
          <label>{label} {tooltipContent}</label>
          <select
            multiple="multiple"
            ref={name}
            id={name}
            className="ui fluid search dropdown">
            <option value={0}/>
            {options}
          </select>
          <ValidityStateMessages shadowValue={shadowValue}/>
        </Field>
      </div>
    );
  }
}

ThingUsersSelect.defaultProps = {};

ThingUsersSelect.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.object,
  shadowValue: PropTypes.object,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object)
};