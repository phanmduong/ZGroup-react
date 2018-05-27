'use strict';
roleApp.factory('StaffData', ['$http', '__env', function ($http, __env) {
    return {
        getBases: function () {
            var url = __env.baseUrl + "/api/get-bases";
            return $http({method: "GET", url: url});
        },
        getStaffs: function () {
            var url = __env.baseUrl + "/api/nhanviens";
            return $http({method: "GET", url: url});
        },
        changeRole: function (staff) {
            return $http.post(__env.baseUrl + "/api/nhanviens/" + staff.id + "/role", {role_id: staff.role_id});
        },
        changeBase: function (staff) {
            return $http.post(__env.baseUrl + "/api/nhanviens/" + staff.id + "/base", {base_id: staff.base_id});
        },
        searchUser: function (searchTerm) {
            return $http.get(__env.baseUrl + "/api/search-user?q=" + searchTerm);
        },
        deleteStaff: function (id) {
            return $http.delete(__env.baseUrl + '/api/nhanviens/' + id);
        }
    };
}])
;