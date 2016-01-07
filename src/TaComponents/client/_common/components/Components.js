import angular from "angular";
import Services from "../services/Services";

import authenticatedNavbar from "./navbar/authenticatedNavbar";
import container from "./container/container";
import containerFluid from "./containerFluid/containerFluid";
import controlLabel from "./controlLabel/controlLabel";
import errorBlock from "./errorBlock/errorBlock";
import formGroup from "./formGroup/formGroup";
import navbar from "./navbar/navbar";
import navbarHeader from "./navbar/navbarHeader";
import pageHeader from "./pageHeader/pageHeader";
import requiredIndicator from "./requiredIndicator/requiredIndicator";
import select2 from "./select2/select2";

const Components = angular.module('Components', [Services.name])
  .directive('authenticatedNavbar', authenticatedNavbar)
  .directive('container', container)
  .directive('containerFluid', containerFluid)
  .directive('controlLabel', controlLabel)
  .directive('errorBlock', errorBlock)
  .directive('formGroup', formGroup)
  .directive('navbar', navbar)
  .directive('navbarHeader', navbarHeader)
  .directive('pageHeader', pageHeader)
  .directive('requiredIndicator', requiredIndicator)
  .directive('select2', select2);

export default Components;

