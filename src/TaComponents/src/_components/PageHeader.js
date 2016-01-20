"use strict";

import React from "react";

export default class PageHeader extends React.Component {
  render() {
    return (
      <header className="PageHeader">
        <h1 className="ui header">{this.props.children}</h1>
      </header>
    );
  }
}