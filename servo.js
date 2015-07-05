var five = require("johnny-five");
var board = new five.Board();
var controller = process.argv[2] || "GP2Y0A02YK0F";

board.on("ready", function() {
    var servo = new five.Servo({
        pin: 10,
        range: [0, 180],
        startAt: 0,
        type: 'continuous'
    });

    servo.to(0);
    servo.to(180);

});
