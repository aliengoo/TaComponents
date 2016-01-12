"use strict";

import React from "react";

export default class Label extends React.Component {
  render() {
    return (
      <label className="control-label" htmlFor={this.props.htmlFor || ""}>
        {this.props.children}
      </label>
    );
  }
}

Label.propTypes = {
  htmlFor: React.PropTypes.string
};