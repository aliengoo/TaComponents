"use strict";

import _ from "lodash";
import React from "react";
import Field from "../../../_models/Field";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";
import FieldMessages from "../../../_components/FieldMessages";

export default class ThingName extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = _.debounce(this._onChange, 500).bind(this);
  }

  componentDidMount() {
    this._field = new Field(this.refs.ThingName, this.props.fieldSetter);
    this._field.set();
  }

  _onChange() {
    this._field.set();
  }

  render() {

    const {editable, value} = this.props;

    const inputContent = (
      <div>
        <input
          className="form-control"
          data-field-name="name"
          minLength={3}
          onChange={this._onChange}
          ref="ThingName"
          required="required"
          defaultValue={value}
          type="text"
        />
        <FieldMessages field={this._field}/>
      </div>
    );

    const staticContent = (<p className="form-control-static">{value}</p>);

    return (
      <div className="ThingName">
        <FormGroup>
          <Label>Name</Label>
          {editable ? inputContent : staticContent}
        </FormGroup>
      </div>
    );
  }
}

ThingName.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  value: React.PropTypes.string,
  fieldSetter: React.PropTypes.func.isRequired
};