var btvStreamApp = angular.module("btvStreamApp", []);

btvStreamApp.controller("StreamCtrl", function($scope) {
    $scope.chat_url = "https://kiwiirc.com/client?settings=3eda7e82f0210b259be287b5bfa1a89d";
    $scope.chatShown = true;
    $scope.altStream = false;

    $scope.toggleChat = function() {
        $scope.chatShown = !$scope.chatShown;
    };

    $scope.reloadStream = function() {
        var $frame = $("#stream-frame");
        $frame.attr("src", $frame.attr("src"));
    };

    $scope.popoutChat = function() {
        window.open($scope.chat_url, 'Chat', 'width=800,height=600');
    };

    $scope.swapStream = function() {
        $scope.altStream = !$scope.altStream;
    };
});