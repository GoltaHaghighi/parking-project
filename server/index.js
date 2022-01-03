const express = require("express");
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( '../client/src/index.js');


const app = express();
var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('COM7',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});

parser.on('data', function(data) {
    
    console.log('Received data from port: ' + data);
    
    io.emit('data', data);
    
});
// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
// });

app.listen(3000, () => {
  console.log(`Server listening on ${3000}`);
});