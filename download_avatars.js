var request = require("request");
var fs = require("fs");

var requestOptions = {
  url: "https://api.github.com/repos/jquery/jquery/contributors",
  json: true
};

function list(cont) {
  console.log(cont);
}

list(requestOptions.url, list);
