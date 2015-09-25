jQuery(function() {
  nowPlaying();
  rariBoxUpdate();
  //raripicture();
});	

var last_nowplaying = { stream: null, news: null, raripic: null, playlist: null };

function nowPlaying()
{
  jQuery.ajax({
    url: '/static/stream.html',
    ifModified: (last_nowplaying.stream !== null),
    cache: false,
    dataType: 'text'
  }).done(function(data) {
    if (data) {
      last_nowplaying.stream = data;
      jQuery('#nowplaying').text(data);
    }
    checkPlaylist();
    setTimeout('nowPlaying()', 10000);
  });
}
  
function rariBoxUpdate()
{
  if ($('#newstext').visibility = 'visible')
  {
    jQuery.ajax({
      url: '/static/news.html',
      ifModified: (last_nowplaying.news !== null),
      cache: false,
      dataType: 'text'
    }).done(function(data) {
      if (data) {
        last_nowplaying.news = data;
        jQuery('#newstext').text(data);
      }
    });
  } 
  setTimeout('rariBoxUpdate()', 10000);
}

function raripicture()
{
  jQuery.ajax({
    url: '/static/raripic.txt',
    ifModified: (last_nowplaying.raripic !== null),
    cache: false,
    dataType: 'text'
  }).done(function(data) {
    if (data) {
      last_nowplaying.raripic = data;
      $("#rariface").attr("src", "/Pictures/raribox/" + data + ".png" );
    }
    setTimeout('raripicture()', 10000);
  });
}

function checkPlaylist()
{
  if ($('#playlist').length == 0 || !PlaylistManager) { return; }

  var nowplaying = $('#nowplaying').text();
  var playlist = '/~miralilty/nowplaying.json';
  //var isRandomPony = (nowplaying == 'Mirality - Random Pony');
  //var isSocial = (nowplaying == 'Mirality - Social Night');
  var isMirality = (nowplaying.slice(0, 10) == 'Mirality -');
  var showPlaylist = isMirality; //(isRandomPony || isSocial);
  if (showPlaylist && !last_nowplaying.playlist) {
    last_nowplaying.playlist = new PlaylistManager(playlist);
    last_nowplaying.playlist.start();
  } else if (!showPlaylist && last_nowplaying.playlist) {
    last_nowplaying.playlist.stop();
    last_nowplaying.playlist = null;
  }
}
