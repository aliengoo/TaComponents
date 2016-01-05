import _ from 'lodash';

export default class RegistrationService {
  /* @ngInject */
  constructor($http, $q, $log, toastr) {
    this.$http = $http;
    this.$q = $q;
    this.$log = $log;
    this.toastr = toastr;
  }

  register(credentials) {
    const config = {
      method: 'POST',
      url: 'api/registration/register',
      data: credentials
    };

    return this.$http(config);
  }

  doesUsernameExist(username) {
    let defer = this.$q.defer();

    const config = {
      method: 'GET',
      url: 'api/registration/does-username-exist',
      params: {
        username
      }
    };

    let onError = (res) => {
      this.$log.error(res);
      this.toastr.error('Error checking username', "Registration Error");
    };

    //TODO: RegistrationService - this code is fucking horrible.
    this.$http(config).then((res) => {
      let success = _.get(res, 'data.success', false);

      if (success) {
        let exists = _.get(res, 'data.exists', false);

        if (exists) {
          defer.reject();
        } else {
          defer.resolve();
        }

      } else {
        defer.reject(res.statusText);
      }
    }, onError);

    return defer.promise;
  }
}