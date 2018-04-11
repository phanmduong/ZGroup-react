shiftApp
    .factory('ShiftData', ['$http', '__env', function ($http, __env) {
        return {
            createShiftSession: function (shiftSession) {
                var url = __env.baseUrl + '/api/shift-session';
                return $http.post(url, shiftSession);
            },
            getShiftSessions: function () {
                var url = __env.baseUrl + '/api/shift-session';
                return $http.get(url);
            },
            editShiftSession: function (shiftSession) {
                var url = __env.baseUrl + '/api/shift-session/' + shiftSession.id;
                return $http.post(url, shiftSession);
            },
            getShiftSession: function (id) {
                var url = __env.baseUrl + '/api/shift-session/' + id;
                return $http.get(url);
            }
        }
    }]);
