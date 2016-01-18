"use strict";

import _ from "lodash";
import React from "react";

export default class ValidityStateMessages extends React.Component {
  render() {
    const {validityState} = this.props;

    if (!validityState) {
      return <div></div>;
    }

    const messages = _.values(validityState.messages);

    return (
      <div className="ValidityStateMessages">
        {messages.map((message, key) =>
          <span className="help-block" key={key}>{message}</span>)}
      </div>
    );
  }
}

ValidityStateMessages.propTypes = {
  validityState: React.PropTypes.object
};