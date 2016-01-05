export default class VerifyAccessService {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  verify() {
    return this.$http.get('api/auth/authentication/verify');
  }
}
