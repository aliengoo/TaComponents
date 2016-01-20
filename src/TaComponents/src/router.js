"use strict";

import React from "react";
import {Router, Route} from "react-router";
import Home from "./home/Home";
import ThingEditorView from "./thing/ThingEditorView";


let router = (
  <Router>
    <Route path="/" component={Home}/>
    <Route path="/thing" component={ThingEditorView}/>
    <Route path="/thing/:id" component={ThingEditorView}/>
  </Router>
);

export default router;