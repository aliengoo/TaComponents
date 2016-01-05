export default class ProductService {
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
  }
  
  get(id) {
    return this.$http.get(`api/product/${id}`);
  }
  
  insert(product) {
    return this.$http.post(`api/product`, product);
  }
  
  update(product) {
    return this.$http.put(`api/product/${product._id}`, product);
  }
  
  remove(id) {
    return this.$http.delete(`api/product${id}`);
  }

  getRiskLevels() {
    return this.$http.get("api/risk-levels").then((response) => {
        return response.data;
      }
    );
  }
}