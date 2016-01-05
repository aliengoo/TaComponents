import angular from "angular";
import Services from "../services/Services";

import authenticatedNavbar from "./navbar/authenticatedNavbar";
import container from "./container";
import containerFluid from "./containerFluid";
import controlLabel from "./controlLabel";
import errorBlock from "./errorBlock";
import formGroup from "./formGroup";
import navbar from "./navbar/navbar";
import navbarHeader from "./navbar/navbarHeader";
import pageHeader from "./PageHeader";

const Components = angular.module('Components', [Services.name])
  .directive('authenticatedNavbar', authenticatedNavbar)
  .directive('container', container)
  .directive('containerFluid', containerFluid)
  .directive('controlLabel', controlLabel)
  .directive('errorBlock', errorBlock)
  .directive('formGroup', formGroup)
  .directive('navbar', navbar)
  .directive('navbarHeader', navbarHeader)
  .directive('pageHeader', pageHeader);

export default Components;

