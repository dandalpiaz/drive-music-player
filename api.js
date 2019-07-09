
function findMusicFolder() {
  gapi.client.drive.files.list({
    'pageSize': 1,
    'q' : " name contains 'my-music' and trashed = false ",
    'fields': "nextPageToken, files(id, name)"
  }).then(function(response) {
    
    var files = response.result.files;
    if (files && files.length > 0) {
      var file = files[0];
      findAlbumFolders(file.id);
    } else {
      $('#instructions').show();
      //alert('No music folder found.');
    }
  });
}

function findAlbumFolders(id) {
  var albumquery = "'" + id + "'" + " in parents and mimeType contains 'application/vnd.google-apps.folder' and trashed = false ";
  gapi.client.drive.files.list({
    'pageSize': 100,
    'orderBy': 'name',
    'q' : albumquery,
    'fields': "nextPageToken, files(id, name)"
  }).then(function(response) {
    
    var albums = response.result.files;
    
    for (var i = 0; i < albums.length; i++) {
      $('#albums').append("<button class='album' data-album-id='" + albums[i].id + "' " + "data-album-name='" + albums[i].name + "'>" + "<span>" + albums[i].name + "</span>" + "</button>");
    }

  });

  // get arts
  var albumartquery = "mimeType contains 'image/' and trashed = false and name contains 'folder.jpg' ";
  gapi.client.drive.files.list({
    'pageSize': 100,
    'q' : albumartquery,
    'fields': "nextPageToken, files(id, name, webContentLink, parents)"
  }).then(function(response) {
    
    var arts = response.result.files;
    
    for (var i = 0; i < arts.length; i++) {
      var artURL = arts[i].webContentLink;
      var parent = arts[i].parents[0];
      $(".album[data-album-id=" + parent + "]").prepend("<img src='" + artURL + "' />");
    }

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
