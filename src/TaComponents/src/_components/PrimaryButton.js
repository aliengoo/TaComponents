"use strict";

import React, {Component, PropTypes} from "react";

export default class PrimaryButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {disabled, onClick} = this.props;

    return (
      <button
        disabled={disabled}
        className="ui primary button"
        type="button"
        onClick={onClick}>
        {this.props.children}
      </button>
    );
  }
}

PrimaryButton.defaultProps = {
  disabled: false
};

PrimaryButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};