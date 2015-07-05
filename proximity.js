var five = require("johnny-five");
var board = new five.Board();
var controller = process.argv[2] || "GP2Y0A02YK0F";

board.on("ready", function() {
  var proximity = new five.IR.Proximity({
    controller: controller,
    pin: "A0"
  });

  proximity.on("data", function() {
    console.log("inches: ", this.inches);
    console.log("cm: ", this.cm);
  });
});
