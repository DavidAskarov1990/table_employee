app.controller('tableEmployeeCtrl', function ($scope, $http, employeeServices, $rootScope)
{
    $scope.deleteEmployeeItem = '';
    
    (function () {
        $http.get('/api/getEmployees/').success(function (res)
        {
            for(var i=0; i<res.length; i++)
            {
                if(res[i].dateAdded){
                    var date = new Date(res[i].dateAdded);
                    res[i].dateAdded = date.getDate() +  '.' + (date.getMonth() + 1) +'.' +  date.getFullYear()
                }
            }
            employeeServices.setListEmployees(res);
            $scope.employee = employeeServices.getListEmployees();
        });
    })();
    
    $scope.employee=employeeServices.getListEmployees();
    
    $scope.$on('addNewEmployee', function (event, args) {
        $scope.employee.push(args.message);
    });
    
    $scope.setId = function (item)
    {
        employeeServices.setEmployeeId(item._id);

        $rootScope.$broadcast('getRegularTime', {
            message: true,
            fullName: item.fullName
        });
    };
    
    
    $scope.deleteEmployeeModal = function (item) {
        $scope.deleteEmployeeItem = item;
        $("#deleteConfirm").modal();
    };
    
    $scope.deleteEmployee = function () {
        $http.post('/api/delete/' + $scope.deleteEmployeeItem._id).success(function (res) {
            
            var index = $scope.employee.indexOf($scope.deleteEmployeeItem);
            $scope.employee.splice(index,1);
        });
    }
});