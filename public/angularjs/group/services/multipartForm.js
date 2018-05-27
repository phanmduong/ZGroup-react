angular.module('groupApp')
    .service('multipartForm', ['$http', function ($http) {
        this.post = function (uploadUrl, data) {
            var fd = new FormData();
            for (var key in data) {
                fd.append(key, data[key]);
            }

            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-type': undefined}
            });
        }
    }]);