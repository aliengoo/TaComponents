// globals references
global.angular = require("angular");
global.jQuery = require("jquery");
global.$ = global.jQuery;

// vendor level dependencies
import _ from "lodash";
import angular from "angular";
import "angular-animate";
import "angular-messages";
import "angular-ui-router";
import "angular-local-storage";
import "angular-ui-bootstrap";
import "angular-toastr";

// application level dependencies
import Services from "./_common/services/Services";

import About from "./about/About";
import AccessDenied from "./access-denied/AccessDenied";
import Error from "./error/Error";
import Home from "./home/Home";
import Product from "./product/Product";
import Products from "./products/Products";

// module level dependencies
import appConfig from "./appConfig";
import appRun from "./appRun";
import AppController from "./AppController";

const MODULE_NAME = "app";

angular.module(MODULE_NAME,
  [
    // vendor modules
    "ui.router",
    "LocalStorageModule",

    // application modules
    Services.name,
    About.name,
    AccessDenied.name,
    Error.name,
    Home.name,
    Products.name
  ])
  .config(appConfig)
  .run(appRun)
  .controller("AppController", AppController);





