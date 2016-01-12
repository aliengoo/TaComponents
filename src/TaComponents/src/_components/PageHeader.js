"use strict";

import React from "react";

export default class PageHeader extends React.Component {
  render() {
    return (
      <header className="container">
        <h1>{this.props.children}</h1>
      </header>
    );
  }
}