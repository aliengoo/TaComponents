export default class AccessTokenInterceptorService {
  /* @ngInject */
  constructor(AccessTokenKey, storageService) {
    this.AccessTokenKey = AccessTokenKey;
    this.storageService = storageService;
    this.request = this.request.bind(this);

    this._retrieveToken = this._retrieveToken.bind(this);
    this._assignTokenFn = this._assignTokenFn.bind(this);
  }

  _retrieveToken() {
    return this.storageService.get(this.AccessTokenKey);
  }

  _assignTokenFn(config) {
    return (accessToken) => {
      if (accessToken) {
        config.headers['x-access-token'] = accessToken;
      }

      return config;
    };
  }

  request(config) {
    return this._retrieveToken()
      .then(this._assignTokenFn(config));
  }

}

