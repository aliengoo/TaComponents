import $ from "jquery";
import _ from "lodash";

const DefaultSelect2Options = {
  allowClear: true,
  placeholder: "Select an option"
};

/* @ngInject */
export default function select2($log) {
  return {
    link,
    restrict: "A",
    require: "ngModel",
    scope: {
      name: "@",
      ngModel: "=",
      setter: "&",
      select2Data: "=",
      select2Options: "="
    }
  };

  function link(scope, element, attributes, ngModel) {

    const select = $(element);

    // used to determine if select2 has been initialised,
    // when it has, and new data becomes available, destroy and rebuild
    var initialized = false;

    scope.$watch("select2Data", (data) => {

      // destroy is already initialised
      if (initialized) {
        select.select2("destroy");
      }

      // set options, default to allowClear if no options are provided
      const options = Object.assign(scope.select2Options || DefaultSelect2Options, {
        theme: "bootstrap",
        data
      });

      // set the select2 options
      select.select2(options);

      // start watching after data has loaded.  When $modeValue changes, force the change in
      // select2.
      // For this to work, options must be available, hence only creating this watcher
      // inside the callback for the select2Data options
      scope.$watch(() => ngModel.$modelValue, (newValue) => {
        select.val(newValue).trigger("change");
      });

      // set the model back to undefined
      select.on("select2:unselect", () => {
        ngModel.$setViewValue(undefined);
        scope.setter({
          value: undefined
        });
      });


      // listen for changes
      // on change, pull the data from select2 and assign to ngModel.$viewValue
      select.on("change", () => {
        let val;
        const data = select.select2("data");

        val = _.map(data, "id");

        if (!attributes.hasOwnProperty("multiple")) {
          val = _.first(val);
        }

        if (val || val === "") {
          ngModel.$setViewValue(val);
          scope.setter({
            value: val
          });
        }
      });

      // yep, we're initialised, and therefore can be destroyed
      initialized = true;
    }, true);
  }
}