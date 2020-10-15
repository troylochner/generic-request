// Dependencies
// ===========================================================
var express = require("express");
var uuid = require("uuid");
var app = express();
var path = require("path");
const fs = require("fs");
const util = require("util");

//DATE TIME FORMATTER
var dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()


var PORT = 3000;


//SETUP WRITE FILE OPTIONS
const writeFileAsync = util.promisify(fs.writeFile);


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//GET UNREAD REQUESTS
var unreadRequest = [] ; 

fs.readFile("unreadRequest.json", "utf8", function(error, data) {
    if (error) {
      return ;
    }
    unreadRequest= JSON.parse(data);
  });



//ROUTES
// =============================================================
// Basic route that sends the user first to the AJAX Page

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/submit", function (req, res) {
    res.sendFile(path.join(__dirname, "views/submit.html"));
});

app.get("/api/request/:uuid", function(req,res){
    var uuid = req.params.uuid ;
     console.log(uuid)
    let obj = unreadRequest.find(obj => obj.uuid == uuid);
    res.json(obj)
});

app.post("/api/submit", function (req, res) {
    var newRequest = req.body;

    newRequest.uuid = uuid.v4()
    newRequest.timestamp = dayjs().format();
    unreadRequest.push(newRequest);

    res.json(newRequest);
    //console.log(newRequest);

    writeFileAsync("unreadRequest.json", JSON.stringify(unreadRequest))
});

app.get("/api/requests/", function(req,res){
    return res.json(unreadRequest);
})

// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});