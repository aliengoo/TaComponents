"use strict";

import React, {Component, PropTypes} from "react";

export default class DividingHeader extends Component {
  render() {
    return (
      <h4 className="ui dividing header">
        {this.props.children}
      </h4>
    );
  }
}