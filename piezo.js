'use strict';
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
   var piezo = new five.Piezo({
      pin: 10
   });

   var theSong = [];
   for (var i = 500; i < 1000; i+=10) {
      theSong.push([
         i, 1
      ]);
   }
   piezo.play({
      tempo: 1700,
      song: theSong
   });


});
