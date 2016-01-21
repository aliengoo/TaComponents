"use strict";

import React, {Component, PropTypes} from "react";
import DividingHeader from "../../_components/DividingHeader";
import Segment from "../../_components/Segment";
import Field from "../../_components/Field";
import Fields from "../../_components/Fields";
import ThingName from "../fields/ThingName";
import ThingTextarea from "../fields/ThingTextarea";

export default class ThingDetailsSegment extends Component {
  render() {
    const {thing, thingShadow, fetching, onChange} = this.props;

    return (
      <Segment color="green" fetching={fetching}>
        <DividingHeader>Basic Details</DividingHeader>
        <ThingName
          fetching={fetching}
          shadowValue={thingShadow.name}
          onChange={onChange}
          value={thing.name}/>

        <ThingTextarea
          label="Description"
          placeholder="Enter a description..."
          fetching={fetching}
          shadowValue={thingShadow.description}
          onChange={(e) => onChange("description", e.target.value)}
          value={thing.description}/>
      </Segment>
    );
  }
}

ThingDetailsSegment.defaultProps = {};

ThingDetailsSegment.propTypes = {
  thing: PropTypes.object.isRequired,
  thingShadow: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};