// Require Express.js and minimist
const express = require("express")
const minimist = require("minimist")
const argv = minimist(process.argv.slice(2))
const port = argv["port"] || 5000
const app = express()

// functions
function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? "heads" : "tails";
}

function coinFlips(flips) {
    let results = [];
    let i = 0;
    while(i < flips) {
      results[i] = coinFlip();
      i ++;
    }
    return results;
}

function countFlips(array) {
    let heads = 0;
    let tails = 0;
    for(var i = 0; i < array.length; i ++) {
      if(array[i] == "heads") {
        heads ++;
      } else {
        tails ++;
      }
    }
    return {"heads": heads, "tails": tails};
}

function flipACoin(call) {
    let flip = coinFlip();
    let result = "";
    if(flip == call){
      result = "win";
    } else {
      result = "lose";
    }
    return {"call": call, "flip": flip, "result": result};
}
// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

// Define check endpoint
app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });