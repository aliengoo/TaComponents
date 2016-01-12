"use strict";

import React from "react";

export default class User extends React.Component {
  render() {
    const {user, fetching} = this.props;

    var jsx = (<div></div>);

    if (fetching) {
      jsx = (<div><i className="fa fa-spinner fa-spin"/></div>);
    } else {
      if (user) {
        const stringUser = JSON.stringify(user, null, 2);

        jsx = (
          <article>
            <pre>{stringUser}</pre>
          </article>);
      } else {
        jsx =  (
          <article>
            User not found
          </article>);
      }
    }

    return jsx;
  }
}

User.propTypes = {
  user: React.PropTypes.object,
  fetching: React.PropTypes.bool
};