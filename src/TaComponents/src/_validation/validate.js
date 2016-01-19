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

export function isValid(overallValidityState) {
  return _.keys(_.pick(overallValidityState, (value) => {
    return value.valid === false;
  })).length === 0;
}

export default function validate(currentModelState, property, value, config) {

  // pipline represents each validator
  let pipeline = [];

  if (!_.isObject(currentModelState)) {
    throw `validate: Expected a current model (for context validation)`;
  }

  if (_.isArray(config)) {
      pipeline = config;
  } else if (_.isObject(config)) {
    pipeline = _.get(config, property, []);
    if (!_.isArray(pipeline)) {
      throw `validate: expected the validators for ${property} to be an array`;
    }
  } else {
    throw "validate: Expected config argument to be an object or an array"
  }

  if (pipeline.length === 0) {
    return Q.resolve({
      valid: true
    });
  }

  var messages = _.last(pipeline);

  if (!_.isObject(messages)) {
    throw "validate: expected the last item in the validation pipeline to contain an object containing error messages";
  }

  var actualPipeline = _.takeWhile(pipeline, _.isFunction);

  let promises = _.map(actualPipeline, (fn) => {
    return fn.call(currentModelState, value);
  });

  return Q.all(promises).then((results) => {
    let validityState = Object.assign({}, ...results);

    const errorKeys = _.keys(_.pick(validityState, value => value));

    validityState.valid = errorKeys.length === 0;
    validityState.messages = _.pick(messages, errorKeys);

    return {
      validityState,
      value,
      property
    };
  });
}