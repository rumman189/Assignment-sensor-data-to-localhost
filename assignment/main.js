
var fs  = require("fs");
var events = require('events');
var file_creator = require('./file_creator.js');
var rl = require('readline-specific');

eventEmitter = new events.EventEmitter();

eventEmitter.on('sendToDatabase',function(data){
    
        fs.appendFile('database.txt', data, (err) => {  
            if (err) throw err;
        });
});

temp_file_line_no=1;
acc_file_line_no=1;
hum_file_line_no=1;

file_creator.createFile();



tempIntervalId = setInterval(function (){
    var timeStamp = new Date();
    data='';
rl.oneline('./temp_sensor.txt', temp_file_line_no, function(err, res) {
    if (err) console.error(err);	//handling error
    eventEmitter.emit('sendToDatabase',timeStamp+", "+ res+'\n');
  });
  temp_file_line_no++;

    if(temp_file_line_no>10){
        clearInterval(tempIntervalId);
        showDatabase();
    }
},1000);

accIntervalId = setInterval(function(){
    var timeStamp = new Date();
    data='';
    rl.oneline('./accelerometer_sensor.txt', acc_file_line_no, function(err, res) {
        if (err) console.error(err);	//handling error
        eventEmitter.emit('sendToDatabase',timeStamp+", "+ res+'\n');
      });
      
      acc_file_line_no++;
      if(acc_file_line_no>10){
          clearInterval(accIntervalId);
          showDatabase();

      }
    },2000);

    humIntervalId = setInterval(function(){
    var timeStamp = new Date();
    data='';
    rl.oneline('./humidity_sensor.txt', hum_file_line_no, function(err, res) {
        if (err) console.error(err);	//handling error
        eventEmitter.emit('sendToDatabase',timeStamp+", "+ res+'\n');
    });
    hum_file_line_no++;
    if(hum_file_line_no>10){
        clearInterval(humIntervalId);
        showDatabase();
    }
},3000);

function showDatabase(){
    if(acc_file_line_no>10 && temp_file_line_no>10 && hum_file_line_no>10){
        setTimeout(function(){
            fs.readFile('./database.txt',function(err,data){
                console.log(data.toString('ascii'));
            });
        },1000);
        
    }
}

