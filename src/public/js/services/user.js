var module = angular.module("userServices", []);
module.factory("userServices", function () {
    var userId = '';

    return {
        getUserId:function () {
            return userId;
        },

        setUserId:function (id) {
            userId = id;
        }
    }
});

