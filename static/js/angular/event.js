var btvEventApp = btvApp("btvEventApp");
btvEventApp.controller('EventCtrl', function($scope, $http) {
    $scope.sideevents = { fetching: true, error: false, events: [] };

    $scope.init = function() {
        var now = moment();
        var utcOffset = moment.parseZone(now).format('Z');

        var windowPath = window.location.pathname.split( '/' );
        var eventurlid = windowPath[2];

        var evresp = $http.get("/api/event?tzoffset=" + utcOffset + "&eventid=" + eventurlid);
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
