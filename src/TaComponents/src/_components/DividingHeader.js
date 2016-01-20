"use strict";

import React, {Component, PropTypes} from "react";

export default class DividingHeader extends Component {
  render() {
    return (
      <h3 className="ui dividing header">
        {this.props.icon}
        <div className="content">
          {this.props.children}
        </div>
      </h3>
    );
  }
}

DividingHeader.propTypes = {
  icon: PropTypes.node
};