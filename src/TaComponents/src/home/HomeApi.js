"use strict";

import axios from "axios";

export default class HomeApi {
  get() {
    return axios.get("api/home/me");
  }
}