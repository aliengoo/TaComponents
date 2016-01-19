"use strict";

import React from "react";

export default class Field extends React.Component {
  render() {
    return (
      <div className="field">
        {this.props.children}
      </div>
    );
  }
}