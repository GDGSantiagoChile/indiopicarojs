var five = require("johnny-five");
var board = new five.Board();
var Twitter = require('node-tweet-stream');
var t = new Twitter({
    consumer_key: '8Q9T8yWUaPHnqgRTAnS1maR5K',
    consumer_secret: 'XcThyabsygUQPfJHpOQfFJttyjOVg3zITEwj4pRROExzcCU8K1',
    token: '44652089-f3Y09zedoTIRilolC6tIJYrQZ5yp2yS17ijxUwRzk',
    token_secret: '85tIzY4XSYn4n5lrkokWpHzm5PnjIUW0y7EbEM0oHh3nk'
});


board.on("ready", function() {
    var led = new five.Led(13);
    t.on('tweet', function(tweet) {
        if (tweet.text.toLowerCase().indexOf("levantate") > -1) {
            led.blink(500);
            //SUBIR INDIO PICARO
        } else if (tweet.text.toLowerCase().indexOf("bajate") > -1) {
            //BAJAR INDIO PICARO
            led.off();
        }
    });
    t.on('error', function(err) {
        console.log('Oh no');
    });
    t.track('@indiopicaro_js');
});


/*

*/
