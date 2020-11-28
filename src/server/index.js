const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

/* ENDPOINT */
let projectData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

const api_key = process.env.API_KEY;
app.get('/api', function (req, res) {
    res.send({key: api_key});
})

app.get('/all', sendData);

function sendData (request, response) {
    response.send(projectData);
}

app.post('/addData', addData);

function addData(request, response) {
    projectData = request.body;
    response.send({message:'Post Received'});
    return projectData;
}

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
