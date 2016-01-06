import angular from "angular";
import "angular-animate";
import "angular-local-storage";
import "angular-ui-bootstrap";

import Constants from "../constants/Constants";

import LogoutService from "./LogoutService";
import StorageService from "./StorageService";
import UserNotifierService, {userNotifierServiceConfig} from "./UserNotifierService";
import UserService from "./UserService";

import VerifyAccessService from "./VerifyAccessService";

import AccessTokenInterceptorService from "./AccessTokenInterceptorService";
import ResponseExtendInterceptorService from "./ResponseExtendInterceptorService";

export default angular.module("Services", [

  // vendor modules
  "LocalStorageModule",
  "ngAnimate",
  "toastr",
  "ui.bootstrap",

  // app modules
  Constants.name
]).service("storageService", StorageService)
  .service("userNotifierService", UserNotifierService)
  .service("logoutService", LogoutService)
  .service("accessTokenInterceptorService", AccessTokenInterceptorService)
  .service("responseExtendInterceptorService", ResponseExtendInterceptorService)
  .service("verifyAccessService", VerifyAccessService)
  .service("userService", UserService)
  .config(userNotifierServiceConfig);
