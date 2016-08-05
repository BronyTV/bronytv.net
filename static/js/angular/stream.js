var btvStreamApp = btvApp("btvStreamApp", ["ngAnimate"]);

btvStreamApp.controller("StreamCtrl", function ($scope, $http, $interval) {
    $scope.properties = {stream_url: '', alternate_stream_url: '', now_streaming: null};
    $scope.chat_url = 'https://bronytv.net/kiwi/'; // Do NOT change this from single quotes. Double quotes make the minifier interpret the slashes as a comment.
    $scope.chatShown = false;
    $scope.altStream = false;
    $scope.showPlaylist = false;
    $scope.streaming = false;

    this.rariboard_message = "";
    this.rariboard_message_cache = "";
    this.rariboard_image = "";
    this.rariboard_image_cache = "";
    this.rariboard_enabled = false;
    this.notify = null;

    var that = this;

    function onRariboardClose() {
        that.rariboard_enabled = false;
        that.rariboard_message_cache = that.rariboard_message; // When the rariboard is manually closed, it saves the message to the cache to have it be compared to later.
        that.rariboard_image_cache = that.rariboard_image; // And if this.rariboard_message does not equal to the cache, it will reactivate the rariboard message.
    }

    $.notifyDefaults({
        type: 'bronytv',
        delay: 0,
        icon_type: 'image',
        placement: {
            from: "bottom"
        },
        offset: {
            x: 0,
            y: 0
        },
        animate: {
            enter: 'animated zoomInUp',
            exit: 'animated zoomOutDown'
        },
        onClosed: onRariboardClose,
        template: '<div class="rariboard_alert"><div data-notify="container" class="col-sm-4 alert alert-bronytv" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss" style="position: absolute; right: 10px; top: 5px; z-index: 1033;">×</button>' +
        '<div data-notify="message"></div></div>' + '<div class="pull-right"><img data-notify="icon"></div></div>'
    });

    $scope.updateValues = function () {
        $http.get("/api/properties").success(function (data) {
            $scope.properties = data["properties"];
            $scope.streaming = typeof($scope.properties.now_streaming) != "undefined" && $scope.properties.now_streaming != null && $scope.properties.now_streaming != "";
            $scope.playlist = angular.fromJson($scope.properties.playlist) || [];
            $scope.showPlaylist = !!$scope.playlist;
            that.rariboard_message = $scope.properties.raribox_text;
            that.rariboard_image = $scope.properties.raribox_image_url;

            if ($(document).width() > 768) {
                if (that.rariboard_message != "") {
                    if (that.rariboard_enabled && that.notify != null) {
                        that.notify.update('icon', that.rariboard_image);
                        that.notify.update('message', that.rariboard_message);
                    } else {
                        if (that.rariboard_message != that.rariboard_message_cache || that.rariboard_image != that.rariboard_image_cache) {
                            that.rariboard_enabled = true;
                            that.notify = $.notify({
                                icon: that.rariboard_image,
                                message: that.rariboard_message
                            });
                            that.notify.update('message', that.rariboard_message);
                        }
                        // do nothing if rariboard cache equals with rariboard_message
                    }
                } else { // if the message is blank, it kills the rariboard
                    that.rariboard_enabled = false;
                    $.notifyClose();
                }
            } else { // if you are a mobile user, the rariboard doesnt show.
                that.rariboard_enabled = false;
                $.notifyClose();
            }
        });
    };
    $scope.updateCounter = function () {
        $http.post("/api/viewercount", "data").success(function (data) {
            $scope.viewcounter = data.viewercount;
            console.log(data);
        }).error(function () {
            $scope.viewcounter = -1;
        });
    };

    $scope.init = function () {
        $scope.updateValues();
        $scope.updateCounter();

        $interval(function () {
            $scope.updateValues();
            $scope.updateCounter();
        }, 5000);
    };

    $scope.toggleChat = function () {
        $scope.chatShown = !$scope.chatShown;
    };

    $scope.reloadStream = function () {
        var $frame = $("#stream-frame");
        $frame.attr("src", $frame.attr("src"));
    };

    $scope.popoutChat = function () {
        window.open($scope.chat_url, 'Chat', 'width=800,height=600');
    };

    $scope.popoutAlternateStream = function () {
        window.open($scope.properties.alternate_stream_url, 'Alternate Stream', 'width=800,height=600');
    };
});
