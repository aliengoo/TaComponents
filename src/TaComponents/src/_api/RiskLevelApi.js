"use strict";

import axios from "axios";

const BaseUrl = "api/risk-level";

export default class RiskLevelApi {
  get() {
    return axios.get(BaseUrl).then(res => res.data);
  }
}