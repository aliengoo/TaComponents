import _ from 'lodash';
import HttpStatus from 'http-status';

function isDataString() {
  return _.isString(this.data);
}

function isDataObject() {
  return _.isObject(this.data);
}

function getDataValue(key, defaultValue = undefined) {
  return _.get(this.data, key, defaultValue);
}

function checkHttpStatus(statusCode) {
  return () => this.status === statusCode;
}

export default class ResponseExtendInterceptorService {
  /* @ngInject */
  constructor($q) {
    this.$q = $q;
    this.response = this.response.bind(this);
    this.responseError = this.responseError.bind(this);
  }

  static _extend(res) {
    res.isDataString = isDataString.bind(res);
    res.isDataObject = isDataObject.bind(res);
    res.getDataValue = getDataValue.bind(res);
    res.isUnauthorized = checkHttpStatus.bind(res, HttpStatus.UNAUTHORIZED);
    res.isForbidden = checkHttpStatus.bind(res, HttpStatus.FORBIDDEN);
    res.isOk = checkHttpStatus.bind(res, HttpStatus.OK);
    return res;
  }

  response(res) {
    return ResponseExtendInterceptorService._extend(res);
  }

  responseError(res) {
    return this.$q.reject(ResponseExtendInterceptorService._extend(res));
  }
}




