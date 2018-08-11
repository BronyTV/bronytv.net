var PlaylistManager = function(source) {
  this.source = source;
  this.visible = false;
  this.data = null;
};

PlaylistManager.prototype = {
  start: function() {
    var mgr = this;
    mgr.visible = true;
    $('#playlist').slideDown("slow", function() {
      mgr.fetch();
    });
  },
  stop: function(cb) {
    var mgr = this;
    $('#playlist').slideUp("slow", function() {
      $('#playlist ol li').remove();
      mgr.visible = false;
      if (cb) { cb(); }
    });
  },
  fetch: function() {
    var mgr = this;
    var list = $('#playlist ol');

    function await()
    {
      setTimeout(function() { mgr.fetch(); }, 5000);
    }

    function animate(actions)
    {
      if (actions.remove.length > 0) {
        var item = actions.remove.shift();
        $(item).slideUp("slow", function() { this.remove(); animate(actions); });
      } else if (actions.sync.length > 0) {
        $(actions.sync).appendTo(list);
        actions.sync = [];
        animate(actions);
      } else if (actions.add.length > 0) {
        var item = actions.add.shift();
        $(item).slideDown("slow", function() { animate(actions); });
      } else {
        await();
      }
    }

    function sync(data)
    {
      var actions = { add: [], sync: [], remove: jQuery.makeArray($('li', list)) };
      for (var i = 0; i < data.length; ++i) {
        var v = data[i];
        var item = $('#plid-'+v.id);
        if (item.length == 0) {
          item = $('<li/>', {
            id: 'plid-'+v.id,
          });
          if (v.link) {
            item.append($('<a/>', {
              href: v.link,
              target: '_blank',
              text: v.name,
            }));
          } else {
            item.text(v.name);
          }
          if (v.artist) {
            item.append($('<span/>', { text: ' - ' + v.artist }));
          }
          actions.add.push(item[0]);
        } else {
          for (var j = actions.remove.length; j--;) {
            if (actions.remove[j] === item[0]) {
              actions.remove.splice(j, 1);
            }
          }
        }
        actions.sync.push(item[0]);
      }
      animate(actions);
    }

    $.ajax({
      url: mgr.source,
      ifModified: (mgr.data != null),
      cache: false,
      dataType: 'json',
    }).done(function(data) {
      if (typeof data !== 'undefined') {
        mgr.data = data.playlist;
        sync(data.playlist);
      } else {
        await();
      }
    }).fail(function() { 
      await();
    });
  },
};
