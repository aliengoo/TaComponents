"use strict";

import _ from "lodash";
import React, {Component, PropTypes} from "react";

export default class Field extends Component {
  render() {
    const {showErrorOnlyWhenDirty, shadowValue} = this.props;

    let className = "field";

    const invalid = _.get(shadowValue, "$invalid");
    const applyErrorStyle = _.get(shadowValue, "$dirty", false) && showErrorOnlyWhenDirty;

    if (invalid && applyErrorStyle) {
      className = `${className} error`;
    }

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

Field.defaultProps = {
  showErrorOnlyWhenDirty: true
};

Field.propTypes = {
  showErrorOnlyWhenDirty: PropTypes.bool,
  shadowValue: PropTypes.object
};