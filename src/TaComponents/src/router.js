"use strict";

import React from "react";
import {Router, Route} from "react-router";
import Home from "./home/Home";
import Thing from "./thing/Thing";
import ThingView from "./thing/ThingView";

let router = (
  <Router>
    <Route path="/" component={Home}/>
    <Route path="/thing" component={Thing}/>
    <Route path="/thing/:id" component={Thing}/>
    <Route path="/thing/:id/view" component={ThingView}/>
  </Router>
);

export default router;