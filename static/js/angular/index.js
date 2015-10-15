var btvIndexApp = btvApp("btvIndexApp", ['timer']);

btvIndexApp.controller('NewsCtrl', function($scope, $http) {
    $scope.news = { fetching: true, error: false, posts: [] };
    var resp = $http.get("/api/news");

    resp.success(function(data, status, headers, config) {
        $scope.news.fetching = false;
        $scope.news.posts = data.posts;
    });

    resp.error(function(data, status, headers, config) {
        $scope.news.fetching = false;
        $scope.news.error = true;
    });

    $scope.parsePost = function(post) {
        var title;
        var content;
        switch (post.type) {
            case "quote":
                title = '<a href="' + post.short_url + '">' + post.text + '</a>';
                content = post.source;
                break;
            case "photo":
                title = '<a href="' + post.short_url + '">BronyTV</a>';
                content = '<img src="' + post.photos[0].original_size.url + '" /><br>' + post.caption;
                break;
            case "link":
                title = '<a href="' + post.url + '">' + (post.title || "Quote") + '</a>';
                content = post.description;
                break;
            case "video":
                title = '<a href="' + post.short_url + '">BronyTV</a>';
                content = post.player[2].embed_code + '<br>' + post.caption;
                break;
            default:
                title = '<a href="' + post.short_url + '">' + (post.title || "BronyTV") + '</a>';
                content = post.body;
                break;
        }
        var html = '<div class="news-post">\
                        <h3>' + title + '</h3>\
                        <span>' + content + '</span>\
                    </div>\
                    <hr>';

        return html;
    };
});

btvIndexApp.controller("CountdownCtrl", function($scope) {
    $scope.time = moment('10-17-2015 11:30:00', "MM-DD-YYYY hh:mm:ss").tz('America/New_York');
});