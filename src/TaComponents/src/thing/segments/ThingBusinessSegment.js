"use strict";

import React, {Component, PropTypes} from "react";

import Field from "../../_components/Field";
import DividingHeader from "../../_components/DividingHeader";
import Segment from "../../_components/Segment";
import ThingTextarea from "../fields/ThingTextarea";
import ThingUsersSelect from "../fields/ThingUsersSelect";

export default class ThingBusinessSegment extends Component {
  render() {
    const {thing, thingShadow, users, fetching, onChange} = this.props;
    return (
      <Segment fetching={fetching} color="red">
        <DividingHeader>Business</DividingHeader>

        <ThingUsersSelect
          tooltip={{
                        content: "Who is/are considered the business owner(s)"
                      }}
          name="businessOwners"
          label="Business Owners"
          users={users}
          fetching={fetching}
          onChange={onChange}
          shadowValue={thingShadow.businessOwners}
          value={thing.businessOwners}
        />

      </Segment>
    );
  }
}

ThingBusinessSegment.defaultProps = {};

ThingBusinessSegment.propTypes = {
  thing: PropTypes.object.isRequired,
  thingShadow: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object)
};