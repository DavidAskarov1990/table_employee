var module = angular.module("employeeServices", []);
module.factory("employeeServices", function () {
    var employeeId = '';
    var listEmployees = '';

    return {
        getEmployeeId:function () {
            return employeeId;
        },

        setEmployeeId:function (id) {
            employeeId = id;
        },
        
        getListEmployees:function (e)
        {
            if(arguments.length==0) return listEmployees;
        },

        setListEmployees:function (list) {
            listEmployees = list;
        }
    }
});
