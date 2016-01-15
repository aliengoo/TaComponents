"use strict";

import axios from "axios";

const BaseUrl = "api/user";

export default class UserApi {
  getAll() {
    return axios.get(`${BaseUrl}/all`).then(res => res.data);
  }
}