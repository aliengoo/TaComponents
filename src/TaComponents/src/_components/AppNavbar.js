"use strict";

import React from "react";
import {Navbar, Nav, Input, Button} from "react-bootstrap";

export default class AppNavbar extends React.Component {
  render() {
    return (
      <Navbar fluid>

        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Things</a>
          </Navbar.Brand>
        </Navbar.Header>

        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <Input type="text" placeholder="Search"/>
            {' '}
            <Button type="submit"><i className="fa fa-search"/></Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}