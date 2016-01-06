import _ from "lodash";

export default class UserService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    const config = {
      url: "api/users/all",
      method: "GET",
      cache: true
    };

    return this.$http(config);
  }

  getUsersForSelect() {
    let defer = this.$q.defer();

    const config = {
      url: "api/user/all",
      method: "GET",
      cache: true,
      transformResponse: (json) => {
        return _.map(angular.fromJson(json), item => {
          return {
            id: item.samAccountName,
            text: `${item.firstName} ${item.lastName}`
          };
        });
      }
    };

    this.$http(config).then(
      (response) => defer.resolve(response.data),
      (err) => defer.reject(err));

    return defer.promise;
  }
}
