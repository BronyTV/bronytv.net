var btvAdminApp = angular.module("btvAdminApp", []);

btvAdminApp.controller("FormsCtrl", function($scope, $http) {
    $scope.data = {};
    $scope.submitting = false;
    $scope.success = false;

    $scope.init = function() {
        var resp = $http.get("/admin/api/values");

        resp.success(function(data, status, headers, config) {
            console.log(data);
            $scope.data = data["properties"];
        });
    };

    $scope.updateProperties = function() {
        $scope.submitting = true;
        $scope.success = false;

        $http.post("/admin/api/values", JSON.stringify({properties: $scope.data})).success(function(data, status, headers, config) {
            $scope.submitting = false;
            $scope.success = true;
            console.log("Success")
        });
    };
});