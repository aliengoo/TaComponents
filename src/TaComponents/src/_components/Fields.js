"use strict";

import React from "react";

export default class Fields extends React.Component {
  render() {
    return (
      <div className="fields">
        {this.props.children}
      </div>
    );
  }
}