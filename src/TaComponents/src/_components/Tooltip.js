"use strict";

import React, {PropTypes} from "react";
import ReactTooltip from "react-tooltip";

export default class Tooltip extends React.Component {
  render() {
    const {title, type, effect, place, iconClasses, container} = this.props;

    let header = (<div></div>);

    if (title) {
      header = (
        <header>
          <h5>
            {title}
          </h5>
        </header>);
    }

    return (
      <span className="Tooltip">
        <a data-tip="React-tooltip" data-for={container}><i className={iconClasses}/></a>
        <ReactTooltip place={place} type={type} effect={effect} id={container}>
          {header}
          {this.props.children}
        </ReactTooltip>
      </span>
    );
  }
}

Tooltip.defaultProps = {
  title: "",
  type: "info",
  effect: "solid",
  place: "top",
  iconClasses: "fa fa-info-circle"
};

Tooltip.propTypes = {
  container: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(["success", "warning", "error", "info", "light"]),
  effect: PropTypes.oneOf(["float", "solid"]),
  place: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  iconClasses: PropTypes.string
};