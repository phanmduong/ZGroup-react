regisShiftApp
    .factory('ShiftData', ['$http', '__env', function ($http, __env) {
        return {
            getBases: function () {
                var url = __env.baseUrl + "/api/get-bases";
                return $http.get(url);
            },
            getCurrentShifts: function (gen_id, base_id) {
                if (gen_id) {
                    var url = __env.baseUrl + '/api/current-shifts/' + gen_id;
                } else {
                    var url = __env.baseUrl + '/api/current-shifts';
                }
                if (base_id) {
                    url += "?base_id=" + base_id;
                }
                return $http.get(url);
            },
            registerShift: function (shiftId) {
                var url = __env.baseUrl + '/api/register-shift';
                return $http.post(url, {shift_id: shiftId});
            },
            removeShift: function (shift) {
                var url = __env.baseUrl + '/api/remove-shift-regis';
                return $http.post(url, {shift_id: shift.id});
            },
            getProgress: function (gen_id) {
                if (gen_id) {
                    var url = __env.baseUrl + '/api/shifts-progress/' + gen_id;
                } else {
                    var url = __env.baseUrl + '/api/shifts-progress';
                }
                return $http.get(url);
            },
            getShiftPicks: function (page) {
                if (page) {
                    var url = __env.baseUrl + '/api/shift-picks/?page=' + page;
                } else {
                    var url = __env.baseUrl + '/api/shift-picks';
                }
                return $http.get(url);
            }
        }
    }]);
