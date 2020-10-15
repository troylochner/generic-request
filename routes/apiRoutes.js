// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const fs = require("fs");
const util = require("util");


// ================================================================================
//GET UNREAD REQUESTS
var unreadRequest = [] ; 

fs.readFile("data/unreadRequest.json", "utf8", function(error, data) {
    if (error) {
      return ;
    }
    unreadRequest= JSON.parse(data);
  });
  // ================================================================================



/*
var tableData = require("../data/tableData");
var waitListData = require("../data/waitinglistData");
*/
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/requests/", function(req,res){
    return res.json(unreadRequest);
})

  app.get("/api/request/:uuid", function(req,res){
    var uuid = req.params.uuid ;
     console.log(uuid)
    let obj = unreadRequest.find(obj => obj.uuid == uuid);
    res.json(obj)
});


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  app.post("/api/submit", function (req, res) {
    var newRequest = req.body;

    newRequest.uuid = uuid.v4()
    newRequest.timestamp = dayjs().format();
    unreadRequest.push(newRequest);

    res.json(newRequest);
    //console.log(newRequest);

    writeFileAsync("data/unreadRequest.json", JSON.stringify(unreadRequest))
});


  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

/*

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};

*/

}

