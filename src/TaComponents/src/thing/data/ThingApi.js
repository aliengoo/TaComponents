"use strict";

import axios from "axios";

const BaseUrl = "api/thing";

export default class ThingApi {

  getThing(id) {
    return axios.get(`${BaseUrl}/${id}`);
  }

  saveThing(thing) {
    var promise;

    if (thing.id) {
      promise = axios.put(`${BaseUrl}/${thing.id}`, thing);
    } else {
      promise = axios.post(`${BaseUrl}`, thing);
    }

    return promise
  }


  isThingNameUnique(name, id) {
    return axios.get(`${BaseUrl}/is-name-unique`, {
      params: {
        name,
        id
      }
    }).then(response => response.status === 200);
  }
}

const thingApi = new ThingApi();

export {
  thingApi
}