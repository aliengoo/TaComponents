"use strict";

import React, {Component, PropTypes} from "react";
import Field from "../../_components/Field";
import DividingHeader from "../../_components/DividingHeader";
import Segment from "../../_components/Segment";
import ThingStatus from "../fields/ThingStatus";
import ThingTextarea from "../fields/ThingTextarea";

export default class ThingStatusSegment extends Component {
  render() {
    const {thing, thingShadow, statuses, fetching, onChange} = this.props;

    return (
      <Segment fetching={fetching} color="blue">
        <DividingHeader>Status</DividingHeader>

        <div className="two fields">
          <Field>
            <ThingStatus
              name="currentStatusId"
              label="Current Status"
              statuses={statuses}
              fetching={fetching}
              onChange={onChange}
              shadowValue={thingShadow.currentStatusId}
              value={thing.currentStatusId}
            />
          </Field>

          <Field>
            <ThingStatus
              name="intendedStatusId"
              label="Intended Status"
              statuses={statuses}
              fetching={fetching}
              onChange={onChange}
              shadowValue={thingShadow.intendedStatusId}
              value={thing.intendedStatusId}
            />
          </Field>
        </div>
        <ThingTextarea
          label="Status Description"
          placeholder="Provide more details about the status..."
          fetching={fetching}
          shadowValue={thingShadow.statusDescription}
          onChange={(e) => onChange("statusDescription", e.target.value)}
          value={thing.statusDescription}/>
      </Segment>
    );
  }
}

ThingStatusSegment.propTypes = {
  thing: PropTypes.object.isRequired,
  thingShadow: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  statuses: PropTypes.arrayOf(PropTypes.object)
};