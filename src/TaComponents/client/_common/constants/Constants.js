import angular from "angular";

const Constants = angular.module("Constants", []);

Constants
  .constant("AccessTokenKey", "accessToken")
  .constant("OnVerificationErrorStateName", "login")
  .constant("DefaultUnauthorizedStateName", "login")
  .constant("DefaultAuthorizedStateName", "home");

export default Constants;