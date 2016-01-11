export default class ThingController {
  /* @ngInject */
  constructor(thingService, thing, editable) {
    this.thingService = thingService;

    this.loading = false;

    // #debug
    this.thing = Object.assign(thing, {
      primaryTechnicalTeam: ["rharris", "hsimpson"]
    });

    this.editable = editable;
  }
}