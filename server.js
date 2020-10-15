// ===========================================================
// Dependencies
// ===========================================================
var express = require("express");
var uuid = require("uuid");
var path = require("path");



//DATE TIME FORMATTER
var dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================
// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// ================================================================================
//SETUP WRITE FILE OPTIONS
//const writeFileAsync = util.promisify(fs.writeFile);
// ================================================================================

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  