"use strict";

import _ from "lodash";
import React, {PropTypes} from "react";
import Field from "../../../_models/Field";
import FormGroup from "../../../_components/FormGroup";
import Label from "../../../_components/Label";
import FieldMessages from "../../../_components/FieldMessages";
import Select from "react-select";

export default class ThingTeam extends React.Component {

  constructor(props) {
    super(props);

    this._onChange = _.debounce(this._onChange, 500).bind(this);
    this._rawSelectValueAdapter = this._rawSelectValueAdapter.bind(this);
  }

  componentDidMount() {
    this._field = new Field(
      this.props.fieldSetter,
      undefined,
      this.props.validatorFn,
      this.props.fieldName,
      this.props.errorsMap
    );
  }

  _onChange(values) {
    this._field.set(this._rawSelectValueAdapter(values));
  }

  _rawSelectValueAdapter(r = "") {
    return _.filter(r.split(","), v => !!v);
  }

  render() {
    const {editable, value, users, label, fieldName, placeholder, tooltip, requiredIndicator} = this.props;

    const inputContent = (
      <div>
        <Select
          labelKey={"name"}
          valueKey={"samAccountName"}
          placeholder={placeholder}
          value={value}
          options={users}
          multi={true}
          name={fieldName}
          onChange={this._onChange}
        />
        <FieldMessages field={this._field}/>
      </div>
    );

    const staticContent = (<p className="form-control-static">{value}</p>);

    return (
      <div className="ThingTeam">
        <FormGroup>
          <Label>{label} {requiredIndicator} {tooltip} </Label>
          {editable ? inputContent : staticContent}
        </FormGroup>
      </div>
    );
  }
}

ThingTeam.propTypes = {
  editable: PropTypes.bool.isRequired,
  errorsMap: PropTypes.object,
  fieldName: PropTypes.string.isRequired,
  fieldSetter: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  tooltip: PropTypes.node,
  requiredIndicator: PropTypes.node,
  users: PropTypes.array,
  validatorFn: PropTypes.func.isRequired,
  value: PropTypes.array
};