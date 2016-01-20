"use strict";

import _ from "lodash";
import Q from "q";
import Immutable from "immutable";

export default class ShadowModel {
  constructor(initialModel, validationConfig = undefined, parserConfig = undefined, formatterConfig = undefined) {
    this.setModel = this.setModel.bind(this);
    this.getModel = this.getModel.bind(this);
    this.getShadow = this.getShadow.bind(this);
    this.evaluateAll = this.evaluateAll.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.isValid = this.isValid.bind(this);
    this._parseProperty = this._parseProperty.bind(this);
    this._formatProperty = this._formatProperty.bind(this);
    this._validationConfig = validationConfig;
    this._parserConfig = parserConfig;
    this._formatterConfig = formatterConfig;
    this._model = Immutable.Map(initialModel || {});
    this._thingModel = Immutable.Map({});
  }

  setModel(property, value) {
    this._model = this._model.set(property, this._parseProperty(property, value));

    return this.getModel();
  }

  // gets the raw model
  getModel() {
    return this._model.toJS();
  }

  // gets the formatted model
  getFormattedModel() {
    const model = this._model.toJS();

    const formattedModel = {
    };

    Object.getOwnPropertyNames(model).forEach((property) => {
      const value = model[property];

      const formatter = _.get(this._formatterConfig, property);

      if (_.isFunction(formatter)) {
        formattedModel[property] = formatter(value);
      } else {
        formattedModel[property] = value;
      }
    });

    return formattedModel;
  }

  getShadow() {
    return this._thingModel.toJS();
  }

  isValid(shadowModelJS) {

    const failingProperties =  _.pick(shadowModelJS, (value) => {
      return value.$valid === false;
    });

    return _.keys(failingProperties).length === 0;
  }

  evaluateAll(validationConfig = undefined) {
    const model = this._model.toJS();
    var promises = [];

    Object.getOwnPropertyNames(model).forEach((property) => {
      promises.push(this.evaluate(property, model[property], validationConfig));
    });

    return Q.all(promises).then(() => {
      const shadowModelJS = this.getShadow();
      shadowModelJS.isValid = this.isValid(shadowModelJS);
      return shadowModelJS;
    });
  }

  /**
   * Evaluate a property, and set a new shadow model
   * @param property - the property name
   * @param value - the value
   * @param validationConfig - the validation configuration, overriding the internal validationConfig
   * @returns {*}
   */
  evaluate(property, value, validationConfig = undefined) {

    let pipeline = [];
    const currentModel = this.getModel();

    if (!validationConfig) {
      validationConfig = this._validationConfig;
    }

    if (!_.isObject(currentModel)) {
      throw `validate: Expected a current model (for context validation)`;
    }

    if (_.isArray(validationConfig)) {
      pipeline = validationConfig;
    } else if (_.isObject(validationConfig)) {
      pipeline = _.get(validationConfig, property, []);
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

    const previousShadowValue = this._thingModel.get(property);

    return Q.all(promises).then((results) => {
      const shadowValue = Object.assign({}, ...results);

      const errorKeys = _.keys(_.pick(shadowValue, value => value));

      shadowValue.$dirty = _.get(previousShadowValue, "$value") !== value;
      shadowValue.$value = value;
      shadowValue.$property = property;
      shadowValue.$valid = errorKeys.length === 0;
      // convenience inversion
      shadowValue.$invalid = errorKeys.length > 0;
      shadowValue.$messages = _.pick(messages, errorKeys);

      this._thingModel = this._thingModel.set(property, shadowValue);

      const shadowModelJS = this.getShadow();

      // assess the state of all shadow properties
      shadowModelJS.isValid = this.isValid(shadowModelJS);

      return shadowModelJS;
    });
  }

  /**
   * Parses the incoming value if a parser is available
   * @param property
   * @param value
   * @private
   */
  _parseProperty(property, value) {
    const parser = _.get(this._parserConfig, property);

    if (_.isFunction(parser)) {
      return parser(value);
    } else {
      return value;
    }
  }

  /**
   * Formats a property value from the internal representation (think angular $formatters)
   * @param property
   * @param value
   * @returns {*}
   * @private
   */
  _formatProperty(property, value) {
    const formatter = _.get(this._formatterConfig, property);

    if (_.isFunction(formatter)) {
      return formatter(value);
    } else {
      return value;
    }
  }
}