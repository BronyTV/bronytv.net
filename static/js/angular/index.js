var btvIndexApp = btvApp("btvIndexApp", ['timer']);

btvIndexApp.controller('NewsCtrl', function($scope, $http) {
    $scope.news = { fetching: true, error: false, posts: [] };

    $scope.init = function() {
        var resp = $http.get("/api/news");

        resp.success(function(data) {
            $scope.news.fetching = false;
            $scope.news.posts = data.posts;
        });

        resp.error(function(data) {
            $scope.news.fetching = false;
            $scope.news.error = true;
        });
    };
});

btvIndexApp.controller("CountdownCtrl", function($scope, $http) {
    $scope.time = 0;

    $scope.init = function() {
        $http.get("/api/properties").success(function(data) {
            var props = data["properties"];
            $scope.time = moment(props["countdown_date"], "MM-DD-YYYY hh:mm:ss").tz('America/New_York');
        });
    };
});
