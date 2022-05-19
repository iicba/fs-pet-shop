'use strict';
var fs = require('fs');
var path = require('path');
var http = require('http');
var petsPath = path.join(__dirname, 'pets.json');


var PORT = process.env.PORT || 8000;

var server = http.createServer(function (req, res) {
    fs.readFile(petsPath, 'utf8', function (err, petsJSON) {
        if (err) {
            console.error(err.stack)
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
        }
        else if (req.url === '/pets') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSON);
        }
        else if (req.url === '/pets/0') {
            var pets = JSON.parse(petsJSON);
            var petIndJSON = JSON.stringify(pets[0]);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(petIndJSON)
        }
        else if (req.url === '/pets/1'){
            var pets = JSON.parse(petsJSON);
            var petIndJSON = JSON.stringify(pets[1]);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(petIndJSON)
        }
        else if ((req.url === '/pets/2') || (req.url === "/pets/-1")) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Not Found');
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Not Found');
        }

    });

})

server.listen(PORT, function () {
    console.log('Listening on port', PORT);
});

