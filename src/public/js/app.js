var app = angular.module('app', ['ui.router', 'employeeServices', 'userServices' ,'angularUtils.directives.dirPagination'])
    .config(function ($stateProvider,  $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
            .state('home', {
                url:"/",
                views:
                {
                    'center':{
                        templateUrl:'./templates/tableEmployee.html',
                        controller:'tableEmployeeCtrl'
                    }
                }
            })
            .state('authorization', {
                url:"/authorization",
                views:
                {
                    'center':{
                        templateUrl:'./templates/authorization.html',
                        controller:'authorizationCtrl'
                    }
                }
            })
            .state('registration', {
                url:"/registration",
                views:
                {
                    'center':{
                        templateUrl:'./templates/registration.html',
                        controller:'registrationCtrl'
                    }
                }
            });
    });
