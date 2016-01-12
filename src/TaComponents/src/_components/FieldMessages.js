"use strict";

import _ from "lodash";
import React from "react";

export default class FieldMessages extends React.Component {
  render() {
    const {field} = this.props;

    if (!field) {
      return <div></div>;
    }

    const errorMessages = field.getErrorMessages();

    return (
      <div className="FieldMessages">
        {errorMessages.map((errorMessage, key) =>
          <span className="help-block" key={key}>{errorMessage}</span>)}
      </div>
    );
  }
}

FieldMessages.propTypes = {
  field: React.PropTypes.object
};