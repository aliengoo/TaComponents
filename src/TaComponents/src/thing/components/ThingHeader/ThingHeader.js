"use strict";

import React, {Component, PropTypes} from "react";
import PageHeader from "../../../_components/PageHeader";

export default class ThingHeader extends Component {
  render() {
    const {thing, isNameUnique} = this.props;

    var defaultPageHeader = (
      <div className="text-muted">
        &lt;This thing has no name&gt;
      </div>
    );

    var conflictingNamePageHeader = (
      <div className="text-danger">
        <i className="fa fa-warning"/> {thing.name}
      </div>
    );

    return (
      <PageHeader>
        {!isNameUnique ? conflictingNamePageHeader : thing.name || defaultPageHeader}
      </PageHeader>
    );
  }
}

ThingHeader.defaultProps = {
  // when viewing only, the user should not have been
  // able to reach the view without the name being unique
  isNameUnique: true
};

ThingHeader.propTypes = {
  thing: PropTypes.object.isRequired,
  isNameUnique: PropTypes.bool
};