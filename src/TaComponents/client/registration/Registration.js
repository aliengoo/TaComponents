// vendor dependencies
import angular from "angular";
import "angular-ui-router";
import "angular-toastr";

// app dependencies
import Services from "../../_services/Services";

// module dependencies
import RegistrationService from "./RegistrationService";
import RegistrationController from "./RegistrationController";

import registrationPasswordInput from "./_components/registrationPasswordInput";
import registrationUsernameInput from "./_components/registrationUsernameInput";
import template from "./registration.html";

// module declaration
const Registration = angular.module("Registration", [
  "toastr",
  "ui.router",
  Services.name
]);

/* @ngInject */
function registrationConfig($stateProvider) {
  $stateProvider.state("registration", {
    url: "/registration",
    controller: RegistrationController,
    controllerAs: "registration",
    auth: false,
    template
  });
}

Registration.config(registrationConfig);

Registration.service("registrationService", RegistrationService);

Registration.directive("registrationUsernameInput", registrationUsernameInput);
Registration.directive("registrationPasswordInput", registrationPasswordInput);

export default Registration;