"use strict";

import React from "react";

export default class FetchingIndicator extends React.Component {
  render() {
    const {fetching} = this.props;

    if (fetching) {
      return (
        <div className="FetchingIndicator">
          <i className="fa fa-refresh fa-spin"/>
        </div>);
    }

    return (
      <div>
      </div>
    );
  }
}

FetchingIndicator.propTypes = {
  fetching: React.PropTypes.bool.isRequired
};