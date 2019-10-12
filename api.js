
function findMusicFolder() {
  caches.open('my-cache').then((cache) => {
    cache.match('/folder.json').then((response) => {
      try {
        return response.json(); // try to return cache
      }
      catch {
        return gapi.client.drive.files.list({
          'pageSize': 1,
          'q' : " name contains 'my-music' and trashed = false ",
          'fields': "nextPageToken, files(id, name)"
        }).then(function(response) {
          if (response.result.files && response.result.files.length > 0) {
            caches.open('my-cache').then((cache) => { // add to cache
              cache.put('/folder.json', new Response( JSON.stringify(response) ));
            });
          }
          return response; // try to return API request
        });
      }
    }).then(function(data) {
      if (data.result.files && data.result.files.length > 0) {
        var file = data.result.files[0];
        findAlbumFolders(file.id);
      } else {
        $('#instructions').show();
      }
    });
  });
}

function findAlbumFolders(id) {
  caches.open('my-cache').then((cache) => {
    cache.match('/albums.json').then((response) => {
      try {
        //console.log("caught");
        var albumquery = "'" + id + "'" + " in parents and mimeType contains 'application/vnd.google-apps.folder' and trashed = false ";
        return gapi.client.drive.files.list({
          'pageSize': 1000,
          'orderBy': 'name',
          'q' : albumquery,
          'fields': "nextPageToken, files(id, name)"
        }).then(function(response) {
          if (response.result.files && response.result.files.length > 0) {
            caches.open('my-cache').then((cache) => { // add to cache
              cache.put('/albums.json', new Response( JSON.stringify(response) ));
            });
          }
          return response; // try to return API request
        });
      }
      catch {
        return response.json(); // try to return cache
      }
    }).then(function(data) {
      if (data.result.files && data.result.files.length > 0) {
        var albums = data.result.files;
        for (var i = 0; i < albums.length; i++) {
          $('#albums').append("<button class='album' data-album-id='" + albums[i].id + "' " + "data-album-name='" + albums[i].name + "'>" + "<img src='" + "placeholder.jpg" + "' />" + "<span>" + albums[i].name + "</span>" + "</button>");
        }
        findArts();
      } else {
        $('#instructions').show();
      }
    });
  });
}

function findArts() {
  caches.open('my-cache').then((cache) => {
    cache.match('/arts.json').then((response) => {
      try {
        //console.log("caught");
        var albumartquery = "mimeType contains 'image/' and trashed = false and name contains 'folder.jpg' ";
        return gapi.client.drive.files.list({
          'pageSize': 1000,
          'q' : albumartquery,
          'fields': "nextPageToken, files(id, name, webContentLink, parents)"
        }).then(function(response) {
          if (response.result.files && response.result.files.length > 0) {
            caches.open('my-cache').then((cache) => { // add to cache
              cache.put('/arts.json', new Response( JSON.stringify(response) ));
            });
          }
          return response; // try to return API request
        });
      }
      catch {
        return response.json(); // try to return cache
      }
    }).then(function(data) {
      if (data.result.files && data.result.files.length > 0) {
        var arts = data.result.files;
        for (var i = 0; i < arts.length; i++) {
          var artURL = arts[i].webContentLink;
          var parent = arts[i].parents[0];
          $(".album[data-album-id=" + parent + "] img").attr('src', artURL);
        }
      } else {
        //$('#instructions').show();
      }
    });
  });
}

function listTracks(id) {
  var trackquery = "'" + id + "'" + " in parents and mimeType contains 'audio/' and trashed = false";
  gapi.client.drive.files.list({
    'pageSize': 50,
    'q' : trackquery,
    'fields': "nextPageToken, files(id, name, webContentLink)"
  }).then(function(response) {
    
    var files = response.result.files;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        $('#track-list').append("<button class='track' data-track-id='" + file.webContentLink + "'>" + file.name + "</button>");
        
      }

      var mylist = $('#track-list');
      var listitems = mylist.children('button').get();
      listitems.sort(function(a, b) {
        return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
      })
      $.each(listitems, function(idx, itm) { mylist.append(itm); });

      // highlight current track, if available
      var currentTrackId = $('source').attr("data-track-id");
      $(".track[data-track-id='" + currentTrackId + "']").addClass('track-active');

    } else {
      alert('No files found.'); 
    }
  });
}
