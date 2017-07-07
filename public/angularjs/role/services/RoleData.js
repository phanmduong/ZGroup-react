/**
 * Created by caoanhquan on 6/27/16.
 */
roleApp.factory('RoleData', ['$http', '__env', function ($http, __env) {
    return {
        getRoles: function () {
            var url = __env.baseUrl + "/api/roles";
            return $http({method: "GET", url: url});
        },
        getRole: function (roleId) {
            var url = __env.baseUrl + "/api/roles/" + roleId;
            return $http({method: 'GET', url: url});
        },
        saveRole: function (data) {
            return $http.post(__env.baseUrl + "/api/roles", data);
        },
        deleteRole: function (id) {
            return $http.delete(__env.baseUrl + '/api/roles/' + id);
        }
    }
}]);