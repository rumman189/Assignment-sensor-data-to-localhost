fs= require('fs');
module.exports.createFile = createFile;

function createFile() {
    temp ='';
    acc='';
    hum='';
    
    for(i=1;i<=100;i++){
        temp  += "line "+i+", "+getRandom(30.0,45.0)+" C\n";
        hum +=  "line "+i+", "+getRandom(40.0,100.0)+"%\n";
        acc += "line "+i+", "+ getRandom(1.0,100.0)+'\n';

    }

    fs.writeFileSync('temp_sensor.txt',temp);
    fs.writeFileSync('humidity_sensor.txt',hum);
    fs.writeFileSync('accelerometer_sensor.txt',acc);
    fs.truncate('database.txt', 0,function(){});
}

function getRandom(min, max) {
    var value= (Math.random() * (max - min)) + min;
    return value.toFixed(2); 
}


