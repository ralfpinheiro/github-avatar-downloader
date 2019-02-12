var request = require("request");
var fs = require("fs");
var secret = require("./secret.js");
var repoName = process.argv[3];
var repoOwner = process.argv[2];

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      Authorization: "token e7b2365d90b35893632f79c93a915433b8345600"
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  //   var path = "./avatars/";

  request
    .get(url)
    .on("error", function(err) {
      throw err;
    })
    .on("response", function(response) {
      console.log("Response Status Code: ", response.statusCode);
    })
    .pipe(fs.createWriteStream("./avatars/" + filePath));
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  if (repoName === undefined || repoOwner === undefined) {
    console.log("ERROR: please enter an argument");
    throw err;
  } else {
    var list = JSON.parse(result);
    for (var i = 0; i < list.length; i++) {
      avatar_url = list[i].avatar_url;
      user_name = list[i].login + ".jpg";
      downloadImageByURL(avatar_url, user_name);
    }
  }
});
