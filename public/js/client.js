$(function(){
  // ask the server for songs, and then draw them
  getSongs();

  // listen for submit events and send new songs to the server
  $('form').on('submit', function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/songs',
      data: formData,
      success: getSongs,
      statusCode: {
        400: function (){
          alert('Required fields');
        },
        409: function(){
          alert('Song and Artist already entered. Try something else!');
        }
      }
    });

    $(this).find('input[type=text]').val('');
  });
});

function getSongs() {
  $.ajax({
    type: 'GET',
    url: '/songs',
    success: function(songs){
      $('#songs').empty();
      songs.forEach(function(song){
        var $li = $('<li class=""></li>');
        $li.append('<p><b>"'+ song.title + '"</b></p>');
        $li.append('<p> &emsp;- '+ song.artist + '</p>');
        $li.append('<p><i>Added on: '+ song.dateAdded + '</i></p>');
        $('#songs').append($li);
      });

    }


  });
}
