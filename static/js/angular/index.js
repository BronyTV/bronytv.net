var btvIndexApp = btvApp("btvIndexApp", ['timer']);

btvIndexApp.filter("convertToLocalTime", function() {
   return function(value) {
       // 2015-11-01 17:29:49 GMT
       return moment.tz(value, "YYYY-MM-DD hh:mm:ss", "UTC").local().format("MM-DD-YYYY hh:mm:ss");
   };
});

btvIndexApp.controller('NewsCtrl', function($scope, $http) {
    $scope.news = { fetching: true, error: false, posts: [] };

    $scope.init = function() {
        var resp = $http.get("/api/news");
        var postAuthorCache = new Array();
        resp.success(function(data) {
            $scope.news.fetching = false;
            $scope.news.posts = data.posts;
            angular.forEach($scope.news.posts, function(value, key) {
              if (postAuthorCache[value["post_author"]] == undefined) {
                $http.get('/api/tumblr_primaryblog_name/' + value["post_author"]).then(function(response) {
                    postAuthorCache[value["post_author"]] = response.data;
                    value["post_author_pblog"] = postAuthorCache[value["post_author"]];
                });
              } else {
                value["post_author_pblog"] = postAuthorCache[value["post_author"]]; //I cannot seem to make this else statement run. Therefore not getting the things "cached" inside the "postAuthorCache" variable. I need a bit help please!
              }; //It currently just will get the usernames as if it was not caching.
            });
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
            $scope.btvtime = moment.tz($scope.props["countdown_date"], "MM-DD-YYYY hh:mm:ss", "America/New_York");
            $scope.time = moment($scope.btvtime).local();
            $scope.target = $scope.props.countdown_target || "The next episode airs";
            $scope.done = $scope.props.countdown_done || "It's Pony Time!";
            $.ajax({
                url: '/api/viewercount',
                type: 'GET',
                success: function(json) {
                  if ($scope.streaming) {
                    document.getElementById("viewercounter").innerHTML = json["viewercount"];
                  }
                },
                error: function() {
                  if ($scope.streaming) {
                    document.getElementById("viewercounter").innerHTML = "Error fetching the current view count.";
                  }
                }
            });
        });
    };

    $scope.isDistant = function() {
        return moment().add(7, 'days').isBefore($scope.time);
    }

    $scope.isPonyTime = function() {
        return moment().isAfter($scope.time);
    }
});

btvIndexApp.controller('EventsListCtrl', function($scope, $http) {
    $scope.sideevents = { fetching: true, error: false, events: [] };

    $scope.init = function() {
        var now = moment();
        var utcOffset = moment.parseZone(now).format('Z');

        var evresp = $http.get("/api/schedule?offsettoday=1&maxresults=3&tzoffset=" + utcOffset);

        evresp.success(function(data) {
            $scope.sideevents.fetching = false;
            $scope.sideevents.events = data.events;
        });

        evresp.error(function(data) {
            $scope.sideevents.fetching = false;
            $scope.sideevents.error = true;
        });
    };
});
