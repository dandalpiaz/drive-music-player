
var APIcount = 0;

function APIcounter() {
  APIcount++;
  $('#count').html("<p>" + APIcount + "</p>");
}

function findMusicFolder() {
  gapi.client.drive.files.list({
    'pageSize': 1,
    'q' : " name contains 'music123' and trashed = false ",
    'fields': "nextPageToken, files(id, name)"
  }).then(function(response) {
    APIcounter();
    
    var files = response.result.files;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        findAlbumFolders(file.id);
      }
    } else {
      alert('No music folder found.');
    }
  });
}

function findAlbumFolders(id) {
  var albumquery = "'" + id + "'" + " in parents and mimeType contains 'application/vnd.google-apps.folder' and trashed = false ";
  gapi.client.drive.files.list({
    'pageSize': 1000,
    'orderBy': 'name',
    'q' : albumquery,
    'fields': "nextPageToken, files(id, name)"
  }).then(function(response) {
    APIcounter();
    
    var albums = response.result.files;
    
    for (var i = 0; i < albums.length; i++) {
      $('#albums').append("<a class='album' href='#' data-album-id='" + albums[i].id + "' " + "data-album-name='" + albums[i].name + "'>" + "</a>");
    }

  });

  // get arts
  var albumartquery = "mimeType contains 'image/' and name contains 'folder'";
  gapi.client.drive.files.list({
    'pageSize': 1000,
    'q' : albumartquery,
    'fields': "nextPageToken, files(id, name, webContentLink, parents)"
  }).then(function(response) {
    APIcounter();
    
    var arts = response.result.files;
    
    for (var i = 0; i < arts.length; i++) {
      var artURL = arts[i].webContentLink;
      var parent = arts[i].parents[0];
      $(".album[data-album-id=" + parent + "]").append("<img src='" + artURL + "' />");
    }

  });

}

function listTracks(id) {
  var trackquery = "'" + id + "'" + " in parents and mimeType contains 'audio/'";
  gapi.client.drive.files.list({
    'pageSize': 50,
    'q' : trackquery,
    'fields': "nextPageToken, files(id, name, webContentLink)"
  }).then(function(response) {
    APIcounter();
    
    var files = response.result.files;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        $('#track-list').append("<a class='track' href='#' data-track-id='" + file.webContentLink + "'>" + file.name + "</a>");
        
      }

      var mylist = $('#track-list');
      var listitems = mylist.children('a').get();
      listitems.sort(function(a, b) {
        return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
      })
      $.each(listitems, function(idx, itm) { mylist.append(itm); });

      // highlight current track, if available
      var currentTrackId = $('source').attr("data-track-id");
      $(".track[data-track-id='" + currentTrackId + "']").addClass('track-active');

      $('#track-list-close').show();

    } else {
      alert('No files found.'); 
    }
  });
}

function playTrack(id) {

  var audio = $("audio");  
  $('source').attr("src", id);
  $('source').attr("data-track-id", id);
  audio[0].pause();
  audio[0].load(); //suspends and restores all audio element
  audio[0].oncanplaythrough = audio[0].play();

  $(".track[data-track-id='" + id + "']").addClass('track-active');
  
}