"use strict";

import axios from "axios";

const BaseUrl = "api/risk";

export default class RiskApi {
  getSeverities() {
    return axios.get(`${BaseUrl}/severities`).then(res => res.data);
  }

  getProbabilities() {
    return axios.get(`${BaseUrl}/probabilities`).then(res => res.data);
  }
}