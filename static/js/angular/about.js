var btvAboutApp = angular.module("btvAboutApp", []);

btvAboutApp.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

btvAboutApp.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

btvAboutApp.controller("AboutCtrl", function($scope, $http) {
    /* Please don't hate me. It'll grab from a database at some point, I promise. */
    $scope.staff = {
        executive: {
            title: 'Our Executive Team',
            staff: [
                {
                    name: 'Ashfire',
                    title: 'Site Owner',
                    description: ''
                },
                {
                    name: 'ama',
                    title: 'Web/IRC Admin',
                    description: ''
                },
                {
                    name: 'Oatzmeal',
                    title: 'Head of Streaming',
                    description: ''
                },
                {
                    name: 'Dusk',
                    title: 'Head Moderator',
                    description: ''
                }
            ]
        },
        stream: {
            title: 'Our Awesome Stream-Team',
            staff: [
                {
                    name: 'Lightning Ferron',
                    title: '',
                    description: ''
                },
                {
                    name: 'Mirality',
                    title: '',
                    description: ''
                },
                {
                    name: 'Jolly',
                    title: '',
                    description: ''
                }
            ]
        },
        tech: {
            title: 'Our Tech Gurus',
            staff: [
                {
                    name: 'catnickfl',
                    title: '',
                    description: ''
                },
                {
                    name: 'Cuddles',
                    title: '',
                    description: ''
                },
                {
                    name: 'AppleDash',
                    title: '',
                    description: ''
                }
            ]
        },
        general: {
            title: 'General mods and other cool peeps',
            staff: [
                {
                    name: 'Delsin7Pony',
                    title: '',
                    description: ''
                },
                {
                    name: 'Ditznata',
                    title: '',
                    description: ''
                },
                {
                    name: 'Envirotech',
                    title: '',
                    description: ''
                },
                {
                    name: 'Twitchy',
                    title: '',
                    description: ''
                }
            ]
        }
    };

    $scope.imgName = function(name) {
        return name.replace(" ", "_") + ".png";
    };

    $scope.init = function() {
        var staff = $scope.staff;
        for (var staff_category in staff) {
            if (staff.hasOwnProperty(staff_category)) {
                var staff_list = staff[staff_category]['staff'];
                for (var staff_index in staff_list) {
                    if (staff_list.hasOwnProperty(staff_index)) {
                        var staff_object = staff_list[staff_index];
                        (function (staff_obj) {
                            var resp = $http.get('/static/txt/staff/' + staff_obj.name.replace(" ", "_") + '.txt');
                            resp.success(function(data, status, headers, config) {
                                staff_obj.description = data;
                            });

                            resp.error(function(data, status, headers, config) {
                                staff_obj.description = "No description";
                            });
                        })(staff_object);
                    }
                }
            }
        }
    }
});
