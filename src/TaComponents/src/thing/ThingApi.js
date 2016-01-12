"use strict";

import axios from "axios";

export default class ThingApi {

  get(id) {
    return axios.get(`api/thing/${id}`);
  }

  create(thing) {
    return axios.post(`api/thing`, thing);
  }

  update(thing) {
    return axios.put(`api/thing/${thing.id}`, thing);
  }

  remove(id) {
    return axios.delete(`api/thing/${id}`);
  }
}