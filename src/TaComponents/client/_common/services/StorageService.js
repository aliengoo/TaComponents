export default class Storage {
  /* @ngInject */
  constructor($q, localStorageService) {
    this.$q = $q;
    this.localStorageService = localStorageService;
  }

  /**
   * Set sets the value using the provided key and returns a promise
   * @param key
   * @param value
   * @returns {Promise}
   */
  set(key, value) {
    this.localStorageService.set(key, value);
    return this.$q.when(value);
  }

  /**
   * Gets the value, returning it in a promise
   * @param key - the key to retrieve
   * @param defaultValue - default value when no value is found
   * @returns {Promise}
   */
  get(key, defaultValue = undefined) {
    let value = this.localStorageService.get(key) || defaultValue;
    return this.$q.when(value);
  }

}