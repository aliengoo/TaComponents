import $ from "jquery";
import _ from "lodash";
import template from "./productTeamMembers.html";

/* @ngInject */
export default function productTeamMembers(productService) {
  return {
    link,
    require: "^form",
    restrict: "E",
    scope: {
      product: "=",
      editable: "="
    },
    template
  };

  function link(scope, element) {
    const selectElement = $(element.find("select"));

    // HACK: Select2
    $(selectElement).on("change", function(e) {
      scope.$apply(function(){
        console.log("new-value: ", $(e.target).select2("data"));
      });

    });

    scope.loading = true;

    productService.getRiskLevels()
      .then(riskLevels => {
        scope.riskLevels = riskLevels;
        selectElement.select2({
          placeholder: "Enter team members",
          allowClear: true,
          theme: "bootstrap",
          ajax: {
            delay: 250,
            dataType: 'json',
            minimumInputLength: 2,
            data: function (params) {
              return {
                q: params.term
              };
            },
            url: "/api/user/filter",
            processResults: function (data) {
              var options = [];

              _.forEach(data, (item) => {
                options.push({
                  id: item.samAccountName,
                  text: item.samAccountName
                });
              });

              return {
                results: options
              };
            },
            cache: true
          }
        });
      })
      .finally(() => scope.loading = false);


  }
}