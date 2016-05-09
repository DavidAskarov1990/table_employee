/**
 * Created by Dev on 08.05.2016.
 */
app.controller('registrationCtrl', function ($scope, $http){
    $scope.registration={
        login:'',
        password:''
    };

    $scope.clickRegistration = function () {
        var params = $scope.registration;

        $http.post('/api/registration/',{params:params}).success(function (res) {
            toastr.info(res);
        })
    }
});
