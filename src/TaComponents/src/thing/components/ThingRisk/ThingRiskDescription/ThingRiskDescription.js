"use strict";

import React, {Component, PropTypes} from "react";
import FormGroup from "../../../../_components/FormGroup";
import Label from "../../../../_components/Label";
import FieldMessages from "../../../../_components/FieldMessages";
import Field from "../../../../_models/Field";

export default class ThingRiskDescription extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._field = new Field(
      this.props.fieldSetter,
      this.refs.ThingRiskDescription);
  }

  componentDidUpdate() {
    this.refs.ThingRiskDescription = this.props.value;
  }

  render() {
    return (
      <div className="ThingRiskDescription">
        <FormGroup>
          <Label>Description</Label>
          <textarea
            className="form-control"
            ref="ThingRiskDescription"
            rows="10"
            cols="30"
            onChange={() => this._field.set()}
          />
          <FieldMessages field={this._field}/>
        </FormGroup>
      </div>
    );
  }
}

ThingRiskDescription.defaultProps = {};

ThingRiskDescription.propTypes = {
  value: PropTypes.string,
  fieldSetter: PropTypes.func.isRequired
};