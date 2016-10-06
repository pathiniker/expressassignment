var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

// middleware function, gets executed on each request
app.use(function(req, res, next){
  console.log('Got a request!');
  next();
});

// middleware for parsing the body and turning it into a JS object
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req, res){
  console.log('req.body=', req.body);
  res.sendStatus(200);
});

app.get('/', function(req, res){
  console.log('Received a request at', new Date());
  // __dirname is the folder this file lives in
  var filename = path.join(__dirname, 'public/views/index.html');
  console.log('filename:', filename);
  res.sendFile(filename);
});

app.get('/kittens', function(req, res){
  console.log('Query params:', req.query);
  if (req.query.age > 2) {
    res.send('MEOW!');
  } else {
    res.send('meow');
  }
});

var songs = [];


app.post('/songs', function(req, res){

  var newSong = 0;
// var title = req.body.title;
// var artist = req.body.artist;



// function checkDuplicate(){

    songs.forEach(function(song){
    if (song.title == req.body.title && song.artist == req.body.artist) {
    newSong = 1;

  }
});
// }


if ( req.body.title == "" || req.body.artist == "" ){
  res.sendStatus(400);

// } else if ( songs.length === 0 ){
//     addSong();

}
else if (newSong != 0) {
      res.sendStatus(409);
}
else {
      addSong();
   }


function addSong()  {
  var today = new Date().toLocaleDateString('en-GB', {
    // day : 'numeric',
    // month : 'short',
    // year : 'numeric'
   }).split(' ').join(' ');


  req.body.dateAdded = today;
  songs.push(req.body);
  console.log('songs', songs);
  res.sendStatus(200);
}
});

app.get('/songs', function(req, res){
  res.send(songs);
});

// middleware for serving static files
app.use(express.static('public'));

app.listen(3000);
