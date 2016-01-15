"use strict";

import React from "react";

export default class ContainerFluid extends React.Component {
  render() {
    return <div className="container-fluid">{this.props.children}</div>
  }
}