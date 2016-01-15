"use strict";

import React from "react";

export default class FetchingPlaceholder extends React.Component {
  render() {
    return (
      <div className="FetchingPlaceholder">
        <i className="fa fa-refresh fa-spin"/>
      </div>);
  }
}