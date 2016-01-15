"use strict";

import axios from "axios";

const BaseUrl = "api/status";

export default class StatusApi {
  get() {
    return axios.get(BaseUrl).then(res => res.data);
  }
}