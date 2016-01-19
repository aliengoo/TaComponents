"use strict";

import React, {PropTypes} from "react";
import ReactTooltip from "react-tooltip";

export default class Tooltip extends React.Component {

  componentDidMount() {
    $(`[data-container-id="${this.props.containerId}"]`).popup();
  }
  render() {
    const {title, content, containerId} = this.props;

    return (
      <span data-content={content} data-title={title} data-container-id={containerId}>
        <i className="info circle icon"/>
      </span>
    );
  }
}

Tooltip.propTypes = {
  containerId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string
};