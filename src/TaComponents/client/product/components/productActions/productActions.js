import _ from "lodash";
import template from "./productActions.html";

export default function productActions($state, productServices, userNotifierService) {
  return {
    restrict: "E",
    require: ["^form", "^ProductController"],
    scope: {
      product: "="
    }
  };

  function link(scope, element, attributes, controllers) {

    scope.productForm = controllers[0];
    scope.productController = controllers[1];

    scope.undo = () => {

    };

    scope.edit = () => {

    };

    scope.save = () => {
      this.loading = true;
      var redirectUserToViewMode = (response)  => {
        $state.go("productView/:id", {
          id: _.get(response, "data._id")
        });
      };

      var handleError = (response) => {
        userNotifierService.error("Something went horribly wrong", "Error");
        $log.error(response);
      };

      var andFinally = () => scope.loading = false;

      if (scope.product._id) {
        productServices.update(scope.product)
          .then(redirectUserToViewMode, handleError)
          .finally(andFinally);
      } else {
        productServices.insert(scope.product)
          .then(redirectUserToViewMode, handleError)
          .finally(andFinally);
      }
    };
  }
}

