
app.controller('newEmployeeCtrl', function ($scope, $http, employeeServices, $rootScope)
{
    $scope.newEmployee = {
        fullName:'',
        sex:'',
        contactInformation:''
    };
    
    $scope.addNewEmployee = function () 
    {
        for(var key in $scope.newEmployee )
        {
            if($scope.newEmployee[key]==undefined || $scope.newEmployee[key]==''){
                toastr.warning('Заполните все поля');
                return;
            }
        }
        
        var params = {
            fullName:$scope.newEmployee.fullName,
            sex:$scope.newEmployee.sex,
            contactInformation:$scope.newEmployee.contactInformation,
            dateAdded:dateAdd()
        };
        
        $http.post('/api/newEmployee/', {params:params}).success(function (res) {
             params._id = res._id;
             employeeServices.getListEmployees(params);
            
             $rootScope.$broadcast('addNewEmployee', {
                message: params
            });
        });
    };

    function dateAdd() {
        var date = new Date(Date.now());
        var dateAdd= date.getDate() +  '.' + (date.getMonth() + 1) +'.' +  date.getFullYear();
        return dateAdd;
    }
});
