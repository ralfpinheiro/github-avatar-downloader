var request = require("request");
var fs = require("fs");

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

// var requestOptions = {
//   url: "https://api.github.com/repos/jquery/jquery/contributors",
//   json: true
// };

// function list(cont) {
//   console.log(cont);
// }

// list(requestOptions, list);
