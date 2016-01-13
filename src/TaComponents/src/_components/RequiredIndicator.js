"use strict";

import React from "react";

export default class RequiredIndicator extends React.Component {
  render() {
    const {content} = this.props;

    return (
      <div className="RequiredIndicator">
        {content}
      </div>
    );
  }
}

RequiredIndicator.defaultProps = {
  content: <small>(required)</small>
};

RequiredIndicator.propTypes = {
  content: React.PropTypes.node
};