// http://semantic-ui.com/elements/segment.html

"use strict";

import React, {Component, PropTypes} from "react";

export default class Segment extends Component {
  render() {
    const {fetching, color} = this.props;

    return (
      <div className={`ui ${fetching ?  "loading" : color} segment`}>
        {this.props.children}
      </div>
    );
  }
}

Segment.defaultProps = {
  fetching: false,
  color: "black"
};

Segment.propTypes = {
  fetching: PropTypes.bool,
  color: PropTypes.oneOf(["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"])
};