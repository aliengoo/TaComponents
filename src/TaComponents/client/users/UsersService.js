export default class UsersService {
  constructor($http) {
    this.$http = $http;
  }

  get(username) {
    return this.$http.get(`api/user/${username}`);
  }

  list() {
    return this.$http.get("api/users");
  }

}
