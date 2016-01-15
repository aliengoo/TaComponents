"use strict";

import _ from "lodash";
import React from "react";
import Field from "../../../_models/Field";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";
import FieldMessages from "../../../_components/FieldMessages";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";


export default class ThingName extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this._field = new Field(this.props.fieldSetter, this.refs.ThingName, undefined, undefined, {
      conflict: "This name is already in use",
      valueMissing: "You must specify a name"
    });
  }

  componentDidUpdate() {
    if (this.props.editable) {
      this.refs.ThingName.value = this.props.value;
    }
  }

  _onChange() {
    this._field.set();
    this.props.isNameUniqueFn(this._field.value);
  }

  render() {

    const {editable, value, isNameUnique, fetching} = this.props;

    if (!editable) {
      // don't bother showing anything, ThingHeader will display the name
      return (<div></div>);
    }

    if (this._field) {
      var currentValidityState = this._field.validityState;

      if (currentValidityState && currentValidityState.valid) {
        var newValidityState = Object.assign({}, currentValidityState, {
          conflict: !isNameUnique,
          valid: isNameUnique
        });

        this._field.setValidityState(newValidityState);
      }
    }

    return (
      <div className="ThingName">
        <div>
          <input
            diabled={fetching}
            data-field-name="name"
            minLength={3}
            onChange={this._onChange}
            placeholder="Enter the name here"
            ref="ThingName"
            required="required"
            defaultValue={value}
            type="text"
          />
          <FieldMessages field={this._field}/>
        </div>
      </div>
    );
  }
}

ThingName.defaultProps = {
  value: ""
};

ThingName.propTypes = {
  fetching: React.PropTypes.bool,
  editable: React.PropTypes.bool.isRequired,
  value: React.PropTypes.string,
  fieldSetter: React.PropTypes.func.isRequired,
  isNameUnique: React.PropTypes.bool.isRequired,
  isNameUniqueFn: React.PropTypes.func.isRequired
};