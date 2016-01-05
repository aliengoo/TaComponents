export default class LogoutService {
  /* @ngInject */
  constructor($http, $log, $state, storageService, AccessTokenKey, userNotifierService, DefaultUnauthorizedStateName) {
    this.$http = $http;
    this.$log = $log;
    this.$state = $state;
    this.storageService = storageService;
    this.AccessTokenKey = AccessTokenKey;
    this.DefaultUnauthorizedStateName = DefaultUnauthorizedStateName;
    this.userNotifierService = userNotifierService;
  }

  logout() {
    const redirectUserToDefaultUnauthorizedState = () => {
      this.userNotifierService.info("You've logged out", "Logout Successful");
      this.$state.go(this.DefaultUnauthorizedStateName);
    };

    const informUserThatSomethingWhenWrong = (res) => {
      this.userNotifierService.info("Sorry, there was a problem during logout", "Server Error");
      this.$log.error(res);
    };

    const alwaysClearTheAccessToken = () => this.storageService.set(this.AccessTokenKey, undefined);

    return this.$http.delete('api/auth/logout')
      .then(
        redirectUserToDefaultUnauthorizedState,
        informUserThatSomethingWhenWrong)
      .finally(alwaysClearTheAccessToken);
  }
}
