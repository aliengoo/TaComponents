"use strict";

global.jQuery = require('jquery');
global.$ = global.jQuery;
require("bootstrap");

import React from "react";
import ReactDOM from "react-dom";

import router from "./router";

ReactDOM.render(router, document.getElementById("react-container"));
