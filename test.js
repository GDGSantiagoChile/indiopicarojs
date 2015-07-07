'use strict';
var five = require('johnny-five');
var board = new five.Board();
var Twitter = require('node-tweet-stream');
var t = new Twitter({
   consumer_key: '8Q9T8yWUaPHnqgRTAnS1maR5K',
   consumer_secret: 'XcThyabsygUQPfJHpOQfFJttyjOVg3zITEwj4pRROExzcCU8K1',
   token: '44652089-f3Y09zedoTIRilolC6tIJYrQZ5yp2yS17ijxUwRzk',
   token_secret: '85tIzY4XSYn4n5lrkokWpHzm5PnjIUW0y7EbEM0oHh3nk'
});
var busy = false;

var subirIndio = function(servo, piezo, theSong) {
   if (!busy) {
      servo.to(0);
      piezo.play({
         tempo: 1700,
         song: theSong
      });
      busy = false;
   }
};

var bajarIndio = function(servo, piezo, theSong) {
   if (!busy) {
      servo.to(180, 1200);
      piezo.play({
         tempo: 1700,
         song: theSong
      });
      busy = false;
   }
};

board.on('ready', function() {
   var servo = new five.Servo({
      pin: 10,
      startAt: 180
   });
   var piezo = new five.Piezo({
      pin: 11
   });

   var theSongUp = [];
   var theSongDown = [];
   for (var i = 500; i < 1000; i += 10) {
      theSongUp.push([
         i, 1
      ]);
      theSongDown.push([
         1000 - i, 1
      ]);
   }

   t.on('tweet', function(tweet) {
      if (tweet.text.toLowerCase().indexOf('levantate') > -1) {
         //SUBIR INDIO PICARO
         subirIndio(servo, piezo, theSongUp);
      } else if (tweet.text.toLowerCase().indexOf('bajate') > -1) {
         //BAJAR INDIO PICARO
         bajarIndio(servo, piezo, theSongDown);
      }
   });
   t.on('error', function(err) {
      console.log('Oh no');
   });
   t.track('@indiopicaro_js');
});
