"use strict";

import _ from "lodash";
import $ from "jquery";
import React from "react";
import Field from "../../../_models/Field";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";
import FieldMessages from "../../../_components/FieldMessages";
import Tooltip from "../../../_components/Tooltip";
import RequiredIndicator from "../../../_components/RequiredIndicator";

export default class ThingDescription extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = _.debounce(this._onChange, 500).bind(this);
  }

  componentDidMount() {
    this._field = new Field(this.props.fieldSetter, this.refs.ThingDescription);
  }

  componentDidUpdate() {
    this.refs.ThingDescription.value = this.props.value;
  }

  _onChange() {
    this._field.set();
  }

  render() {

    const {editable, value} = this.props;

    const textAreaContent = (
      <div>
        <textarea
          className="form-control"
          cols="30"
          data-field-name="description"
          placeholder="What does this thing do?"
          ref="ThingDescription"
          onChange={this._onChange}
          rows="5"
        />
        <FieldMessages field={this._field}/>
      </div>);

    const staticContent = (<p className="form-control-static">{value}</p>);

    const tooltip = (
      <Tooltip container="ThingDescription">
        <p>Provide a short description of what this thing is.</p>
      </Tooltip>
    );

    return (
      <FormGroup>
        <Label>Description {tooltip}</Label>
        {editable ? textAreaContent : staticContent}
      </FormGroup>
    );
  }
}

ThingDescription.propTypes = {
  editable: React.PropTypes.bool.isRequired,
  value: React.PropTypes.string,
  fieldSetter: React.PropTypes.func.isRequired
};