"use strict";

import React, {Component, PropTypes} from "react";
import Field from "../../_components/Field";
import DividingHeader from "../../_components/DividingHeader";
import Segment from "../../_components/Segment";
import ThingUsersSelect from "../fields/ThingUsersSelect";
import ThingTextarea from "../fields/ThingTextarea";

export default class ThingTechnicalTeamSegment extends Component {
  render() {
    const {thing, thingShadow, users, fetching, onChange} = this.props;

    return (
      <Segment color="teal" fetching={fetching}>
        <DividingHeader>Technical Team</DividingHeader>
        <ThingUsersSelect
          tooltip={{
                  content: "Select users who are most capable of supporting this thing"
                }}
          name="primaryTechnicalTeam"
          label="Primary Team"
          users={users}
          fetching={fetching}
          onChange={onChange}
          shadowValue={thingShadow.primaryTechnicalTeam}
          value={thing.primaryTechnicalTeam}
        />
        <ThingUsersSelect
          tooltip={{
                  content: "Select users that could attempt to support this system"
                }}
          name="secondaryTechnicalTeam"
          label="Secondary Team"
          users={users}
          fetching={fetching}
          onChange={onChange}
          shadowValue={thingShadow.secondaryTechnicalTeam}
          value={thing.secondaryTechnicalTeam}
        />

        <ThingTextarea
          label="Technical Team Description"
          placeholder="Provide more details about the teams"
          fetching={fetching}
          shadowValue={thingShadow.technicalTeamDescription}
          onChange={(e) => onChange("technicalTeamDescription", e.target.value)}
          value={thing.technicalTeamDescription}/>
      </Segment>
    );
  }
}

ThingTechnicalTeamSegment.defaultProps = {};

ThingTechnicalTeamSegment.propTypes = {
  thing: PropTypes.object.isRequired,
  thingShadow: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object)
};