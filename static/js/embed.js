function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var server = '/live/';
var name = getUrlParameter('id') || 'bronytv';
var player = null;

function startPlayer(url) {
    var type = 'application/x-mpegURL';

    if (player) player.dispose();

    var container = videojs.dom.$('#video');
    videojs.dom.emptyEl(container);
    var vid = videojs.dom.createEl('video',{},{class:'video-js vjs-theme-forest'});
    videojs.dom.prependTo(vid, container);

    player = videojs(vid, {controls:true,preload:'auto',autoplay:'play',fill:true,liveui:true});
    player.poster('/static/img/online.jpg');
    player.src({ src: url, type: type });
    player.tech({ IWillNotUseThisInPlugins: true }).on('retryplaylist', stopPlayer);

    videojs.dom.$('#offline').style.display = 'none';
    videojs.dom.$('#video').style.display = 'block';
}

function stopPlayer() {
    if (player) {
        player.dispose();
        player = null;
    }

    videojs.dom.$('#offline').style.display = 'block';
    videojs.dom.$('#video').style.display = 'display';

    checkStream();
}

function checkHead(url, fail, next) {
    videojs.xhr.head(url, function(err, resp) {
        if (!err && resp.statusCode == 200) {
            next(url);
        } else {
            setTimeout(fail, 3000);
        }
    });
}

function checkStream() {
    checkHead(server+name+'.online', checkStream, function() {
        checkHead(server+name+'/index.m3u8', checkStream, startPlayer);
    });
}
