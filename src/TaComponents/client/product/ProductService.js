import _ from "lodash";

export default class ProductService {
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
  }

  isNameUnique(name, id) {
    var config = {
      method: "GET",
      url: `api/component-product/is-name-unique`,
      params: {
        id,
        name
      }
    };
    return this.$http(config);
  }

  get(id) {
    return this.$http.get(`api/component-product/${id}`);
  }

  insert(product) {
    return this.$http.post(`api/component-product`, product);
  }

  update(product) {
    return this.$http.put(`api/component-product/${product._id}`, product);
  }

  remove(id) {
    return this.$http.delete(`api/component-product/${id}`);
  }

  getRiskLevels() {
    return this.$http.get("api/risk-level").then((response) => {
        return response.data;
      }
    );
  }

  getProductStatuses() {
    return this.$http.get("api/component-product-status").then((response) => {
        return response.data;
      }
    );
  }
}