"use strict";

import _ from "lodash";
import Q from "q";
import Immutable from "immutable";

export default class ShadowModel {
  constructor(initialModelState) {
    this.setModel = this.setModel.bind(this);
    this.getModel = this.getModel.bind(this);
    this.getShadow = this.getShadow.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.isValid = this.isValid.bind(this);
    this._model = Immutable.Map(initialModelState || {});
    this._shadowModel = Immutable.Map({});
  }

  setModel(property, value) {
    this._model = this._model.set(property, value);

    return this.getModel();
  }

  getModel() {
    return this._model.toJS();
  }

  getShadow() {
    return this._shadowModel.toJS();
  }

  isValid(shadowModelJS) {

    const failingProperties =  _.pick(shadowModelJS, (value) => {
      return value.$valid === false;
    });

    return _.keys(failingProperties).length === 0;
  }

  /**
   * Evaluate a property, and set a new shadow model
   * @param property - the property name
   * @param value - the value
   * @param validationPipeline - the validation pipeline either
   * @returns {*}
   */
  evaluate(property, value, validationPipeline = []) {
    // pipeline represents each validator
    let pipeline = [];
    const currentModel = this.getModel();

    if (!_.isObject(currentModel)) {
      throw `validate: Expected a current model (for context validation)`;
    }

    if (_.isArray(validationPipeline)) {
      pipeline = validationPipeline;
    } else if (_.isObject(validationPipeline)) {
      pipeline = _.get(validationPipeline, property, []);
      if (!_.isArray(pipeline)) {
        throw `validate: expected the validators for ${property} to be an array`;
      }
    } else {
      throw "validate: Expected config argument to be an object or an array"
    }

    // when nothing has been defined create a dummy
    if (pipeline.length === 0) {
      pipeline.push(function() {
        return Q.resolve({
          dummy: false
        });
      });
      pipeline.push({
        dummy: ""
      });
    }

    var messages = _.last(pipeline);

    if (!_.isObject(messages)) {
      throw "validate: expected the last item in the validation pipeline to contain an object containing error messages";
    }

    const actualPipeline = _.takeWhile(pipeline, _.isFunction);

    const promises = _.map(actualPipeline, (fn) => {
      return fn.call(currentModel, value);
    });

    const previousShadowValue = this._shadowModel.get(property);

    return Q.all(promises).then((results) => {
      const shadowValue = Object.assign({}, ...results);

      const errorKeys = _.keys(_.pick(shadowValue, value => value));

      shadowValue.$dirty = _.get(previousShadowValue, "$value") !== value;
      shadowValue.$value = value;
      shadowValue.$property = property;
      shadowValue.$valid = errorKeys.length === 0;
      shadowValue.$messages = _.pick(messages, errorKeys);

      this._shadowModel = this._shadowModel.set(property, shadowValue);

      const shadowModelJS = this.getShadow();

      // assess the state of all shadow properties
      shadowModelJS.isValid = this.isValid(shadowModelJS);

      return shadowModelJS;
    });
  }
}