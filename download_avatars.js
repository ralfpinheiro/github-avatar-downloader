var request = require("request");
var fs = require("fs");
var secret = require("./secret.js");
var repoName = process.argv[3];
var repoOwner = process.argv[2];

console.log("- Welcome to the GitHub Avatar Downloader! -");
// function retrieve the information frm github server based on the parameters entered with the command line
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      Authorization: "e7b2365d90b35893632f79c93a915433b8345600"
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}
// function handles 2 parameters, 'avatar url' and 'filePath', and pipe the file
function downloadImageByURL(url, filePath) {
  var path = "./avatars/"; // directory where avatar image files will be written
  request
    .get(url)
    .on("error", function(err) {
      throw err;
    })
    .on("response", function(response) {
      console.log("Downloaded" + "avatarimage - " + filePath);
    })
    .pipe(fs.createWriteStream(path + filePath));
}
// Invoking the main function with  arguments, handling error first
getRepoContributors(repoOwner, repoName, function(err, result) {
  if (repoName === undefined || repoOwner === undefined) {
    console.log("--ERROR: please enter <repo-name> and <repo-owner>--");
    throw err;
  } else {
    //Parses the contributors list from github api
    var list = JSON.parse(result);
    // Loops through the list, outputs the avarar url and user name
    list.forEach(function(el) {
      avatar_url = el.avatar_url;
      user_name = el.login + ".jpg";
      // Invokes function with the parameters found
      downloadImageByURL(avatar_url, user_name);
    });
  }
});
