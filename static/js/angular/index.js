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
            $scope.props = data["properties"];
            $scope.streaming = typeof($scope.props.now_streaming) != "undefined" && $scope.props.now_streaming != null && $scope.props.now_streaming != "";
            $scope.time = moment.tz($scope.props["countdown_date"], "MM-DD-YYYY hh:mm:ss", "America/New_York").local();
        });
    };

    $scope.isPonyTime = function() {
        return moment().isAfter($scope.time);
    }
});
