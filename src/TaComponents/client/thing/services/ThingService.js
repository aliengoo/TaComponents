import _ from "lodash";

export default class ThingService {
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
  }

  isNameUnique(name, id) {
    var config = {
      method: "GET",
      url: `api/thing/is-name-unique`,
      params: {
        id,
        name
      }
    };
    return this.$http(config);
  }

  get(id) {
    return this.$http.get(`api/thing/${id}`);
  }

  insert(thing) {
    return this.$http.post(`api/thing`, thing);
  }

  update(thing) {
    return this.$http.put(`api/thing/${thing._id}`, thing);
  }

  remove(id) {
    return this.$http.delete(`api/thing/${id}`);
  }

  getRiskLevels() {
    return this.$http.get("api/risk-level").then((response) => {
        return response.data;
      }
    );
  }

  getStatuses() {
    return this.$http.get("api/status").then((response) => {
        return response.data;
      }
    );
  }
}