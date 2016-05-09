/**
 * Created by Dev on 08.05.2016.
 */
app.controller('authorizationCtrl', function ($scope, $http, userServices){
    $scope.authorization = {
        login:'',
        password:''
    };

    $scope.clickAuthorization = function () {
        var params = $scope.authorization;

        $http.post('/api/authorization/',{params:params}).success(function (res) {


            if(res=='Не верный пароль' || res == 'Пользователь не найден'){
                toastr.info(res);
            }
            else {
                userServices.setUserId(res);
                toastr.info('Авторизация прошла успешно')
            }
        })
    }
});
