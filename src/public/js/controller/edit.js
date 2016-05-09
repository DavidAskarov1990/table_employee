
app.controller('regularTimeCtrl', function ($scope, $http, employeeServices){
    $scope.regularTime = {
        finishWork:'',
        startWork:'',
        id_employee:''
    };
    $scope.dataEmployee = {
        fullName:'',
        contactInformation:'',
        sex:''
    };
    
    $scope.titleEditData='';

    $scope.$on('getRegularTime', function (event, args) {
        if(args.message)
        {
            $scope.titleEditData = args.fullName;
            
            $http.get('/api/regular-time/'+employeeServices.getEmployeeId()).success(function (res) {
                $scope.regularTime = res[0];
                editEmployee();
            });
        }
    });

    var finish='';
    var start = '';
    $scope.setEdit = function ()
    {
        if($scope.regularTime==undefined)
        {
            finish = '';
            start = '';
        }
        else {
            finish = $scope.regularTime.finishWork;
            start = $scope.regularTime.startWork;
        }

        var params = {
            regular:{
                id_employee:employeeServices.getEmployeeId(),
                finishWork:finish,
                startWork:start
            },

            employee:{
                fullName:$scope.dataEmployee.fullName,
                contactInformation:$scope.dataEmployee.contactInformation,
                sex:$scope.dataEmployee.sex
            }
        };
        $http.post('/api/edit/', {params: params}).success(function (res) {
            getNewValueEmployee($scope.dataEmployee);
            toastr.info(res);
        });
    };

    var getNewValueEmployee = function (params)
    {
        for(var i=0; i<employeeServices.getListEmployees().length; i++){
            if(employeeServices.getListEmployees()[i]._id == employeeServices.getEmployeeId())
            {
                for(var key in employeeServices.getListEmployees()[i])
                {
                    for(var j = 0; j<Object.keys(params).length; j++)
                    {
                        if(key == Object.keys(params)[j])
                        {
                            employeeServices.getListEmployees()[i][key] = params[key];
                        }
                    }
                }
                return employeeServices.getListEmployees()[i];
            }
        }
        return null;
    };

    var editEmployee=function () {
        for(var i= 0;i<employeeServices.getListEmployees().length; i++){
            if(employeeServices.getListEmployees()[i]._id == employeeServices.getEmployeeId()){
                $scope.dataEmployee.fullName = employeeServices.getListEmployees()[i].fullName;
                $scope.dataEmployee.contactInformation = employeeServices.getListEmployees()[i].contactInformation;
                $scope.dataEmployee.sex = employeeServices.getListEmployees()[i].sex;
            }
        }
    }
});
