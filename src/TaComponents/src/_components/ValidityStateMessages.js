"use strict";

import _ from "lodash";
import React from "react";

export default class ValidityStateMessages extends React.Component {
  render() {
    const {shadowValue} = this.props;

    if (!shadowValue) {
      return <div></div>;
    }

    const messages = _.values(shadowValue.$messages);

    return (
      <div className="ValidityStateMessages">
        {messages.map((message, key) =>
          <span className="help-block" key={key}>{message}</span>)}
      </div>
    );
  }
}

ValidityStateMessages.propTypes = {
  shadowValue: React.PropTypes.object
};