const app = angular.module("loginUserApp", ['ngSanitize', 'ngMessages']);

app.controller('loginUserAppCtrlr', ['$scope', '$http', '$window', ($scope, $http, $window) => {
    $scope.loginUser = () => {
        $http.post('/auth/login', $scope.user).then((res) => {
            swal({
                title: "Success!",
                text: "Logged In Successfully",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: 'green',
                confirmButtonText: 'Ok',
                closeOnConfirm: false,
                //closeOnCancel: false
            },
                function () {
                    $window.location = '/';
                });
        }).catch((err) => {
            swal({
                title: "Error!",
                text: err.data.msg,
                type: "error",
                showCancelButton: false,
                confirmButtonColor: 'red',
                confirmButtonText: 'Ok',
                closeOnConfirm: true,
                //closeOnCancel: false
            });

        });
    };
}]);
