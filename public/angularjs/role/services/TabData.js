/**
 * Created by caoanhquan on 6/29/16.
 */
roleApp.factory('TabData', ['$http', '__env', function ($http, __env) {
    return {
        getTabs: function () {
            var url = __env.baseUrl + "/api/tabs";
            return $http({method: "GET", url: url});
        }
    }
}]);