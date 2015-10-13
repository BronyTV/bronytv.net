var btvStreamApp = angular.module("btvStreamApp", []);

btvStreamApp.controller("StreamCtrl", function($scope) {
    $scope.chatShown = true;
    $scope.toggleChat = function() {
        $scope.chatShown = !$scope.chatShown;
    };

    $scope.reloadStream = function() {
        var $frame = $("#stream-frame");
        $frame.attr("src", $frame.attr("src"));
    };
});