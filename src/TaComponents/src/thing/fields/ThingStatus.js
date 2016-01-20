"use strict";

import $ from "jquery";
import React, {Component, PropTypes} from "react";
import ValidityStateMessages from "../../_components/ValidityStateMessages";
import Field from "../../_components/Field";

/**
 * Uncontrolled component.  Updates are handled in the dropdown call back.
 */
export default class ThingStatus extends Component {

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
    const {statuses, shadowValue, name, label} = this.props;

    let items = <option/>;

    if (statuses) {
      items = statuses.map((status, key) => {
        return (<option value={status.id} key={key}>{status.text}</option>);
      });
    }

    return (
      <div className="ThingStatus">
        <Field>
          <label>{label}</label>
          <select
            ref={name}
            id={name}
            className="ui fluid search selection dropdown">
            <option value="0"/>
            {items}
          </select>
          <ValidityStateMessages shadowValue={shadowValue}/>
        </Field>
      </div>
    );
  }
}

ThingStatus.defaultProps = {};

ThingStatus.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  name: PropTypes.string.isRequired,
  shadowValue: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  statuses: PropTypes.arrayOf(PropTypes.object)
};