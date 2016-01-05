import template from './authenticatedNavbar.html';

/* @ngInject */
export default function authenticatedNavbar(logoutService, $state) {

  function link(scope) {
    const goToLogin = () => $state.go("login");
    const willSetLoadingToComplete = () => scope.loading = false;

    scope.loading = false;
    scope.logout = () => {
      scope.loading = true;

      const logoutWill = logoutService.logout();

      logoutWill.then(goToLogin).finally(willSetLoadingToComplete);
    };
  }

  //noinspection JSUnusedGlobalSymbols
  return {
    restrict: 'E',
    template,
    scope: {
      component: '@'
    },
    link
  };
}