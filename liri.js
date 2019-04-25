// INITALIZING DOTENV
require("dotenv").config();


// NPM'S
var Spotify = require('node-spotify-api');
var axios = require('axios');
var request = require('request');
var moment = require('moment');
var chalk = require('chalk'); //for my terminal colors

// GLOBAL VAR'S
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var input = process.argv[3];

// SWITCH CASE
switch (action) {
  case 'concert-this':
    console.log("You Want a concert for ", input);
    break;
  case 'spotify-this-song':
    console.log("You Want A Song For ", input);
    break;
  case 'movie-this':
    console.log("You Want A Movie For " + input);
    break;
  case 'do-what-it-says':
    console.log("Do what it says");
    break
  default:
    console.log("Sorry, I Have No Idea...")

}

// USERS DEFUALT SONG
if (action === 'spotify-this-song' && input == undefined) {

  spotify
    .search({ type: 'track', query: 'Say My Name', limit: 1 })
    .then(function (response) {
      console.log(chalk.green("Title:") + chalk.blue(response.tracks.items[0].artists[0].name));
      console.log(chalk.green("Artist:") + chalk.blue(response.tracks.items[0].name));
      console.log(chalk.green("Link:") + chalk.blue(response.tracks.items[0].external_urls.spotify));
      console.log(chalk.green("Album:") + chalk.blue(response.tracks.items[0].album.name));
    })
    .catch(function (err) {
      console.log(err);
    });
}

// SPOTIFY-THIS-SONG
else if (action === 'spotify-this-song' && input != undefined && input != null && input != "") {

  spotify
    .search({ type: 'track', query: input, limit: 1 })
    .then(function (response) {
      console.log(chalk.green("Title:") + chalk.blue(response.tracks.items[0].artists[0].name));
      console.log(chalk.green("Artist:") + chalk.blue(response.tracks.items[0].name));
      console.log(chalk.green("Link:") + chalk.blue(response.tracks.items[0].external_urls.spotify));
      console.log(chalk.green("Album:") + chalk.blue(response.tracks.items[0].album.name));
    })
    .catch(function (err) {
      console.log(err);
    });
}
// MOVIE-THIS
if (action === 'movie-this' && input == undefined) {
  request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log(chalk.green("Title:") + chalk.blue(JSON.parse(body).Title));
      console.log(chalk.green("Year:") + chalk.blue(JSON.parse(body).Year));
      console.log(chalk.green("The movie's IMDB rating is: ") + chalk.blue(JSON.parse(body).imdbRating));
      console.log(chalk.green(JSON.parse(body).Ratings[1].Source) + chalk.green(": ") + chalk.blue(JSON.parse(body).Ratings[1].Value));
      console.log(chalk.green("Country:") + chalk.blue(JSON.parse(body).Country));
      console.log(chalk.green("Language:") + chalk.blue(JSON.parse(body).Language));
      console.log(chalk.green("Plot:") + chalk.blue(JSON.parse(body).Plot));
      console.log(chalk.green("Actors:") + chalk.blue(JSON.parse(body).Actors));
    }
  });

}

// OMDB-MOVIE
else if (action === 'movie-this' && input != undefined && input != null && input != "") {
  request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    if (!error && response.statusCode === 200) {
        
      console.log(chalk.green("Title:") + chalk.blue(JSON.parse(body).Title));
      console.log(chalk.green("Year:") + chalk.blue(JSON.parse(body).Year));
      console.log(chalk.green("The movie's IMDB rating is: ") + chalk.blue(JSON.parse(body).imdbRating));
      // console.log(chalk.green(JSON.parse(body).Ratings[1].Source) + chalk.green("Source: ") + chalk.blue(JSON.parse(body).Ratings[1].Value));
      console.log(chalk.green("Country:") + chalk.blue(JSON.parse(body).Country));
      console.log(chalk.green("Language:") + chalk.blue(JSON.parse(body).Language));
      console.log(chalk.green("Plot:") + chalk.blue(JSON.parse(body).Plot));
      console.log(chalk.green("Actors:") + chalk.blue(JSON.parse(body).Actors));
    }
  });
}

// BANDS-IN-TOWN
if (action === 'concert-this') {
var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
console.log(queryURL);
  axios.get(queryURL).then(function(response) {
    // console.log(response.data);
    if (response.data.length>0) {
      // console.log(response.data);
      for (var i = 1; i < 4; i++) {
        var dateOfEvent = moment(response.data[i].datetime).format("X");
        var convertedDate = moment.unix(dateOfEvent).format("MM/DD/YYYY");
        console.log(chalk.green("Venue Name:") + chalk.blue(response.data[i].venue.name));
        console.log(chalk.green("Reigon:") + chalk.blue((response.data[i].venue.city)) + " " + (response.data[i].venue.region));
        console.log(chalk.green("Date:") + chalk.blue(convertedDate));
      }
  
    }
    else {
      console.log(input + " Not Touring ");
    }
    // console.log(body);
  });
}
// DO-WHAT-IT-SAYS
if (action === 'do-what-it-says') {
  fs.readFile("random.txt", "utf8", function (error, data) {

    //ERR
    if (error) {
      return console.log(error);
    }
    console.log(data);

    // SPLIT
    var dataArr = data.split(",");
    action = 'spotify-this-song';
    input = (dataArr[0], dataArr[1]);
    function spotifyThis() {
      if (action === 'spotify-this-song' && input != undefined && input != null && input != "") {

        spotify
          .search({ type: 'track', query: input, limit: 1 })
          .then(function (response) {
            console.log(chalk.green("Title:") + chalk.blue(response.tracks.items[0].artists[0].name));
            console.log(chalk.green("Artist:") + chalk.blue(response.tracks.items[0].name));
            console.log(chalk.green("Link:") + chalk.blue(response.tracks.items[0].external_urls.spotify));
            console.log(chalk.green("Album:") + chalk.blue(response.tracks.items[0].album.name));
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
    spotifyThis();
  });
}
//CREATED BY: COURTNEY MANERY, GITCREATIV LLC|2019