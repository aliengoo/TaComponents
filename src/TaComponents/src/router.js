"use strict";

import React from "react";
import {Router, Route} from "react-router";
import Home from "./home/Home";
import Thing from "./thing/Thing";

let router = (
  <Router>
    <Route path="/" component={Home}/>
    <Route path="/thing" component={Thing}/>
    <Route path="/thing/:id/:mode" component={Thing}/>
  </Router>
);

export default router;