var express = require("express");
var app     = express();
var path    = require("path");

app.use(express.static('src'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/src/index.html'));
  //__dirname : It will resolve to your project folder.
});
/*
app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/src/about.html'));
});

app.get('/digitalClock',function(req,res){
  res.sendFile(path.join(__dirname+'/src/digitalClock.html'));
});
*/
app.listen(8080);

console.log("Running at Port 8080");
