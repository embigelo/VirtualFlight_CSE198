//Main driver for the Virtual Flight application

require("./helpers.js");
/*
================Drone Object================
*/
var drone = require("./models/drone.js");

/*
================Server================
*/
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var routes = {
  stream: require('./routes/stream')
};

app.get('/', function(req, res) {
     res.sendFile('index.html');
});

var server = app.listen(8000, function() {
    console.log("Started server on port %d", server.address().port);
});


/*
================DRONE CONTROL HTTP API================
*/

app.post("/", function (req, res) {
    console.log(req);
    var success;
    switch(req.command) {
        case "pitch":
            success = drone.pitch();
        case "yaw":
            success = drone.yaw();
        case "roll":
            success = drone.roll();
        case "ascend":
            success = drone.ascend();
        case "descend":
            success = drone.descend();
        case "hold_height":
            success = drone.hold_height();
        case "toggle_hover":
            success = drone.toggle_hover();
        case "takeoff":
            success = drone.takeoff();
        case "land":
            success = drone.land();
        default:
            success = false;
            console.log("Could not recognize req.command: %s", req.command);

        if (!success) {
            console.log("Post request failed")
            res.status(500).send("command failed");
        } else {
            res.status(200).send("success");
        }
    }
});

/*
================Video Stream================



// var client = require("./oculus.js");
var stream = require("dronestream");
stream.listen(server);



console.log("Booting up");



// setTimeout(drone.takeoff, 0);

// setTimeout(drone.pitch,5000, 3);
// setTimeout(drone.pitch,6000, -10);
// setTimeout(drone.pitch,7000, 0);

// setTimeout(drone.roll,8000, 5);
// setTimeout(drone.roll,9000, -5);
// setTimeout(drone.roll,10000, 0);

// setTimeout(drone.land, 14000);
*/
