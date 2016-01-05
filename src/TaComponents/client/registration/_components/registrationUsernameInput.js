import $ from 'jquery';

import template from "./registrationUsernameInput.html";

/* @ngInject */
function registrationUsernameInput(registrationService) {
  return {
    restrict: 'E',
    scope: {
      credentials: '='
    },
    template,
    link: function (scope, element) {
      const usernameNgModel = angular.element($(element).find('[name="username"]')).controller('ngModel');

      usernameNgModel.$asyncValidators.usernameExists = (modelValue, viewValue) => {
        let username = modelValue || viewValue;

        return registrationService.doesUsernameExist(username);
      };
    }
  };
}

export default registrationUsernameInput;
