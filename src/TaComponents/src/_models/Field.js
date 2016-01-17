/* @flow */
"use strict";

import _ from "lodash";
import Q from "q";

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

const HistoryDepth = 2;

// TODO: Build async validator
export default class Field {

  constructor(options) {
    this.evaluateInContext = this.evaluateInContext.bind(this);
    this.getErrorMessages = this.getErrorMessages.bind(this);
    this.getErrors = this.getErrors.bind(this);
    this.isDirty = this.isDirty.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validate = this.validate.bind(this);

    this._updateHistory = this._updateHistory.bind(this);
    this._validateOptions = this._validateOptions.bind(this);

    if (!_.isObject(options)) {
      throw "Field options was not an object";
    }

    this._options = Object.assign({
      errorsMap: DefaultErrorMap
    }, options);

    this._validateOptions();
    this.value = undefined;
    this._valueHistory = [];
  }

  /**
   * By default, if no value is provided, the element.value is used
   * @param value
   */
  set(value = undefined) {
    this.value = value || _.get(this, "element.value", undefined);
    this._updateHistory(this.value);
    this._options.fieldSetter(this);
  }

  _validateElement() {
    if (this._options.element) {
      this._options.element.checkValidity();
      return Q.resolve(this._options.element.validity);
    }

    return Q.resolve({
      valid: true
    });
  }

  _validateCustom() {
    if (_.isFunction(this._options.validator)) {
      return this._options.validator(this.value).then(validityState => validatyState);
    }

    return Q.resolve({
      valid: true
    });
  }

  /**
   * Validates the current state of an element, and/or calls the customer validator
   */
  validate() {

    return Q.all([
      this._validateElement(),
      this._validateCustom()]).then(v => {

      const valid = v[0].valid && v[1].valid;

      this.validityState = Object.assign({}, v[0], v[1], {
        valid
      });

      return this;
    });
  }


  /**
   * Get the current validiity state validity value (defaults to false)
   * @returns {boolean}
   */
  isValid() {
    return _.get(this.validityState, "valid", false);
  }

  /**
   * The validityState can be set externally
   * @param validityState
   */
  setValidityState(validityState) {
    this.validityState = validityState;
  }


  /**
   * Projects error keys as an array
   * @returns {Array.string}
   */
  getErrors() {
    return _.keys(_.pick(this.validityState, (invalid, key) => {
      return key !== "valid" && invalid;
    }));
  }

  getErrorMessages() {
    return _.values(_.pick(this._options.errorsMap, this.getErrors()));
  }

  isDirty() {
    return this._valueHistory.length > 0;
  }

  _updateHistory(latestValue) {

    if (this._valueHistory.length > 0) {
      if (_.last(this._valueHistory) !== latestValue) {
        this._valueHistory.push(latestValue)
      }
    } else {
      this._valueHistory.push(latestValue)
    }

    if (this._valueHistory.length > HistoryDepth) {
      this._valueHistory.shift();
    }
  }

  _validateOptions() {
    let errors = [];

    // fieldSetter must be a function
    if (!_.isFunction(this._options.fieldSetter)) {
      errors.push("Field:fieldSetter options was not a function");
    }

    // when the element is provided
    if (this._options.element) {
      // it must be a DOM element
      if (!_.isElement(this._options.element)) {
        errors.push("Field:element was not a DOM element");
      } else {
        // if it is a DOM element, then if must have a 'checkValidity' function
        if (!_.isFunction(this._options.element.checkValidity)) {
          errors.push("Field:element does not have the 'checkValidity' function available");
        }
      }

      if (!this._options.modelPropertyName) {
        this._options.modelPropertyName = $(element).data("model-property-name") || element.name;
      }

      if (!this._options.modelPropertyName) {
        errors.push(`Field:modelPropertyName was not specified,
         and could not be obtained from the data-model-property-name or element.name values`);
      }

    } else {
      if (!_.isFunction(this._options.validator)) {
        errors.push("Field:element was not provided, so expected a validator function to be")
      }

      if (!this._options.modelPropertyName) {
        errors.push("Field:modelPropertyName is required");
      }
    }

    if (errors.length > 0) {
      throw errors.join("\n");
    }
  }

  /**
   * Evaluates the current instance in the context of other fields, and a model.
   * @param {object} fields - each property of fields should match the Field.modelPropertyName value
   * @param {object} model - the model representing the values of each field.  The Field.modelPropertyName
   * should match the model property.
   * @returns {{updatedFields: {object}, updatedModel: {object}, isValid: boolean}} a new object, containing immutable
   * instances of fields, the model and the updated validity state.
   */
  evaluateInContext(fields, model) {
    const p = this._options.modelPropertyName;
    const updatedFields = Object.assign({}, fields, {
      [p]: this
    });

    const updatedModel = Object.assign({}, model, {
      [p]: this.value
    });

    const isValid = _.keys(_.pick(updatedFields, field => !field.isValid())).length === 0;

    return {updatedFields, updatedModel, isValid};
  }
}