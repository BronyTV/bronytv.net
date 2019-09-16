var btvChatApp = btvApp("btvChatApp", []);

btvChatApp.controller("ChatCtrl", function($scope, $http) {
    $scope.properties = { chat_url: '' };

    $http.get("/api/properties").success(function(data) {
        $scope.properties = data["properties"];
    });
});
