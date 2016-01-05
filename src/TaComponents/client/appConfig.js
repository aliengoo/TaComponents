/* @ngInject */
export default function appConfig($httpProvider, localStorageServiceProvider, $logProvider) {

  // Intercept all requests to the server, and assign the "x-access-token"; if available
  $httpProvider.interceptors.push("accessTokenInterceptorService");

  // extends the response from the server with convenient functions
  $httpProvider.interceptors.push("responseExtendInterceptorService");

  // disable use of "success" and "error" methods on promise returned from $http
  // See https://docs.angularjs.org/error/$http/legacy
  $httpProvider.useLegacyPromiseExtensions = false;

  // prefix local storage with the application name
  localStorageServiceProvider.setPrefix("angular-browserify.app");
  localStorageServiceProvider.setStorageType("localStorage"); // default

  // enable debug
  // TODO: Update gulpfile to inject the appropriate setting for production builds
  $logProvider.debugEnabled(true);
}