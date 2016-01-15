"use strict";

import React, {Component, PropTypes} from "react";
import Markdown from "react-remarkable";

import Label from "../../../_components/Label";

export default class ThingDescriptionView extends Component {
  render() {
    const {description} = this.props;

    if (!description) {
      return (<div></div>);
    }

    return (
      <div className="ThingDescriptionView">
        <div className="col-lg-12">
          <Label>Description</Label>
          <div className="mdContainer">
            <Markdown source={description} container="div"/>
          </div>
        </div>
      </div>
    );
  }
}

ThingDescriptionView.propTypes = {
  description: PropTypes.string
};