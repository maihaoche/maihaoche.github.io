"use strict";

const path = require("path");
const http = require("http");

const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname));

app.use(express.static(path.join(__dirname)));
// app.use("/", require("./routes"));

//设端口
let port = process.argv[2];
port = /^\d{4,5}$/.test(port) ? port : app.get('port');
console.log('Listening on', port);

http.createServer(app).listen(port, function(){
  console.log("Server listening on port " + port);
}).on('error',function(err){
  console.log('错了',err.code);
});
