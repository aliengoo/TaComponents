"use strict";

import _ from "lodash";

const DefaultErrorMap = {
  customError: "An error occurred",
  patternMismatch: "The value does not match the expected pattern",
  rangeOverflow: "The value is too high",
  rangeUnderflow: "The value is too low",
  stepMismatch: "The value is not valid",
  tooLong: "The value is too long",
  tooShort: "The value is too short",
  typeMismatch: "The value does is not in the correct syntax",
  valueMissing: "The value is required"
};

export {
  DefaultErrorMap
};

export default class Field {
  constructor(fieldSetter, element, validatorFn, fieldName, errorsMap = DefaultErrorMap) {

    if (!fieldSetter || !_.isFunction(fieldSetter)) {
      throw "Field expects a field setter";
    }

    this._fieldSetter = fieldSetter;

    if (element) {
      this.element = element;
    } else if (validatorFn) {
      if (_.isUndefined(fieldName)) {
        throw "Field with validatorFn requires field name";
      }
      this.fieldName = fieldName;
      this.validatorFn = validatorFn;
    } else {
      throw "Field required either a HTMLElement or a validatorFn";
    }

    this.errorsMap = errorsMap;

    if (element) {
      this.fieldName = $(element).data("field-name");

      if (!this.fieldName) {
        throw "Field expects the element to have a field-name attribute";
      }

      this.element = element;
      this.value = undefined;
    }

    this.getErrorMessages = this.getErrorMessages.bind(this);
    this.getErrors = this.getErrors.bind(this);
    this.validate = this.validate.bind(this);
    this.isValid = this.isValid.bind(this);
  }


  /**
   * By default, if no value is provided, the element.value is used
   * @param value
   */
  set(value = undefined) {
    this.value = value || _.get(this, "element.value", undefined);
    this.validate();
    this._fieldSetter(this);
  }

  validate() {
    if (this.element) {
      this.element.checkValidity();
      this.validityState = this.element.validity;
    } else if (this.validatorFn) {
      this.validityState = this.validatorFn(this.value);
    }
  }

  isValid() {
    return _.get(this.validityState, "valid");
  }

  static areAllValid(fields) {
    return _.keys(_.pick(fields, field => !field.isValid())).length === 0;
  }

  getErrors() {
    return _.keys(_.pick(this.validityState, (invalid, key) => {
      return key !== "valid" && invalid;
    }));
  }

  getErrorMessages() {
    return _.values(_.pick(this.errorsMap, this.getErrors()));
  }
}