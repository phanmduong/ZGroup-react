angular.module('groupApp').directive('productItem', function () {
    var templateUrl = __env.baseUrl + "/angularjs/group/templates/directives/productItem.html";
    return {
        restrict: 'E',
        replace: true,
        scope: {
            product: "="
        },
        templateUrl: templateUrl,
        link: function (scope, el, attrs) {
            el.find('img').on('load', function () {
                initGallery();

            });
            scope.showModal = function () {
                showFullImageModal(scope.product.id, scope.product.type, null);
            };

            scope.like = function () {
                toggle_like(scope.product.id);
            }
        }
    }
});