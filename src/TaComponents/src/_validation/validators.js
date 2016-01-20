"use strict";

import _ from "lodash";
import Q from "q";

export function valueMissing() {
  return (value) => {
    return Q.resolve({
      valueMissing: !value
    });
  };
}

export function patternMismatch(pattern) {
  if (!_.isRegExp(pattern)) {
    throw "patternMismatch: pattern provided was not a regular expression";
  }

  return (value) => {
    return Q.resolve({
      patternMismatch: !pattern.test(value)
    });
  };
}

export function rangeOverflow(upperBound) {

  if (!_.isNumber(upperBound)) {
    throw "rangeOverflow: the upperBound was not a number";
  }

  return (value) => {
    if (!_.isNumber(value)) {
      throw `rangeOverflow: Expected a numeric value,
        but got the type '${typeof value}' for the value '${value}' - you will need to convert the value first.`;
    }

    return Q.resolve({
      rangeOverflow: !(value > upperBound)
    });
  };
}

export function rangeUnderflow(lowerBound) {

  if (!_.isNumber(lowerBound)) {
    throw "rangeUnderflow: the lowerBound was not a number";
  }

  return (value) => {
    if (!_.isNumber(value)) {
      throw `rangeUnderflow: Expected a numeric value,
        but got the type '${typeof value}' for the value '${value}' - you will need to convert the value first.`;
    }

    return Q.resolve({
      rangeUnderflow: !(value < lowerBound)
    });
  };
}

export function tooShort(minLength) {
  if (!_.isNumber(minLength)) {
    throw "tooShort: the minLength was not a number";
  }

  return (value) => {
    // no valid, then it's fine
    if (!value) {
      return Q.resolve({
        tooShort: false
      });
    } else {
      if (!_.isString(value)) {
        throw `tooShort: Expected a string value,
          but got the type '${typeof value}' for the value '${value}' - you will need to convert the value first.`;
      } else {
        return Q.resolve({
          tooShort: value.length < minLength
        });
      }
    }
  };
}

export function tooLong(maxLength) {
  if (!_.isNumber(maxLength)) {
    throw "tooLong: the maxLength was not a number";
  }

  return (value) => {

    // no valid, then it's fine
    if (!value) {
      return Q.resolve({
        tooLong: false
      });
    } else {
      if (!_.isString(value)) {
        throw `tooLong: Expected a string value,
          but got the type '${typeof value}' for the value '${value}' - you will need to convert the value first.`;
      } else {
        return Q.resolve({
          tooLong: !(value.length > maxLength)
        });
      }
    }
  };
}

export function invalidEmail() {
  const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return (value) => {
    if (!value) {
      return Q.resolve({
        invalidEmail: false
      });
    }

    if (!_.isString(value)) {
      throw `invalidEmail: Expected a string value,
          but got the type '${typeof value}' for the value '${value}' - you will need to convert the value first.`;
    }

    return Q.resolve({
      invalidEmail: !pattern.test(value)
    });
  };
}

export function invalidUrl() {
  const pattern = /^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/gmi;

  return (value) => {
    if (!value) {
      return Q.resolve({
        invalidUrl: false
      });
    }

    if (!_.isString(value)) {
      throw `invalidUrl: Expected a string value,
          but got the type '${typeof value}' for the value '${value}' - you will need to convert the value first.`;
    }

    return Q.resolve({
      invalidUrl: !pattern.test(value)
    });
  };
}

export function notANumber() {
  return (value) => {
    return Q.resolve({
      notANumber: !_.isNumber(value)
    });
  };
}

export function notOneOf(items) {

  if (!_.isArray(items)) {
    throw `notOneOf: Expected an array of items`;
  }

  return (value) => {
    return Q.resolve({
      notOneOf: items.indexOf(value) === -1
    });
  };
}