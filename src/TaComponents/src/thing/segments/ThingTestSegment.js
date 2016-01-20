"use strict";

import React, {Component, PropTypes} from "react";

export default class ThingTestSegment extends Component {
  render() {
    return (
      <div>
        <h5 className="ui top attached header">
          Dogs
        </h5>
        <div className="ui attached segment">
          <p>Dogs are one type of animal</p>
        </div>
        <h5 className="ui attached header">
          Cats
        </h5>
        <div className="ui attached segment">
          <p>Cats are thought of as being related to dogs, but only humans think this.</p>
        </div>
        <h5 className="ui attached header">
          Lions
        </h5>
        <div className="ui attached segment">
          <p>Humans don't think of lions as being like cats, but they are.</p>
        </div>
        <div className="ui bottom attached warning message">
          <i className="warning icon"/>
          You've reached the end of this content segment!
        </div>
      </div>
    );
  }
}

ThingTestSegment.defaultProps = {};

ThingTestSegment.propTypes = {};