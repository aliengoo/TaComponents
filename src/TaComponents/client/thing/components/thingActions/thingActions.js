import _ from "lodash";
import template from "./thingActions.html";

export default function thingActions($state, thingService, userNotifierService) {
  return {
    restrict: "E",
    require: ["^form", "^ThingController"],
    scope: {
      thing: "="
    }
  };

  function link(scope, element, attributes, controllers) {

    scope.thingForm = controllers[0];
    scope.thingController = controllers[1];

    scope.undo = () => {

    };

    scope.edit = () => {

    };

    scope.save = () => {
      this.loading = true;
      var redirectUserToViewMode = (response)  => {
        $state.go("thingView", {
          id: _.get(response, "data._id")
        });
      };

      var handleError = (response) => {
        userNotifierService.error("Something went horribly wrong", "Error");
        $log.error(response);
      };

      var andFinally = () => scope.loading = false;

      var promise = scope.thing._id
        ? thingService.update(scope.thing)
        : thingService.insert(scope.thing);

      promise.then(redirectUserToViewMode, handleError)
        .finally(andFinally);
    };
  }
}

