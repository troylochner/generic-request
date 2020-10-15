// Dependencies
// ===========================================================
var express = require("express");
var uuid = require("uuid");
var app = express();
var path = require("path");
var PORT = 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

var unreadRequest = [] ; 

//ROUTES
// =============================================================
// Basic route that sends the user first to the AJAX Page

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
  });

app.get("/submit", function (req, res) {
    res.sendFile(path.join(__dirname, "views/submit.html"));
  });

app.post("/api/submit", function (req, res) {
    var newRequest = req.body;
    
    newRequest.uuid = uuid.v4()
    unreadRequest.push(newRequest);
  
    res.json(newRequest);
    console.log(newRequest);
  
  });



  // Listener
// ===========================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});