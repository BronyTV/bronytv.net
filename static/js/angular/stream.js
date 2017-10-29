var btvStreamApp = btvApp("btvStreamApp", ["ngAnimate"]);

btvStreamApp.controller("StreamCtrl", function($scope, $http, $interval) {
    $scope.properties = { stream_url: '', alternate_stream_url: '', now_streaming: null };
    $scope.chat_url = 'https://titanembeds.com/embed/81387914189078528?defaultchannel=90956726219571200&css=42&noscroll=true'; // Do NOT change this from single quotes. Double quotes make the minifier interpret the slashes as a comment.
    $scope.chatShown = false;
    $scope.altStream = false;
    $scope.showPlaylist = false;
    $scope.streaming = false;

    rariboard_message = "";
    rariboard_message_cache = ""
    rariboard_image = "";
    rariboard_image_cache = ""
    rariboard_enabled = false;

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

    $scope.updateValues = function() {
        $http.get("/api/properties").success(function(data) {
            $scope.properties = data["properties"];
            $scope.streaming = typeof($scope.properties.now_streaming) != "undefined" && $scope.properties.now_streaming != null && $scope.properties.now_streaming != "";
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
                  if (rariboard_message != rariboard_message_cache || rariboard_image != rariboard_image_cache) {
                    rariboard_enabled = true;
                    notify = $.notify({
                      icon: rariboard_image,
                      message: rariboard_message
                    });
                    notify.update('message', rariboard_message);
                  }
                  //do nothing if rariboard cache equals with rariboard_message
                };
              } else { //if the message is blank, it kills the rariboard
                rariboard_enabled = false;
                $.notifyClose();
              };
            } else { //if you are a mobile user, the rariboard doesnt show.
              rariboard_enabled = false;
              $.notifyClose();
            };
        });
    };
    $scope.updateCounter = function() {
      $.ajax({
          url: '/api/viewercount',
          type: 'POST',
          success: function(json) {
            document.getElementById("viewercounter").innerHTML = json["viewercount"];
          }
      });
    };
    $scope.init = function() {
        document.getElementById("viewercounter").innerHTML = "-1";
        $scope.updateValues();
        $scope.updateCounter();

        $interval(function () {
            $scope.updateValues();
            $scope.updateCounter();
        }, 5000);
    };

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

    $scope.popoutAlternateStream = function() {
        window.open($scope.properties.alternate_stream_url, 'Alternate Stream', 'width=800,height=600');
    };
});
