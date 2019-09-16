var btvStreamApp = btvApp("btvStreamApp", ["ngAnimate", "btford.socket-io"]);

btvStreamApp.factory("sio", function(socketFactory) {
    var sio = socketFactory();
    sio.forward('properties');
    return sio;
});
btvStreamApp.controller("StreamCtrl", function($scope, $http, $interval, sio) {
    $scope.properties = { stream_url: '', alternate_stream_url: '', chat_url: '', now_streaming: null };
    $scope.chatShown = false;
    $scope.altStream = false;
    $scope.showPlaylist = false;
    $scope.streaming = false;

    var rariboard_message = "";
    var rariboard_message_cache = ""
    var rariboard_image = "";
    var rariboard_image_cache = ""
    var rariboard_enabled = false;

    function onRariboardClose() {
        rariboard_enabled = false;
        rariboard_message_cache = rariboard_message; //When the rariboard is manually closed, it saves the message to the cache to have it be compared to later.
        rariboard_image_cache = rariboard_image; //And if rariboard_message does not equal to the cache, it will reactivate the rariboard message.
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

    $scope.$on('socket:properties', function (ev, data) {
        for (var k in data) {
            $scope.properties[k] = data[k];
        }
        $scope.streaming = typeof($scope.properties.now_streaming) != "undefined"
                && $scope.properties.now_streaming != null
                && $scope.properties.now_streaming != "";
        $scope.playlist = angular.fromJson($scope.properties.playlist) || [];
        $scope.showPlaylist = !!$scope.playlist;
        rariboard_message = $scope.properties.raribox_text;
        rariboard_image = $scope.properties.raribox_image_url;

        if ($(document).width() > 768) {
            if (rariboard_message != "") {
                if (rariboard_enabled == true) {
                    notify.update('icon', rariboard_image);
                    notify.update('message', rariboard_message);
                } else {
                    if (rariboard_message != rariboard_message_cache
                            || rariboard_image != rariboard_image_cache) {
                        rariboard_enabled = true;
                        notify = $.notify({
                            icon: rariboard_image,
                            message: rariboard_message
                        });
                        notify.update('message', rariboard_message);
                    }
                    //do nothing if rariboard cache equals with rariboard_message
                }
            } else { //if the message is blank, it kills the rariboard
                rariboard_enabled = false;
                $.notifyClose();
            }
        } else { //if you are a mobile user, the rariboard doesnt show.
            rariboard_enabled = false;
            $.notifyClose();
        }
    });

    $scope.toggleChat = function() {
        $scope.chatShown = !$scope.chatShown;
    };

    $scope.reloadStream = function() {
        var $frame = $("#stream-frame");
        $frame.attr("src", $frame.attr("src"));
    };

    $scope.popoutChat = function() {
        window.open($scope.properties.chat_url, 'Chat', 'width=800,height=600');
    };

    $scope.popoutAlternateStream = function() {
        window.open($scope.properties.alternate_stream_url, 'Alternate Stream', 'width=800,height=600');
    };
});
