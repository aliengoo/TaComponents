"use strict";

import _ from "lodash";
import React, {Component, PropTypes} from "react";

export default class ValidityStateMessages extends Component {
  render() {
    const {shadowValue, showOnlyWhenDirty} = this.props;

    const valid = _.get(shadowValue, "$valid");
    const show = _.get(shadowValue, "$dirty", false) && showOnlyWhenDirty;

    if (valid || !show) {
      return <div></div>;
    }

    const messages = _.values(shadowValue.$messages);

    return (
      <div className="ValidityStateMessages">
        {messages.map((message, key) =>
          <div className="help-block" key={key}>{message}</div>)}
      </div>
    );
  }
}

ValidityStateMessages.defaultProps = {
  showOnlyWhenDirty: true
};

ValidityStateMessages.propTypes = {
  showOnlyWhenDirty: PropTypes.bool,
  shadowValue: PropTypes.object
};