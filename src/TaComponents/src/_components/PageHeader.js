"use strict";

import React from "react";

export default class PageHeader extends React.Component {
  render() {
    return (
      <header>
        <h1 className="ui header">{this.props.children}</h1>
        <hr/>
      </header>
    );
  }
}