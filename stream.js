function init_stream_switcher() {
  var streams = [];
  
  // the first stream listed here will be the default
  streams.push({
    code: '<object type="application/x-shockwave-flash" data="http://www.justin.tv/swflibs/JustinPlayer.swf?channel=btvstream" id="live_embed_player_flash" style="width:704px;height:396px;" bgcolor="#000000"><param name="allowFullScreen" value="true"/><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.justin.tv/swflibs/JustinPlayer.swf" /><param name="flashvars" value="hostname=www.justin.tv&channel=btvstream&auto_play=false&start_volume=25" /></object>',
  });
  streams.push({
    code: '<object width="704" height="396" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="flashvars" value="cid=16407308&amp;autoplay=false"/><param name="allowfullscreen" value="true"/><param name="allowscriptaccess" value="always"/><param name="src" value="http://www.ustream.tv/flash/viewer.swf"/><embed flashvars="cid=16407308&amp;autoplay=false" width="704" height="396" allowfullscreen="true" allowscriptaccess="always" src="http://www.ustream.tv/flash/viewer.swf" type="application/x-shockwave-flash"></embed></object>',
  });
  streams.push({
    code: '<object width="704" height="396" id="lsplayer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="http://cdn.livestream.com/grid/LSPlayer.swf?channel=efnwpresents&amp;autoPlay=false"></param><param name="allowScriptAccess" value="always"></param><param name="allowFullScreen" value="true"></param><embed name="lsplayer" wmode="transparent" src="http://cdn.livestream.com/grid/LSPlayer.swf?channel=efnwpresents&amp;autoPlay=false" width="560" height="340" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash"></embed></object>',
  });
  // add any new streams you want here using the same syntax
  
  function switch_stream(selection) {
    var new_stream = streams[selection];
    var player = $('#vid');
    player.fadeOut(function() {
      player.html(new_stream.code).show();
    });
  }
  
  $('#jtv').on('click', function() {
    switch_stream(0);
//    $('#jtv').html('Click to Reload!').button("refresh");
//    $('#ustream').html('Switch to U-Stream!').button("refresh");
  });
  $('#ustream').on('click', function() {
    switch_stream(1);i
//    $('#jtv').html('Switch to JustinTV!').button("refresh");
//    $('#ustream').html('Click to Reload!').button("refresh");
  });
  $('#efnw').on('click', function() {
    switch_stream(2);
  });
  
  switch_stream(1);
}

$(function() { init_stream_switcher(); });
